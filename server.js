import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/index.js";
import mongoose from "mongoose"

// ROUTES
import userRoutes from "./routes/user.router.js"
import avisRoutes from "./routes/avis.router.js"
import articleRoutes from "./routes/article.router.js"

// APP EXPRESS
const app = express()

// PORT
const PORT = env.port || 8080
// cors
const corsOptions = {
  origin: 'http://localhost:3000',  // Autoriser seulement les requêtes de localhost:3000 par example
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Méthodes autorisées
  credentials: true,  // Si vous utilisez des cookies ou d'autres informations d'identification
};

// DATABASE MONGOOSE
mongoose
    .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME, 
})
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(error => console.log(error))

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); 
app.use(express.urlencoded({ extended: true }));


// PREFIX ROUTES
app.use("/api/user", userRoutes)
app.use("/api/avis", avisRoutes)
app.use("/api/article", articleRoutes)

// SERVER
app.listen(PORT, () => {
  console.log(`LISTENING AT http://localhost:${PORT}`);
})