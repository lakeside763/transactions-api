import { NextFunction, Request, Response} from 'express';
import TransactionService from "./transaction.service"

export default class TransactionController {
  private readonly transactionService: TransactionService;
  
  constructor() {
    this.transactionService = new TransactionService()
  }

  getContracts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.transactionService.getContracts();
      return res.json(data);
    } catch (err) {
      return next(err)
    }
  }

  getContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const data = await this.transactionService.getContract(id);
      return res.json(data);
    } catch (err) {
      return next(err)
    }
  }

  getJobsByPaidStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paidStatus } = req.params;
      const data = await this.transactionService.getJobsByPaidStatus(paidStatus);
      return res.json(data);
    } catch (err) {
      return next(err)
    }
  }

  processJobPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.params;
      const { clientId } = req.body;
      const data = await this.transactionService.processJobPayment({ jobId, clientId });
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }

  processDeposit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { amount } = req.body;
      const data = await this.transactionService.processDeposit({ clientId: userId, amount });
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }
}