import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import referralsRouter from "./referrals";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(referralsRouter);

export default router;
