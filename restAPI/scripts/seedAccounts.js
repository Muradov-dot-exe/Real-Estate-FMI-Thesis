require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../models");
const saltRounds = 10;
const adminUsername = process.env.ADMIN_USERNAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const modUsername = process.env.MODERATOR_USERNAME;
const modEmail = process.env.MODERATOR_EMAIL;
const modPassword = process.env.MODERATOR_PASSWORD;

async function initialize() {
  try {
    await db.sequelize.sync({ alter: true });

    const roles = ["user", "admin", "moderator"];
    for (const role of roles) {
      const [roleInstance, created] = await db.role.findOrCreate({
        where: { name: role },
        defaults: { name: role },
      });
      if (created) {
        console.log(`Role ${role} created`);
      }
    }

    if (!adminPassword || !modPassword) {
      throw new Error(
        "Admin or Moderator password is not defined in environment variables."
      );
    }

    const hashedAdminPassword = await bcrypt.hash(adminPassword, saltRounds);
    const hashedModPassword = await bcrypt.hash(modPassword, saltRounds);

    const [adminUser, adminCreated] = await db.user.findOrCreate({
      where: { username: adminUsername },
      defaults: {
        username: adminUsername,
        email: adminEmail,
        password: hashedAdminPassword,
      },
    });
    if (adminCreated) {
      const adminRole = await db.role.findOne({ where: { name: "admin" } });
      await adminUser.addRole(adminRole);
      console.log("Admin user created");
    }

    const [moderatorUser, modCreated] = await db.user.findOrCreate({
      where: { username: modUsername },
      defaults: {
        username: modUsername,
        email: modEmail,
        password: hashedModPassword,
      },
    });
    if (modCreated) {
      const modRole = await db.role.findOne({ where: { name: "moderator" } });
      await moderatorUser.addRole(modRole);
      console.log("Moderator user created");
    }

    console.log(
      "Database initialized with admin and moderator roles and users"
    );
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

initialize();
