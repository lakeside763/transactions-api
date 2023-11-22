import request from 'supertest';
import app from '../app';
import { sequelize } from '../models';
import { Profile } from '../models/profile';
import { Contract } from '../models/contract';

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
    "terms": "bla bla bla",
    "status": "IN_PROGRESS",
    "clientId": "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
    "contractorId": "4b1e9509-cf76-457f-9b99-b7d269a3f35e",
  },
  {
    "terms": "bla bla bla",
    "status": "NEW",
    "clientId": "173a42dc-c3cc-4a67-ace5-2fc3a1052cd0",
    "contractorId": "4b1e9509-cf76-457f-9b99-b7d269a3f35e",
},
]

describe('test transaction requests', () => {
  beforeAll(() => {});

  afterEach(async() => {
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
    
    const response = await request(app)
      .get('/deel/v1/transactions/contracts')
      .expect(200);

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2);
    expect(response.body[0].id).toEqual(contracts[0].id);
    expect(response.body[0].clientId).toEqual(profiles[0].id)
  })

  afterAll(async () => {
    jest.clearAllMocks();
    await sequelize.close();
  })
});
