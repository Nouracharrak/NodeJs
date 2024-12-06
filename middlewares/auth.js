import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import { createError } from './error.js'

export const verifieToken = (req, res, next) => {
  // Récupère le jeton (token) JWT à partir des cookies de la requête
  const token = req.cookies.access_token;

  // Si le jeton (token) n'est pas présent, renvoie une erreur 401 (accès refusé)
  if (!token) return next(createError(401, "Accès refusé"));

  // Vérifier la validité du jeton en utilisant jwt.verify
  jwt.verify(token, env.token, (err, user) => {
    // Si une erreur se produit lors de la vérification du jeton
    if (err) {
      // Renvoie une erreur 403 (interdit) car le jeton (token) n'est pas valide
      return next(createError(403, "Token non valide !"));
    }
    // Si la vérification réussit, ajoute les informations de l'utilisateur dans l'objet req
    req.user = user;
    next();
  });
};

// Middleware pour vérifier si l'utilisateur est un admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createError(403, "Accès refusé : réservé aux administrateurs"));
  }
  next(); // Assure que la requête continue si l'utilisateur est un admin
};
