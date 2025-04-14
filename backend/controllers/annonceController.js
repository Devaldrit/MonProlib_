const Annonce = require("../models/annonce");

exports.createAnnonce = async (req, res) => {
  const newAnnnonce = new Annonce(req.body);
  await newAnnnonce.save();
  res.status(201).json(newAnnnonce);
};

exports.GetAnnonces = async (req, res) => {
  const annonces = await Annonce.find({});
  res.status(201).json(annonces);
};

exports.getAllActivities = async (req, res) => {
  try {
    // Retourne les annonces qui possèdent des activités
    const activities = await Annonce.find({
      activities: { $exists: true, $not: { $size: 0 } },
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  const { annonceId, activityId } = req.params; // Utilisation des paramètres définis dans la route

  try {
    // Récupérer l'annonce par son ID
    const annonce = await Annonce.findById(annonceId);
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }

    // Récupérer le sous-document activité
    const activity = annonce.activities.id(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activité non trouvée." });
    }

    // Utiliser deleteOne sur le sous-document
    await activity.deleteOne();

    // Sauvegarder le document parent
    await annonce.save();

    res.status(200).json({ message: "Activité supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
