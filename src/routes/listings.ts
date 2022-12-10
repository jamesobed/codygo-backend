import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotels,
  getSingleHotel,
  updateHotel,
  getHotelsWithBrands,
} from "../controller/hotelListController";

const router = express.Router();

router.get("/all", getHotelsWithBrands);
router.get("/", getHotels);
router.get("/:id", getSingleHotel);
router.post("/", createHotel);
router.patch("/:id", updateHotel);
router.delete("/:id", deleteHotel);
export default router;
