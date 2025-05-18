import express from "express";
import { getAllBooks, getBookById } from "../controller/book.controller.js";
const app=express();
const router=app.router;
router.get("/api/books",getAllBooks);
router.get("/api/book/:id",getBookById);
export default router;