import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import referralsRouter from "./referrals";
import communityRouter from "./community";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(referralsRouter);
router.use(communityRouter);

export default router;
