import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { softDeletePhotoService } from "../../services/photo/softDeletePhoto.service";

export const softDeletePhotoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { photoId } = req.params;

    if (!photoId) {
      throw new AppError(400, "photoId is missing");
    }

    const _ = await softDeletePhotoService(photoId);

    return res.status(204);
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};