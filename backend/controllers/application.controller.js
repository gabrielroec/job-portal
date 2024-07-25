import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Invalid job id" });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res
      .status(201)
      .json({ message: "Application submitted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: "company",
          options: {
            sort: { createdAt: -1 },
          },
        },
      });

    if (!application) {
      return res.status(404).json({ message: "Applications not found" });
    }
    return res
      .status(200)
      .json({ message: "Applications fetched successfully", application });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const applicants = await Application.find({ job: jobId }).populate({
      path: "applicant",
      options: {
        sort: { createdAt: -1 },
      },
    });
    return res
      .status(200)
      .json({ message: "Applicants fetched successfully", applicants });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    let { status } = req.body;
    const applicationId = req.params.id;
    status.toLowercase();
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    if (!status) {
      return res.status(400).json({ message: "Invalid status" });
    }
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    return res.status(200).json(application);
  } catch (error) {
    console.log(error);
  }
};
