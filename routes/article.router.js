// routes/article.router.js
import express from 'express';
import { addArticle, getAllArticles, getAllArticlesSortedByPrice, getAllArticlesSortedByPriceDesc, getArticleById, deleteArticle, updateArticle, getArticlesByRating} from '../controllers/article.controller.js';  // Contrôleur des articles
import { verifieToken } from '../middlewares/auth.js';  // Middleware d'authentification
const router = express.Router();

// Route POST pour ajouter un article
router.post('/addArticle', addArticle);
// Route get pour recuperer les articles
router.get('/getAllArticles', getAllArticles);
// route pour récupérer tous les articles triés par prix croissant
router.get ('/getAllArticlesSortedByPrice', getAllArticlesSortedByPrice)
// route pour récupérer tous les articles triés par prix croissant
router.get ('/getAllArticlesSortedByPriceDesc', getAllArticlesSortedByPriceDesc)
// Route get pour recuperer un article avec Id
router.get('/getArticle/:id', getArticleById);
// Route pour afficher les articles triés par note moyenne
router.get('/articlesByRating', getArticlesByRating);
// Route delete pour supprimer un article avec Id
router.delete('/deleteArticle/:id', deleteArticle);
// Route put pour modifier un article avec Id
router.put("/updateArticle/:id", updateArticle);
// Exporter le routeur
export default router;
  

