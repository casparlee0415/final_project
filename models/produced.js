const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    scooter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "scooter_id",
      references: {
        key: "scooter_id",
        model: "scooter_model"
      }
    },
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "brand_id",
      references: {
        key: "brand_id",
        model: "brand_model"
      }
    }
  };
  const options = {
    tableName: "produced",
    comment: "",
    indexes: [{
      name: "scooter_idx",
      unique: false,
      type: "BTREE",
      fields: ["scooter_id"]
    }, {
      name: "brand_idx",
      unique: false,
      type: "BTREE",
      fields: ["brand_id"]
    }]
  };
  const ProducedModel = sequelize.define("produced_model", attributes, options);
  return ProducedModel;
};