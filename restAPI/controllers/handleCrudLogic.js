const { sendEmailNotification } = require("../config/email");
const Notification = require("../models/Notifications")();
const Favorite = require("../models/Favorite")();
const User = require("../models/User")();
const Property = require("../models/Property");

const handleCRUD = async (Model, operation, req, res) => {
  try {
    switch (operation) {
      case "getAll":
        const page = parseInt(req.query.page) || 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const offset = limit ? page * limit : 0;

        const allEntities = await Model.findAll({
          limit,
          offset,
        });
        res.send(allEntities);
        break;

      case "getById":
        const entityId = req.params.id;
        const entityById = await Model.findByPk(entityId);
        res.send(entityById);
        break;

      case "create":
        const newData = req.body;
        const createdEntity = await Model.create(newData);
        res.send(createdEntity);
        break;

      case "update":
        const updatedData = req.body;
        const entityToUpdate = await Model.findByPk(req.params.id);

        if (!entityToUpdate) {
          return res.status(404).send({ error: "Entity not found." });
        }

        await entityToUpdate.update(updatedData);

        if (Model === Property) {
          const favoritedUsers = await Favorite.findAll({
            where: { offerId: req.params.id },
            include: [{ model: User, as: "user" }],
          });

          for (const favorite of favoritedUsers) {
            const { user } = favorite;

            sendEmailNotification(user.email, entityToUpdate);

            await Notification.create({
              userId: user.id,
              offerId: req.params.id,
              message: `The property '${entityToUpdate.address}' has been updated.`,
            });
          }
        }

        res.send(entityToUpdate);
        break;

      case "delete":
        const entityIdToDelete = req.params.id;
        await Model.destroy({ where: { id: entityIdToDelete } });
        res.send({ message: "Entity deleted successfully." });
        break;

      default:
        res.status(400).send({ error: "Invalid operation." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error." });
  }
};

module.exports = handleCRUD;
