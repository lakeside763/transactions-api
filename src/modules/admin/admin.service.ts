import { startOfDay, endOfDay } from 'date-fns';
import { Profile, ProfileType } from '../../models/profile';
import { Contract, StatusType } from '../../models/contract';
import { Op } from 'sequelize';
import { Job } from '../../models/job';

type BestPaidInputTypes = {
  start?: any,
  end?: any,
  limit?: any
}

export class AdminService {
  constructor() {}

  getProfessionsWithBestPaid = async ({ start, end, limit }: BestPaidInputTypes) => {
    const currentDate = new Date();
    const startOfCurrentDay = startOfDay(currentDate);
    const endOfCurrentDay = endOfDay(currentDate);
  
    const startDate = start ? new Date(start) : startOfCurrentDay;
    const endDate = end ? new Date(end) : endOfCurrentDay;
    limit = limit || 1;
  
    const profiles = await Profile.findAll({
      where: {
        type: ProfileType.CONTRACTOR
      },
      raw: true
    });
  
    const mapProfileContract = await Promise.all(profiles.map(async ({ id, profession }: any) => {
      const contracts = await Contract.findAll({
        where: {
          contractorId: id,
          status: StatusType.IN_PROGRESS
        }
      });
  
      const contractsIds = contracts.map(({ id }) => id);
      const sumOfJobsPaid = await Job.sum('price', {
        where: {
          contractId: {
            [Op.in]: contractsIds
          },
          createdAt: {
            [Op.gt]: startDate,
            [Op.lte]: endDate,
          }
        }
      });
  
      return { profession, sum: sumOfJobsPaid || 0 };
    }));
  
    const sumByProfession = mapProfileContract.reduce((result: any, current) => {
      const existingProfession = result.find((item: { profession: any; }) => item.profession === current.profession);
      if (existingProfession) {
        existingProfession.sum += current.sum;
      } else {
        result.push({
          profession: current.profession,
          sum: current.sum
        });
      }
  
      return result;
    }, []);
  
    return sumByProfession.sort((a: any, b: any) => b.sum - a.sum).slice(0, limit);
  };

  getClientsWithBestPaid = async ({ start, end, limit }: BestPaidInputTypes) => {
    const currentDate = new Date();
    const startOfCurrentDay = startOfDay(currentDate);
    const endOfCurrentDay = endOfDay(currentDate);
  
    const startDate = start ? new Date(start) : startOfCurrentDay;
    const endDate = end ? new Date(end) : endOfCurrentDay;
    limit = limit || 1;
  
    const profiles = await Profile.findAll({
      where: {
        type: ProfileType.CLIENT
      },
      raw: true
    });
  
    const mapProfileContract = await Promise.all(profiles.map(async ({ id, firstName, lastName }: any) => {
      const contracts = await Contract.findAll({
        where: {
          clientId: id,
          status: StatusType.IN_PROGRESS
        }
      });
  
      const contractsIds = contracts.map(({ id }) => id);
      const sumOfJobsPaid = await Job.sum('price', {
        where: {
          contractId: {
            [Op.in]: contractsIds
          },
          createdAt: {
            [Op.gt]: startDate,
            [Op.lte]: endDate,
          }
        }
      });
  
      return { name: `${firstName} ${lastName}`, sum: sumOfJobsPaid || 0 };
    }));

    return mapProfileContract.sort((a: any, b: any) => b.sum - a.sum).slice(0, limit);;
  }
}