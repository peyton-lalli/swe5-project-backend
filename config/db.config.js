module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "schedule",
  DIALECT: "mariadb",
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
