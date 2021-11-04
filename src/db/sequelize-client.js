const { Sequelize } = require('sequelize')

module.exports = (app) => {
  const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME } =
    process.env

  const connectionString = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB_NAME}`

  app.sequelizeClient = new Sequelize(connectionString, {
    dialect: 'mysql',
    dialectOptions: {
      supportBigNumbers: true,
    },
    logging: false,
    define: {
      freezeTableName: true,
    },
  })
}
