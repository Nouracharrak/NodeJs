// avis.controller.js
import Avis from '../models/avis.model.js';
import Article from '../models/article.model.js';
import jwt from 'jsonwebtoken'
import { verifieToken } from '../middlewares/auth.js';

// Créer un avis
// METHOD PROF
// // export const post = async (req, res, next) =>{
// try{
    // // const  avis = await Avis.create({
    // ...req.body
    // user: req.user.id
  //   // const avisArticle = await Article.findByIdAndUpdat( req.body.article, 
    // {$push:{avis: avis._id}},
    // {new: true}
  // )
    // })
// }
//   }
// Ma methode
export const postview = async (req, res) => {
  const { userId, articleId, rating, comment } = req.body;

  try {
    const newAvis = new Avis({
      user: userId,
      article: articleId,
      rating,
      comment
    });

      // Sauvegarder l'avis
      await newAvis.save();

      // Mettre à jour l'article en ajoutant l'ID du nouvel avis dans le tableau 'avis'
      await Article.findByIdAndUpdate(
        articleId,  // Chercher l'article par son ID
        {
          $push: { avis: newAvis._id }  // Ajouter l'ID du nouvel avis dans le tableau d'avis
        }
      );
    res.status(201).json({ message: 'Avis créé avec succès', avis: newAvis });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'avis', error: error.message });
  }
};
// Fonction pour récupérer tous les avis
export const getAllviews = async (req, res) => {
    try {
      const avis = await Avis.find();  // Récupère tous les avis
      res.status(200).json({ avis });  // Renvoie les avis sous forme de JSON
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des articles', error: error.message });
    }
  };
// Fonction pour récupérer tous les avis d'un article
export const getAllviewForArticle = async (req, res) => {
    try {
        const articleId = req.params.id; // Utilisation de 'id' en minuscule

        // Vérifier si l'article existe
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        // on peut rajouter populate('avis') tous simplement pour chercher les avis qui correspant à un article en particulier. 

        // Récupérer tous les avis associés à cet article
        const avisList = await Avis.find({ article: articleId }); // Recherche des avis avec l'ID de l'article

        res.status(200).json({ avis: avisList });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des avis', error: error.message });
    }
};

// Fonction pour récupérer un article avec id
export const getviewById = async (req, res) => {
    try {
      const avis = await Avis.findById(req.params.id);  // Récupère tous les articles
      res.status(200).json({ avis });  // Renvoie les articles sous forme de JSON
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération by Id', error: error.message });
    }
  };
 // Fonction pour mettre à jour un avis
 export const updateView = async (req, res) => {
    try {
      const avisId = req.params.id;
      const userId = req.user.id;
      const { rating, comment } = req.body;
  
      const avis = await Avis.findById(avisId);
      if (!avis) {
        return res.status(404).json({ message: 'Avis non trouvé' });
      }
  
      if (avis.user.toString() !== userId) {
        return res.status(403).json({ message: 'Accès refusé. Vous ne pouvez modifier que vos propres avis.' });
      }
  
      avis.rating = rating;
      avis.comment = comment;
      await avis.save();
  
      res.status(200).json({ message: 'Avis modifié avec succès', avis });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la modification de l\'avis', error: error.message });
    }
  };
    
  // Fonction pour supprimer un avis
  export const deleteview = async (req, res, next) => {
    try {
      const avisId = req.params.id;
      const userId = req.body.user;
  
      const avis = await Avis.findById(avisId);
      if (!avis) {
        return res.status(404).json({ message: 'Avis non trouvé' });
      }
  
      if (avis.user.toString() !== userId) {
        return res.status(403).json({ message: 'Accès refusé. Vous ne pouvez supprimer que vos propres avis.' });
      }
  
      await Avis.findByIdAndDelete(avisId);
  
      await Article.findByIdAndUpdate(
        avis.article,
        { $pull: { avis: avisId } },
        { new: true }
      );
  
      res.status(200).json({ message: 'Avis supprimé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'avis', error: error.message });
    }
  };
  