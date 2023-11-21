'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'jobs',
      [
        {
          id: "0cadb6c2-e43f-4989-9f5c-1869e817af6f",
          description: 'work',
          price: 2020,
          paid:true,
          paymentDate:'2020-08-15T19:11:26.737Z',
          contractId: "a278a0b7-e9c4-4cb7-bfb2-c1e74794fa80",
        },
        {
          id: "f0baa55a-bf90-466e-9e73-9b493781c58c",
          description: 'work',
          price: 200,
          paid:true,
          paymentDate:'2020-08-15T19:11:26.737Z',
          contractId: "e0ed21db-6a29-4b6e-9c77-eded2a15a73c",
        },
        {
          id: "80d6e14f-c479-4f2b-a857-386e38e8b63c",
          description: 'work',
          price: 200,
          paid:true,
          paymentDate:'2020-08-16T19:11:26.737Z',
          contractId: "928dc878-795a-4896-9659-77096f12018a",
        },
        {
          id: "39db4947-b53d-42d1-8944-d1244d00d0ba",
          description: 'work',
          price: 200,
          paid:true,
          paymentDate:'2020-08-17T19:11:26.737Z',
          contractId: "85349712-41c4-4ab4-9254-8d70a0c7aeca",
        },
        {
          id: "dc0159f2-ce01-4eff-bef1-a595305cdf6a",
          description: 'work',
          price: 200,
          paid:true,
          paymentDate:'2020-08-17T19:11:26.737Z',
          contractId: "e8fee317-23de-4e6d-a964-558e2566d076",
        },
        {
          id: "cbf59171-ad96-4704-8a92-67e0742963b2",
          description: 'work',
          price: 21,
          paid:true,
          paymentDate:'2020-08-10T19:11:26.737Z',
          contractId: "85349712-41c4-4ab4-9254-8d70a0c7aeca",
        },
        {
          id: "4a62c04e-3cf0-4634-82cd-e8f03fba8e02",
          description: 'work',
          price: 21,
          paid:true,
          paymentDate:'2020-08-15T19:11:26.737Z',
          contractId: "e0ed21db-6a29-4b6e-9c77-eded2a15a73c",
        },
        {
          id: "0eeb6ede-b611-47cf-b13f-abe4296f0a95",
          description: 'work',
          price: 121,
          paid:true,
          paymentDate:'2020-08-15T19:11:26.737Z',
          contractId: "928dc878-795a-4896-9659-77096f12018a",
        },
        {
          id: "aed4b8f8-da63-454d-b9d8-789bb306e85c",
          description: 'work',
          price: 121,
          paid:true,
          paymentDate:'2020-08-14T23:11:26.737Z',
          contractId: "928dc878-795a-4896-9659-77096f12018a",
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profiles', null, {})
  }
};
