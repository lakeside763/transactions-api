import { Contract } from "../models/contract";
import { Job } from "../models/job";
import { Profile } from "../models/profile";
import { AdminService } from "../modules/admin/admin.service";

const adminService = new AdminService();
describe('getProfessionsWithBestPaid', () => {
  test('should return an array of professions with their sum of paid jobs', async () => {
    // Mock your database calls and input parameters for testing
    const mockProfiles: any = [
      { id: '1', profession: 'Developer' },
      { id: '2', profession: 'Designer' },
    ];

    const mockContracts: any = [
      { id: '101', contractorId: '1', status: 'IN_PROGRESS' },
      { id: '102', contractorId: '2', status: 'IN_PROGRESS' },
    ];

    const mockJobs = [
      { id: '201', price: 500, contractId: '101', createdAt: new Date() },
      { id: '202', price: 800, contractId: '102', createdAt: new Date() },
    ];

    jest.spyOn(Profile, 'findAll').mockResolvedValue(mockProfiles);
    jest.spyOn(Contract, 'findAll').mockResolvedValue(mockContracts);
    jest.spyOn(Job, 'sum').mockResolvedValue(1300);

    const result = await adminService.getProfessionsWithBestPaid({ start: '2023-01-01', end: '2023-12-31', limit: 2 });

    expect(result).toHaveLength(2);
    expect(result[0].profession).toBe('Developer');
    expect(result[0].sum).toBe(1300);
  });
});