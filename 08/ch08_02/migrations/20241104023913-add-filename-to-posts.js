'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(`Posts`, 'filename', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },  // 마이그레이션 수행 내용

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(`Posts`, 'filename');
  }  // 실패시 
};
// 이파일이 실행되면 물리적인 테이블이 수정됨
// 논리적인 테이블은 models내에서 수정해야함

// npx sequelize-cli db:migrate 로 실행 
// 실행하면 SequelizeMeta 에 등록됨