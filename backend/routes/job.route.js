import express from "express";
import {
  getAllJobs,
  getJobById,
  getJobByLoggedAdminUser,
  postJob,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAutheticated.js";

const router = express.Router();

router.route("/postjob").post(isAuthenticated, postJob);
router.route("/all").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getJobByLoggedAdminUser);
router.route("/:id").get(isAuthenticated, getJobById);

export default router;
