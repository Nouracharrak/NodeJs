
import express from "express"
import { verifieToken, isAdmin } from "../middlewares/auth.js";
import { signup, getUsers, getUserById, deleteUser, updateUser, desactivateUser,activateUser, updateUserProfile, sign} 
from "../controllers/user.controller.js"

const router = express.Router()

router.post("/signup", signup)

router.post("/sign", sign)

router.get("/get",verifieToken, isAdmin, getUsers)

router.get("/get/:id", verifieToken, isAdmin, getUserById)

router.delete("/delete/:id", verifieToken, isAdmin, deleteUser)

router.put("/update/:id",verifieToken, isAdmin, updateUser)
router.put('/updateProfile/:id', verifieToken, updateUserProfile);
// Route pour désactiver un utilisateur
router.put('/desactivateAccount/:id', verifieToken, isAdmin, desactivateUser);
router.put('/activateAccount/:id', verifieToken, isAdmin, activateUser);

export default router
