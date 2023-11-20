import { Router } from "express";
import TransactionController from "./transactions.controller";

const router = Router();

const transactionController = new TransactionController();

router.get('/transactions', transactionController.getAllTransactions);

export default router;