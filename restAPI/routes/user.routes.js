const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  // Ensure verifyToken is executed first
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // Verify token and check for moderator role
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  // Verify token and check for admin role
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/userinfo",
    // [authJwt.verifyToken], // You can restrict access if needed
    controller.userInfo
  );
};
