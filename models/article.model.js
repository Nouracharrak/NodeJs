import mongoose from 'mongoose';  // Utilise `import` si tu as configuré le projet pour ES6 modules
const { Schema } = mongoose;
import Avis from '../models/avis.model.js';

// Définir le schéma de l'article
const ArticleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // User: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    //provider: {type: mongoose.Schema.Types.ObjectId, ref: 'Provider'}
    avis: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Avis',
    }],

    picture: {
      img : {
        type: String, 
        required: true
      },
      img1: {type: String},
      img2: {type: String},
      img3: {type: String},
      img4: {type: String},
    },

    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: { createdAt: true },
  }
);

// Créer le modèle d'article à partir du schéma
const Article = mongoose.model('Article', ArticleSchema);

// Exporter le modèle en tant qu'export par défaut
export default Article;  // Utilisation de `export defaulte


