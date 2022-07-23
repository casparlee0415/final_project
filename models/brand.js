'use strict';
const {Model,DataTypes,Sequelize}=require('sequelize');

module.exports=(sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({produced}) {
      // define association here
      this.hasMany(produced,{foreignKey:'brand_id',as:'produced'})
    }

    toJSON() {
      return { ...this.get()}}
  }
  brand.init({
    brand_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    brand_name: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    tableName: 'brand',
    modelName: 'brand',
    timestamps: false
  });

  

  return brand;
};