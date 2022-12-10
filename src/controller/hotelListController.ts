import { Request, Response, NextFunction } from "express";
import { HotelBrandInstance } from "../model/brand";
import { HotelListingInstance } from "../model/listings";
import { v4 as uuidv4 } from "uuid";
import {
  createListingSchema,
  options,
  updateListingSchema,
} from "../utils/utils";

export async function createHotel(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createListingSchema.validate(req.body, options);
    if (validationResult.error) {
      console.log(validationResult.error);
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await HotelListingInstance.create({
      id,
      ...req.body,
    });
    res.status(201).json({
      msg: "You have successfully created a HotelList",
      record,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to create",
    });
  }
}

export async function getHotels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await HotelListingInstance.findAll({
      limit,
      offset,
    });
    res.status(200).json({
      msg: "You have successfully fetch all hotelLists",
      // count: record
      records: record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to read",
      route: "/getHotels",
    });
  }
}

export async function getSingleHotel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await HotelListingInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        error: "cannot find hotel",
      });
    }
    res.status(200).json({
      msg: `you successfully gotten the hotel information with the id of ${id}`,
      record,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateHotel(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, city, address, country } = req.body;
    const validationResult = updateListingSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await HotelListingInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "Cannot find existing hotel",
      });
    }

    const updatedRecord = await record.update({
      name,
      city,
      address,
      country,
    });
    res.status(200).json({
      msg: "You have successfully updated your hotel",
      updatedRecord,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteHotel(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await HotelListingInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        msg: "Hotel does not exist",
      });
    }

    const deletedRecord = await record.destroy();
    return res.status(200).json({
      msg: `hotel with the id of ${id} has been deleted successfully`,
      deletedRecord,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getHotelsWithBrands(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await HotelListingInstance.findAll({
      include: [
        {
          model: HotelBrandInstance,
          as: "Brands",
        },
      ],
      limit,
      offset,
    });
    res.status(200).json({
      msg: "You have successfully fetch all hotelLists",
      // count: record
      records: record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to read",
      route: "/getHotels",
    });
  }
}
