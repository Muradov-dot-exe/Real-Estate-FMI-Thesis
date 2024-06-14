const express = require("express");
const cors = require("cors");
const sequelize = require("./config/dbconnection");
const db = require("./models/index");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const {
  getFavoriteOffers,
  addFavorite,
  removeFavorite,
} = require("./controllers/favorites.controller");
const {
  getNotifications,
  addNotification,
  removeNotification,
} = require("./controllers/notifications.controller");

const Aircraft = require("./models/Aircraft");
const Property = require("./models/Property");
const Vehicle = require("./models/Vehicle");
const Users = require("./models/User");
const Roles = require("./models/Role");
const handleCRUD = require("./controllers/handleCrudLogic");

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
    secret: process.env.SESSION_SECRET,
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
    }
  } catch (error) {
    console.error("Error creating roles:", error);
  }
}

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

app.get("/favorites", getFavoriteOffers);
app.post("/favorites", addFavorite);
app.delete("/favorites/:id", removeFavorite);

app.get("/notifications", getNotifications);
app.post("/notifications", addNotification);
app.delete("/notifications/:id", removeNotification);
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  sequelize.sync().then(() => {
    console.log("Database synced");
  });
});
