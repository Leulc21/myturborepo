import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API running 🚀" });
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
