const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🟢 Fonction pour vérifier l'existence du téléphone
const checkPhone = async (req, res) => {
  try {
    const { telephone } = req.params;
    const existingUser = await User.findOne({ telephone });

    if (existingUser) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du téléphone :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Fonction pour vérifier l'existence du SIRET
const checkSiret = async (req, res) => {
  try {
    const { siret } = req.params;
    const existingUser = await User.findOne({ siret });

    if (existingUser) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du SIRET :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Fonction d'inscription
const register = async (req, res) => {
  try {
    const { nom, prenom, email, password, telephone, role, siret } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    // Si le rôle est 'pro', assure-toi que le siret est fourni
    if (role === "pro" && !siret) {
      return res.status(400).json({
        error: "Le numéro SIRET est requis pour un compte professionnel",
      });
    }

    // Création de l'utilisateur avec les données fournies
    const newUser = new User({
      nom,
      prenom,
      email,
      password,
      telephone,
      role,
      siret,
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      userId: newUser._id,
      prenom: newUser.prenom,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
// 🟢 Fonction de connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche l'utilisateur dans la base de données
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    // Comparaison du mot de passe en clair avec le mot de passe haché dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    // Création du token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "SECRET_KEY", // Remplace cela par une clé secrète plus sécurisée, idéalement dans un fichier de config
      { expiresIn: "1h" }
    );

    // Retourne la réponse avec le token et d'autres informations de l'utilisateur
    res.json({
      message: "Connexion réussie",
      token,
      role: user.role,
      userId: user._id,
      prenom: user.prenom,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Fonction pour obtenir un utilisateur par ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclure le mot de passe pour la sécurité

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

//🟢 Fonction pour modifier le Email de l'utilisateur
const updateEmailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email manquant dans la requête." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email: email },
      { new: true } // pour renvoyer le user mis à jour
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'email :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//🟢 Fonction pour modifier le mot de passe de l'utilisateur
const updatePasswordUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Mot de passe manquant dans la requête." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // le 10 correspond au "salt rounds"

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//🟢 Fonction pour supprimer un compte utilisateur
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "password manquant dans la requête." });
    }
    const deletedUserId = await User.deleteOne({ _id: userId });

    if (deletedUserId.deletedCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json(deletedUserId);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🟢 Export des fonctions
module.exports = {
  checkPhone,
  checkSiret,
  register,
  login,
  getUserById,
  updateEmailUser,
  updatePasswordUser,
  deleteUser,
};
