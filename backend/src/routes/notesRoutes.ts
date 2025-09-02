import {
  createNote,
  deleteNote,
  getAllNotes,
} from "@/controllers/notesController";
import { requireAuth } from "@/middlewares/authMiddleware";
import { Router, type Router as ExpressRouter } from "express";

const noteRoutes: ExpressRouter = Router();

noteRoutes.get("/", requireAuth, getAllNotes);
noteRoutes.post("/", requireAuth, createNote);
noteRoutes.delete("/:id", requireAuth, deleteNote);

export default noteRoutes;
