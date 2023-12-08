import { Op } from 'sequelize';
import { Contract, StatusType } from '../../models/contract';
import { Job } from "../../models/job";
import { Profile, ProfileType } from "../../models/profile";
import { sequelize } from '../../models';

export default class TransactionService {
  constructor() {}

  getContracts = async () => {
    const contracts = await Contract.findAll({
      where: { 
        status: {
          [Op.not]: StatusType.TERMINATED
        }
      }
    });
    return contracts;
  }

  getContract = async (id: string) => {
    const contract = await Contract.findByPk(id);
    if (!contract) {
      throw { errorCode: 400, message: 'Invalid ID was provided' };
    }
    return contract;
  }

  getJobsByPaidStatus = async (paidStatus: string) => {
    const status = paidStatus === 'unpaid' ? false : true;
    const unpaidJobs = await Job.findAll({
      where: { 
        paid: status,
      },
      include: [{
        model: Contract,
        where: {
          status: StatusType.IN_PROGRESS
        }
      }]
    });
    return unpaidJobs;
  }

  processJobPayment = async ({ jobId, clientId }: { jobId: string, clientId: string }) => {
    const job: any = await Job.findByPk(jobId, {
      include: [{
        model: Contract,
        attributes: ['contractorId'],
      }],
    });
    
    if (!job) {
      throw { errorCode: 400, message: 'Invalid job ID was provided' };
    };

    if (job.paid === true) {
      throw { errorCode: 400, message: 'The payment for the job has already been processed' }
    }

    const client = await Profile.findOne({
      where: {
        id: clientId,
        type: ProfileType.CLIENT,
      },
    });
    if (!client) {
      throw { errorCode: 400, message: 'Invalid client ID was provided' };
    }

    if (Number(client.balance) < Number(job.price)) {
      throw { errorCode: 400, message: 'Insufficient client balance' };
    }

    const newBalance = Number(client.balance) - Number(job.price);
    const contractorId = job.Contract.contractorId;
    const contractor = await Profile.findByPk(contractorId);
    const contractorNewBalance = Number(contractor?.balance) + Number(job.price);

    await sequelize.transaction(async (t) => {
      await Job.update({ paid: true }, {
        where: {
          id: jobId,
        },
        transaction: t,
      });

      await Profile.update({ balance: newBalance }, {
        where: {
          id: clientId,
        },
        transaction: t,
      });

      await Profile.update({ balance: contractorNewBalance }, {
        where: {
          id: contractorId,
        },
        transaction: t
      })
    });

    return { message: `Job ${jobId} paid successfully` };
  }

  processDeposit = async ({ clientId, amount }: { clientId: string, amount: number }) => {
    const client = await Profile.findOne({
      where: {
        id: clientId,
        type: ProfileType.CLIENT,
      },
    });

    if (!client) {
      throw { errorCode: 400, message: 'Invalid client ID was provided' };
    }

    const unpaidContractIds = await Contract.findAll({
      attributes: ['id'],
      where: {
        status: StatusType.IN_PROGRESS,
        clientId,
      },
      raw: true,
    });

    const contractIds = unpaidContractIds.map((contract: any) => contract.id);

    const totalUnpaidJobsAmount = await Job.sum('price', {
      where: {
        paid: false,
        contractId: {
          [Op.in]: contractIds,
        },
      },
    });

    const by25Percent = totalUnpaidJobsAmount * 0.25;

    if (Number(client.balance) + amount > by25Percent) {
      throw { errorCode: 400, message: `Deposit cannot be more than 25% of total unpaid job prices: ${by25Percent}` };
    }

    const newBalance = client.balance + amount;
    await Profile.update({ balance: newBalance }, {
      where: {
        id: clientId,
      },
    });

    return { message: 'Amount deposited successfully' };
  }
}