import express from "express";
import { createBook, getAllBooks, getBookById } from "../controller/book.controller.js";
const app=express();
const router=app.router;
router.get("/api/books",getAllBooks);
router.get("/api/book/:id",getBookById);
router.post("/api/book",createBook);
export default router;