// controllers/article.controller.js
import Article from '../models/article.model.js';
import Avis from '../models/avis.model.js';
import { verifieToken } from '../middlewares/auth.js';
import jwt from 'jsonwebtoken'

// Fonction pour créer un article
export const addArticle = async (req, res) => {

  try {
    const article = await Article.create(req.body);
    res.status(201).json({ message: 'Article créé avec succès', article: article });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'article', error: error.message });
  }
};

// Fonction pour récupérer tous les articles
export const getAllArticles = async (req, res) => {
    try {
      const articles = await Article.find();  // Récupère tous les articles
      res.status(200).json({ articles });  // Renvoie les articles sous forme de JSON
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des articles', error: error.message });
    }
  };
  // Fonction pour récupérer un article avec id
export const getArticleById = async (req, res) => {
    try {
      const articles = await Article.findById(req.params.id);  // Récupère tous les articles
      res.status(200).json({ articles });  // Renvoie les articles sous forme de JSON
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération by Id', error: error.message });
    }
  };

//  Fonction pour récuperer l'article avec la note 
export const getArticlesByRating = async (req, res) => {
  try {
    const articles = await Article.aggregate([
      {
        $lookup: {
          from: 'avis',
          localField: '_id',
          foreignField: 'article',
          as: 'avis'
        }
      },
      {
        $addFields: {
          avgRating: { $avg: { $ifNull: ['$avis.rating', 0] } } // Utilisation de $ifNull pour éviter null
        }
      },
      {
        $match: {
          avgRating: { $gt: 0 }  // Exclure les articles sans avis
        }
      },
      {
        $sort: { avgRating: -1 }  // Tri par note décroissante
      }
    ]);

    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des articles', error: error.message });
  }
};
  // Fonction pour supprimer un joueur
  export const deleteArticle = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json("Article not found.");
      }
      await Article.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: `L'article avec l'ID ${req.params.id} a été supprimé.`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la suppression de l'article", error: error.message });
    }
  };

  // Fonction pour mettre à jour un article
  export const updateArticle = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
  
      if (!article) {
        return res.status(404).json({ message: "Article non trouvé !" });
      }
  
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      res.status(200).json({
        message: "Article mis à jour avec succès",
        article: updatedArticle,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'article", error: error.message });
    }
  };
  
// Fonction pour récupérer tous les articles triés par prix croissant
export const getAllArticlesSortedByPrice = async (req, res) => {
    try {
      const articles = await Article.find().sort({ price: 1 });  // Trie les articles par prix croissant
      res.status(200).json({ articles });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des articles triés', error: error.message });
    }
  };

// Fonction pour récupérer tous les articles triés par prix décroissant
export const getAllArticlesSortedByPriceDesc = async (req, res) => {
    try {
      const articles = await Article.find().sort({ price: -1 });  // Trie les articles par prix décroissant
      res.status(200).json({ articles });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des articles triés par prix décroissant', error: error.message });
    }
  };

