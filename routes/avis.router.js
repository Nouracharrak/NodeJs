// avis.router.js
import express from "express";
import { verifieToken } from "../middlewares/auth.js"; // Middleware d'authentification
import { postview, getAllviews, getviewById, deleteview, updateView, getAllviewForArticle} from "../controllers/avis.controller.js"; // Contrôleur des avis


const router = express.Router();

// Route POST pour ajouter un avis
router.post("/addview", verifieToken, postview);
router.get("/getAllviews", getAllviews);
router.get("/getAllviewForArticle/:id", getAllviewForArticle);
router.get("/getviewById/:id", getviewById);
router.delete("/deleteview/:id", verifieToken, deleteview);
router.put("/updateView/:id", verifieToken, updateView);

export default router;


