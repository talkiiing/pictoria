const { DataTypes } = require('sequelize')

module.exports = (app) => {
  const { sequelizeClient } = app

  const Image = sequelizeClient.define('images', {
    data: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    hash: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  })

  return Image
}
