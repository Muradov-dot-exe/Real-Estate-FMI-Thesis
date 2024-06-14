const Favorite = require("../models/Favorite")();
const User = require("../models/User")();

exports.getFavoriteOffers = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const favoriteOffers = await Favorite.findAll({
      where: { userId: userId },
    });
    res.json(favoriteOffers);
  } catch (error) {
    console.error("Error fetching favorite offers:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { offerId } = req.body;

    if (!userId || !offerId) {
      return res.status(400).json({ error: "userId and offerId are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingFavorite = await Favorite.findOne({
      where: { userId, offerId },
    });
    if (existingFavorite) {
      return res.status(400).json({ error: "Favorite already exists" });
    }

    await Favorite.create({ userId, offerId });
    res.status(201).json({ message: "Favorite added successfully" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.session.userId;
    const offerId = req.params.id;

    if (!userId || !offerId) {
      return res.status(400).json({ error: "userId and offerId are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Favorite.destroy({ where: { userId, offerId } });
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
