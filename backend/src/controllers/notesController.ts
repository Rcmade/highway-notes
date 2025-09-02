import { db } from "@/db/db";
import { Request, Response } from "express";

export const getAllNotes = async (req: Request, res: Response) => {
  const notes = await db.note.findMany({
    where: { userId: req?.user?.id },
    orderBy: { createdAt: "desc" },
  });
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const note = await db.note.create({
    data: {
      title,
      content,
      userId: req?.user?.id!,
    },
  });
  res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  await db.note.delete({
    where: { id: req.params.id },
  });
  res.json({ success: true });
};
