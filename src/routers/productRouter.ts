import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { check } from "express-validator";

const router = Router();

// creates product
router.post("/products", [
  check("name")
    .notEmpty().withMessage("Name can't be empty")
    .isLength({ min: 4, max: 35 }).withMessage("Name min: 4 max 35"),
  check("quantity")
    .notEmpty().withMessage("Quantity can't be empty")
    .isInt({gt: 0}).withMessage("Quantity must be a positive integer")
], ProductController.create);
// get all products
router.get("/products", ProductController.getAll);
// get product by ID
router.get("/products/:id", ProductController.getOne);
// update product by ID
router.put("/products/:id", ProductController.update);
// delete product by ID
router.delete("/products/:id", ProductController.delete);

export default router;
