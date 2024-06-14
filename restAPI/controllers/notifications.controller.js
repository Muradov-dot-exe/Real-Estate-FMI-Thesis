const Notification = require("../models/Notifications")();

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.session.userId;
    const notifications = await Notification.findAll({ where: { userId } });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.addNotification = async (req, res) => {
  try {
    const { userId, offerId, message } = req.body;
    const notification = await Notification.create({
      userId,
      offerId,
      message,
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error adding notification:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.removeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.destroy({ where: { id } });
    res.status(200).json({ message: "Notification removed successfully" });
  } catch (error) {
    console.error("Error removing notification:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
