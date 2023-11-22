import { Router } from "express";
import TransactionController from "./transactions.controller";
import { 
  GetContractValidation,
  GetJobPaidValidation,
  ProcessDepositValidation,
  ProcessJobPaymentValidation
} from "./transaction.validation";

const router = Router();

const transactionController = new TransactionController();

router.get(
  '/transactions/contracts', 
  transactionController.getContracts
);

router.get(
  '/transactions/contracts/:id',
  GetContractValidation, 
  transactionController.getContract
);

router.get(
  '/transactions/jobs/:paidStatus',
  GetJobPaidValidation, 
  transactionController.getJobsByPaidStatus
);
router.post(
  '/transactions/jobs/:jobId/pay',
  ProcessJobPaymentValidation, 
  transactionController.processJobPayment
);

router.post(
  '/transactions/balances/deposit/:userId',
  ProcessDepositValidation,  
  transactionController.processDeposit
)

export default router;
