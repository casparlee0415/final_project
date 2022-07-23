'use strict';
const {Model,DataTypes,Sequelize}=require('sequelize');

module.exports=(sequelize, DataTypes) => {
  class produced extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({brand,scooter}) {
      // define association here
      this.belongsTo(scooter,{foreignKey:'scooter_id',as : 'scooter'});
      this.belongsTo(brand,{foreignKey:'brand_id',as : 'brand'});
    }

    toJSON() {
      return { ...this.get()}}

  }
  produced.init({
    
  }, {
    sequelize,
    timestamps: false,
    tableName: 'produced',
    modelName: 'produced',
  });

  produced.removeAttribute('id');  

  return produced;
};