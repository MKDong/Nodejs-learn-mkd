'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
        lever: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        descripsition: {
            type: Sequelize.TEXT("long"),
        },
        videoID: {
            type: Sequelize.STRING,
        },
        isDelete: {
            type: Sequelize.STRING,
        },
        isPublic: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        userID: {
            type: Sequelize.STRING,
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};