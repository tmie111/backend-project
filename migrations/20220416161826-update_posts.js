'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('user_posts', 'brew_id', {type: Sequelize.STRING})
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
