'use strict';


module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('brand', {
      brand_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      brand_name: {
        type: DataTypes.STRING,
        allowNull:true
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('brand');
  }
};