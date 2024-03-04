const express = require("express");
const cors = require("cors");
const sequelize = require("./config/dbconnection");
const db = require("./models/index");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const Aircraft = require("./models/Aircraft");
const Property = require("./models/Property");
const Vehicle = require("./models/Vehicle");

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "cY3$3qLpA9*8vJh2",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
const Role = db.role;
db.sequelize.sync().then(() => {
  createRoles();
});

async function createRoles() {
  try {
    const roles = await Role.findAll();
    if (!roles || roles.length === 0) {
      await Role.bulkCreate([
        { id: 1, name: "user" },
        { id: 2, name: "moderator" },
        { id: 3, name: "admin" },
      ]);
      console.log("Roles created successfully");
    } else {
      console.log("Roles already exist");
    }
  } catch (error) {
    console.error("Error creating roles:", error);
  }
}

const handleCRUD = async (Model, operation, req, res) => {
  try {
    switch (operation) {
      case "getAll":
        const allEntities = await Model.findAll();
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
        await entityToUpdate.update(updatedData);
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

app.get("/aircraft", (req, res) => handleCRUD(Aircraft, "getAll", req, res));
app.get("/aircraft/:id", (req, res) =>
  handleCRUD(Aircraft, "getById", req, res)
);
app.post("/aircraft/add", (req, res) =>
  handleCRUD(Aircraft, "create", req, res)
);
app.put("/aircraft/edit/:id", (req, res) =>
  handleCRUD(Aircraft, "update", req, res)
);
app.delete("/aircraft/delete/:id", (req, res) =>
  handleCRUD(Aircraft, "delete", req, res)
);

app.get("/", (req, res) => handleCRUD(Property, "getAll", req, res));
app.get("/property/:id", (req, res) =>
  handleCRUD(Property, "getById", req, res)
);
app.post("/property/add", (req, res) =>
  handleCRUD(Property, "create", req, res)
);
app.put("/property/edit/:id", (req, res) =>
  handleCRUD(Property, "update", req, res)
);
app.delete("/delete/:id", (req, res) =>
  handleCRUD(Property, "delete", req, res)
);

app.get("/vehicles", (req, res) => handleCRUD(Vehicle, "getAll", req, res));
app.get("/vehicle/:id", (req, res) => handleCRUD(Vehicle, "getById", req, res));
app.post("/vehicle/add", (req, res) => handleCRUD(Vehicle, "create", req, res));
app.put("/vehicle/edit/:id", (req, res) =>
  handleCRUD(Vehicle, "update", req, res)
);
app.delete("/vehicles/delete/:id", (req, res) =>
  handleCRUD(Vehicle, "delete", req, res)
);

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully");
  });
});
