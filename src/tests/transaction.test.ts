import { sequelize } from '../models';
import { Profile } from '../models/profile';
import { Contract } from '../models/contract';
import clientRequest from './client';
import { Job } from '../models/job';

const sampleProfiles: any = [
  {
    id: "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
    firstName: 'Harry',
    lastName: 'Potter',
    profession: 'Wizard',
    balance: 1150,
    type: 'CLIENT'
  },
  {
    id: "4b1e9509-cf76-457f-9b99-b7d269a3f35e",
    firstName: 'John',
    lastName: 'Lenon',
    profession: 'Musician',
    balance: 64,
    type:'CONTRACTOR'
  },
]

const sampleContracts: any = [
  {
    id: "e0ed21db-6a29-4b6e-9c77-eded2a15a73c",
    terms: "bla bla bla",
    status: "IN_PROGRESS",
    clientId: "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
    contractorId: "4b1e9509-cf76-457f-9b99-b7d269a3f35e",
  },
  {
    id: "928dc878-795a-4896-9659-77096f12018a",
    terms: "bla bla bla",
    status: "NEW",
    clientId: "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
    contractorId: "4b1e9509-cf76-457f-9b99-b7d269a3f35e",
  },
]

const sampleJobs: any = [
  {
    id: "f0baa55a-bf90-466e-9e73-9b493781c58c",
    description: 'work',
    price: 200,
    paid: false,
    paymentDate:'2020-08-15T19:11:26.737Z',
    contractId: "e0ed21db-6a29-4b6e-9c77-eded2a15a73c",
  },
  {
    id: "80d6e14f-c479-4f2b-a857-386e38e8b63c",
    description: 'work',
    price: 200,
    paid: true,
    paymentDate:'2020-08-16T19:11:26.737Z',
    contractId: "928dc878-795a-4896-9659-77096f12018a",
  },
]

describe('test transaction requests', () => {
  beforeAll(() => {});

  afterEach(async() => {
    await Job.destroy({ where: {} });
    await Contract.destroy({ where: {} });
    await Profile.destroy({ where: {} });
  });
  test('true is truthy', () => {
    expect(true).toBeTruthy()
  })

  // Integration testing
  test('should fetch list of contracts', async () => {
    const profiles = await Profile.bulkCreate(sampleProfiles)
    const contracts = await Contract.bulkCreate(sampleContracts);
    
    const response = await clientRequest('/transactions/contracts');

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2);
    expect(response.body[0].id).toEqual(contracts[0].id);
    expect(response.body[0].clientId).toEqual(profiles[0].id)
  })

  test('should process a payment for a contractor', async () => {
    const profiles = await Profile.bulkCreate(sampleProfiles);
    const contracts = await Contract.bulkCreate(sampleContracts);
    const jobs = await Job.bulkCreate(sampleJobs); 

    const payload = { "clientId": profiles[0].id };
    const jobId = jobs[0].id;
    const response = await clientRequest(
      `/transactions/jobs/${jobId}/pay`,
      'post',
      payload
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(`Job ID ${jobId} paid successfully`)
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await sequelize.close();
  })
});
