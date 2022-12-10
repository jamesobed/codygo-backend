import express from "express";
import {
  createBrand,
  deleteBrand,
  getBrands,
  getBrand,
  updateBrand,
} from "../controller/brandController";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", createBrand);
router.patch("/:id", updateBrand);
router.delete("/:id", deleteBrand);
export default router;
