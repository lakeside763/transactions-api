import { Request, Response} from 'express';
import TransactionService from "./transaction.service"

export default class TransactionController {
  private readonly transactionService: TransactionService;
  
  constructor() {
    this.transactionService = new TransactionService()
  }

  getAllTransactions = async (req: Request, res: Response) => {
    const data = await this.transactionService.getAllTransactions();
    console.log(data)
    return res.json(data);
  }
}