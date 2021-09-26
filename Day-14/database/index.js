const Sequielize = require("sequelize");

const sequielize = new Sequielize("session", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequielize;
