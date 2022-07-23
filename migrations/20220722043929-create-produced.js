'use strict';


module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('produced', {
      
      scooter_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('produced');
  }
};