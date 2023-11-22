import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

const adminController = new AdminController();

router.get('/admin/best-profession', adminController.getProfessionsWithBestPaid);
router.get('/admin/best-clients', adminController.getClientsWithBestPaid);


export default router;