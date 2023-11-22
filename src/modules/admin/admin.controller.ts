import { AdminService } from "./admin.service";
import { Request, Response, NextFunction } from 'express';

export class AdminController {
  private readonly adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  getProfessionsWithBestPaid = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { start, end, limit } = req.query
      const data = await this.adminService.getProfessionsWithBestPaid({ start, end, limit });
      return res.json(data);
    } catch (err) {
      next(err)
    }
  }

  getClientsWithBestPaid = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { start, end, limit } = req.query
      const data = await this.adminService.getClientsWithBestPaid({ start, end, limit });
      return res.json(data);
    } catch (err) {
      next(err)
    }
  }
}