'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {  // 실행후 commit
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   // npx sequelize-cli db:seed:all 실행 [ seeders 폴더내 전체 실행 - 계속실행됨 ]
   // npx sequelize-cli db:seed --seed a.js  : a.js파일만 실행하고 싶으면..
    const result = await queryInterface.bulkInsert('users', [{
      email: 'a@gmail.com',
      password: 'test1234',
      name: 'a_admin',
      address: 'seoul',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'b@gmail.com',
      password: 'test1234',
      name: 'b_admin',
      address: 'busan',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'c@gmail.com',
      password: 'test1234',
      name: 'c_admin',
      address: 'taeback',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'd@gmail.com',
      password: 'test1234',
      name: 'd_admin',
      address: 'daejeon',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'e@gmail.com',
      password: 'test1234',
      name: 'e_admin',
      address: 'jeonju',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  console.log(result);
  },

  async down (queryInterface, Sequelize) {  //실패시
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
