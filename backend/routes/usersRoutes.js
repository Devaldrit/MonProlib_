const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateEmailUser,
  updatePasswordUser,
  deleteUser,
} = require("../controllers/authController");

// Route pour récupérer un utilisateur par son ID
router.get("/:id", getUserById);

// Route pour modifier l'email par son ID
router.patch("/:id/email", updateEmailUser);

// Route pour modifier le mot de passe d'un utilisateur par son ID
router.patch("/:id/password", updatePasswordUser);

// Route pour modifier le mot de passe d'un utilisateur par son ID
router.delete("/:id", deleteUser);

module.exports = router;
