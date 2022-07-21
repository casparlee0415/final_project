import{ DataTypes } from 'sequelize';

export default sequelize => {
  const attributes = {
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "brand_id"
    },
    brand_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "brand_name"
    }
  };
  const options = {
    tableName: "brand",
    comment: "",
    indexes: []
  };
  const BrandModel = sequelize.define("brand_model", attributes, options);
  return BrandModel;
};