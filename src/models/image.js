const { DataTypes } = require('sequelize')

module.exports = (app) => {
  const { sequelizeClient } = app

  const Image = sequelizeClient.define('images', {
    data: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  })

  return Image
}
