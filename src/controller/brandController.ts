import { Request, Response, NextFunction } from "express";
import { HotelBrandInstance } from "../model/brand";
import { v4 as uuidv4 } from "uuid";
import { createBrandSchema, updateBrandSchema, options } from "../utils/utils";

export async function createBrand(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createBrandSchema.validate(req.body, options);
    if (validationResult.error) {
      console.log(validationResult.error);
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await HotelBrandInstance.create({
      id,
      ...req.body,
    });
    res.status(201).json({
      msg: "You have successfully created a Brand",
      record,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to create",
    });
  }
}

export async function getBrands(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await HotelBrandInstance.findAll({
      limit,
      offset,
    });
    res.status(200).json({
      msg: "You have successfully fetch all Brands",
      // count: record
      records: record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to read",
    });
  }
}

export async function getBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await HotelBrandInstance.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      msg: "You have successfully fetch a Brand",
      record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to read",
    });
  }
}

export async function updateBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const validationResult = updateBrandSchema.validate(req.body, options);
    if (validationResult.error) {
      console.log(validationResult.error);
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await HotelBrandInstance.update(
      {
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      msg: "You have successfully updated a Brand",
      record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to update",
    });
  }
}

export async function deleteBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await HotelBrandInstance.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      msg: "You have successfully deleted a Brand",
      record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to delete",
    });
  }
}
