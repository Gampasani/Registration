import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

// ✅ Use Render's PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
