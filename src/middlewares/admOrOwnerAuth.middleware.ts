import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Accommodation } from "../entities/accommodation.entity";
import { Address } from "../entities/address.entity";
import { Booking } from "../entities/booking.entity";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";

// this middleware HAS to be used with, and after "authUserMiddleware", it relies on req.userId set there.

export const admOrOwnerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const route = req.originalUrl.split("/");

  const { id } = req.params;
  if (!id) {
    throw new AppError(400, "Missing ID param on route");
  }

  //finding user that owns the token
  const userRepo = AppDataSource.getRepository(User);
  const userFromToken = await userRepo.findOneBy({ id: userId });
  if (!userFromToken) {
    throw new AppError(
      400,
      "There's no user associated with the id used(token)"
    );
  }

  //checking if token owner is Adm
  const isAdmin = userFromToken.isAdm;
  if (isAdmin) {
    req.isAdm = true;
    next();
  }

  //logic for user routes (to be used on PATCH routes)
  if (route[1] === "users") {
    //finding the user that is suffering changes
    const userAffected = await userRepo.findOneBy({ id: id });
    if (!userAffected) {
      throw new AppError(
        400,
        "There's no user associated with the id used(route params)"
      );
    }

    //checking if the changes are being made by an Admin or the owner of the account
    const notOwner = userFromToken.id != userAffected.id;
    if (notOwner) {
      throw new AppError(
        401,
        "Must be an admin or owner of the account to make any changes"
      );
    }
    req.isOwner = true;
    next();
  }

  //logic for accommodations routes (to be used on PATCH routes)
  if (route[1] === "accommodations") {
    //finding the accommodation
    const accommodationRepo = AppDataSource.getRepository(Accommodation);
    const accommodation = await accommodationRepo.findOneBy({ id: id });
    if (!accommodation) {
      throw new AppError(
        400,
        "There's no accommodation associated with the id used(route params)"
      );
    }

    //checking if accommodation belongs to the owner of the token
    const notAccommodationOwner = accommodation.owner.id != userFromToken.id;
    if (notAccommodationOwner) {
      throw new AppError(
        401,
        "Must be an admin or owner of the accommodation to make any changes"
      );
    }
    req.isOwner = true;
    next();
  }

  //logic for bookings (to be used on PATCH routes)
  if (route[1] === "bookings") {
    //finding the booking
    const bookingRepo = AppDataSource.getRepository(Booking);
    const booking = await bookingRepo.findOneBy({ id: id });
    if (!booking) {
      throw new AppError(
        400,
        "There's no booking associated with the id used(route params)"
      );
    }

    //checking if booking belongs to owner of the token
    const notBookingOwner = booking.user.id != userFromToken.id;

    //checkin if the accommodation belongs to owner of token
    const accommodationId = booking.accommodation.id;
    const accommodationRepo = AppDataSource.getRepository(Accommodation);
    const accommodation = await accommodationRepo.findOneBy({
      id: accommodationId,
    });
    if (!accommodation) {
      throw new AppError(
        400,
        "There's no valid accommodation associated with the booking id used(route params)"
      );
    }

    const notAccommodationOwner = accommodation.owner.id != userFromToken.id;

    if (notAccommodationOwner && notBookingOwner) {
      throw new AppError(
        401,
        "Must be the owner of the accommodation, the guest that booked the booking, or an admin to make any changes"
      );
    }
    req.isOwner = true;
    next();
  }

  //logic for address routes (discuss if this is necessary) (To be used on PATCH routes)
  if (route[1] === "addresses") {
    //finding the address
    const addressRepo = AppDataSource.getRepository(Address);
    const address = await addressRepo.findOneBy({ id: id });
    if (!address) {
      throw new AppError(
        400,
        "There's no address associated with the id used(route params)"
      );
    }

    //finding the accommodation that is the owner of the address
    const accommodationId = address.accommodation.id;
    const accommodationRepo = AppDataSource.getRepository(Accommodation);
    const accommodation = await accommodationRepo.findOneBy({
      id: accommodationId,
    });
    if (!accommodation) {
      throw new AppError(
        400,
        "There's no valid accommodation associated with the address id used(route params)"
      );
    }

    //checking if Accommodation belongs to owner of the token
    const notAccommodationOwner = accommodation.owner.id != userFromToken.id;
    if (notAccommodationOwner) {
      throw new AppError(
        401,
        "Must be the owner of the accommodation set at this address or an admin to make any changes"
      );
    }
    req.isOwner = true;
    next();
  }

  //erase the following after development
  throw new AppError(
    420,
    "this error is comming from admOrOwnerMiddleware, it might need refactoring to be included in a new route, it could also be an issue with route naming or it is being used in a route outside its initial intended scope. Please warn Andre Perregil if you see this message"
  );
};