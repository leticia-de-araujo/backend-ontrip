import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import deleteBookingService from "../../services/bookings/deleteBookings.service";

const deleteBookingController = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteBooking = deleteBookingService(id);

    return res.status(204).json({ message: deleteBooking });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default deleteBookingController;
