'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  return queryInterface.changeColumn('brew_lists', 'brew_id', {type: Sequelize.STRING})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
