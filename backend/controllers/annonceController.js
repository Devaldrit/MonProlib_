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
  const { activityId } = req.params; // on récupère uniquement l'id de l'activité

  try {
    // Recherche de l'annonce contenant l'activité via la propriété "activities._id"
    const annonce = await Annonce.findOne({ "activities._id": activityId });
    if (!annonce) {
      return res
        .status(404)
        .json({ message: "Aucune annonce ne contient cette activité." });
    }

    // Récupération du sous-document correspondant dans le tableau des activités
    const activity = annonce.activities.id(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activité non trouvée." });
    }

    // Suppression du sous-document avec la méthode deleteOne (disponible sur les sub-documents)
    await activity.deleteOne();

    // Sauvegarder le document parent pour appliquer la suppression
    await annonce.save();

    res.status(200).json({ message: "Activité supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
