import { Request, Response } from 'express';
import complianceRoutes from '../server/routes/compliance.js';

export default function handler(req: Request, res: Response) {
  return complianceRoutes(req, res, () => {});
}
