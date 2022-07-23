'use strict';
const {Model,DataTypes,Sequelize}=require('sequelize');

module.exports=(sequelize, DataTypes) => {
  class scooter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({produced}) {
      this.hasOne(produced,{foreignKey:'scooter_id',as:'produced'});
    }

    toJSON() {
      return { ...this.get()}}
  }
  scooter.init({
    scooter_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    scooter_name: {
      type:DataTypes.STRING,
    },
    scooter_image: {
      type:DataTypes.BLOB,
    },
    scooter_type: {
      type:DataTypes.STRING,
    },
    price: {
      type:DataTypes.DOUBLE,
    },
    engine_type: {
      type:DataTypes.STRING,
    },
    transmission: {
      type:DataTypes.STRING,
    },
    displacement: {
      type:DataTypes.STRING,
    },
    performance: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'scooter',
    modelName: 'scooter',
  });


  return scooter;
};