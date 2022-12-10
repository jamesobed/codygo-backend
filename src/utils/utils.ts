import Joi from "joi";
import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';

export const createListingSchema = Joi.object().keys({
  name: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  rating: Joi.string().required(),
});

export const updateListingSchema = Joi.object().keys({
  name: Joi.string(),
  city: Joi.string(),
  address: Joi.string(),
  country: Joi.string(),
  rating: Joi.string(),
});

export const createBrandSchema = Joi.object().keys({
  name: Joi.string().required(),
  hotelID: Joi.string().required(),
});

export const updateBrandSchema = Joi.object().keys({
  name: Joi.string(),
});
export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
