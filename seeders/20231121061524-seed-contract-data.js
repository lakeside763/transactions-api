'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'contracts',
      [
        {
          id: "85349712-41c4-4ab4-9254-8d70a0c7aeca",
          terms: 'bla bla bla',
          status: 'TERMINATED',
          clientId: "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
          contractorId: "4b1e9509-cf76-457f-9b99-b7d269a3f35e"
        },
        {
          id: "e0ed21db-6a29-4b6e-9c77-eded2a15a73c",
          terms: 'bla bla bla',
          status: 'IN_PROGRESS',
          clientId: "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
          contractorId: "a2556f7d-696c-4421-864f-51af3e2a84a7"
        },
        {
          id: "928dc878-795a-4896-9659-77096f12018a",
          terms: 'bla bla bla',
          status: 'IN_PROGRESS',
          clientId: "046a7b29-2ff1-4173-b606-1d17779ebc20",
          contractorId: "a2556f7d-696c-4421-864f-51af3e2a84a7"
        },
        {
          id: "f1c2601d-3d3c-4c70-8dfd-c539e2576f05",
          terms: 'bla bla bla',
          status: 'IN_PROGRESS',
          clientId: "046a7b29-2ff1-4173-b606-1d17779ebc20",
          contractorId: "4f347158-8c4a-4c0d-af67-e77d7e293d0f"
        },
        {
          id: "e8fee317-23de-4e6d-a964-558e2566d076",
          terms: 'bla bla bla',
          status: 'NEW',
          clientId: "f4539b79-cd50-4438-92f3-285f270a3f7c",
          contractorId: "c84b2431-1dce-4805-8eb8-917d4bab6908"
        },
        {
          id: "9c8efda8-4107-4afd-b6bd-a401750b524e",
          terms: 'bla bla bla',
          status: 'IN_PROGRESS',
          clientId: "f4539b79-cd50-4438-92f3-285f270a3f7c",
          contractorId: "4f347158-8c4a-4c0d-af67-e77d7e293d0f"
        },
        {
          id: "a278a0b7-e9c4-4cb7-bfb2-c1e74794fa80",
          terms: 'bla bla bla',
          status: 'IN_PROGRESS',
          clientId: "7bbae488-0ce7-4c0f-98e7-da13ccdc73f8",
          contractorId: "4f347158-8c4a-4c0d-af67-e77d7e293d0f"
        },
        {
          id: "f371f117-0ab7-45a5-912b-30449009fc24",
          terms: 'bla bla bla',
          status: 'IN_PROGRESS',
          clientId: "7bbae488-0ce7-4c0f-98e7-da13ccdc73f8",
          contractorId: "a2556f7d-696c-4421-864f-51af3e2a84a7"
        },
        {
          id: "b530c3cc-86b9-4dab-a8d0-3e385c2f09bb",
          terms: 'bla bla bla',
          status: 'IN_PROGRESS',
          clientId: "7bbae488-0ce7-4c0f-98e7-da13ccdc73f8",
          contractorId: "c84b2431-1dce-4805-8eb8-917d4bab6908"
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contracts', null, {})
  }
};
