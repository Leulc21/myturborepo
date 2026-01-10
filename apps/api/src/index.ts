import cors from "cors";
import express from "express";
import { prisma } from "../lib/prisma";

const app = express();

app.use(cors());
app.use(express.json());

/* ------------------ HEALTH ------------------ */
app.get("/", (_req, res) => {
  res.json({ message: "API running 🚀" });
});

/* ------------------ CREATE ------------------ */
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User creation failed" });
  }
});

/* ------------------ READ ALL ------------------ */
app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/* ------------------ READ ONE ------------------ */
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

/* ------------------ UPDATE ------------------ */
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    res.json(updatedUser);
  } catch {
    res.status(400).json({ error: "User update failed" });
  }
});

/* ------------------ DELETE ------------------ */
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "User deleted" });
  } catch {
    res.status(400).json({ error: "User deletion failed" });
  }
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
