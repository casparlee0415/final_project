'use strict';


module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('scooter', {
      scooter_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      scooter_name: {
        type: DataTypes.STRING
      },
      scooter_image: {
        type: DataTypes.BLOB
      },
      scooter_type: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.DOUBLE
      },
      engine_type: {
        type: DataTypes.STRING
      },
      transmission: {
        type: DataTypes.STRING
      },
      displacement: {
        type: DataTypes.STRING
      },
      performance: {
        type: DataTypes.STRING
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('scooter');
  }
};