'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('BookReferences', 'title'),
      queryInterface.removeColumn('BookReferences', 'link'),
      queryInterface.removeColumn('BookReferences', 'opt_in'),
      queryInterface.addColumn(
        'BookReferences',
        'google_spreadsheet_link',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'BookReferences',
        'uuid',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'BookReferences',
        'google_spreadsheet_link',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'BookReferences',
        'number_entries',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'BookReferences',
        'view_count',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'BookReferences',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'BookReferences',
        'link',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'BookReferences',
        'opt_in',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true
        }
      ),
      queryInterface.removeColumn('BookReferences', 'google_spreadsheet_link'),
      queryInterface.removeColumn('BookReferences', 'uuid'),
      queryInterface.removeColumn('BookReferences', 'google_spreadsheet_link'),
      queryInterface.removeColumn('BookReferences', 'number_entries'),
      queryInterface.removeColumn('BookReferences', 'view_count')
    ]);
  }
};
