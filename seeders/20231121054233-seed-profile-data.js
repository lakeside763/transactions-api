'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'profiles',
      [
        {
          id: "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
          firstName: 'Harry',
          lastName: 'Potter',
          profession: 'Wizard',
          balance: 1150,
          type: 'CLIENT'
        },
        {
          id: "046a7b29-2ff1-4173-b606-1d17779ebc20",
          firstName: 'Mr',
          lastName: 'Robot',
          profession: 'Hacker',
          balance: 231.11,
          type:'CLIENT' 
        },
        {
          id: "f4539b79-cd50-4438-92f3-285f270a3f7c",
          firstName: 'John',
          lastName: 'Snow',
          profession: 'Knows nothing',
          balance: 451.3,
          type:'CLIENT',
        },
        {
          id: "7bbae488-0ce7-4c0f-98e7-da13ccdc73f8",
          firstName: 'Ash',
          lastName: 'Kethcum',
          profession: 'Pokemon master',
          balance: 1.3,
          type:'CLIENT'
        },
        {
          id: "4b1e9509-cf76-457f-9b99-b7d269a3f35e",
          firstName: 'John',
          lastName: 'Lenon',
          profession: 'Musician',
          balance: 64,
          type:'CONTRACTOR'
        },
        {
          id: "a2556f7d-696c-4421-864f-51af3e2a84a7",
          firstName: 'Linus',
          lastName: 'Torvalds',
          profession: 'Programmer',
          balance: 1214,
          type:'CONTRACTOR'
        },
        {
          id: "4f347158-8c4a-4c0d-af67-e77d7e293d0f",
          firstName: 'Alan',
          lastName: 'Turing',
          profession: 'Programmer',
          balance: 22,
          type:'CONTRACTOR',
        },
        {
          id: "c84b2431-1dce-4805-8eb8-917d4bab6908",
          firstName: 'Aragorn',
          lastName: 'II Elessar Telcontarvalds',
          profession: 'Fighter',
          balance: 314,
          type:'CONTRACTOR'
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profiles', null, {})
  }
};
