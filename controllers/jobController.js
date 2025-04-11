import mongoose from "mongoose";
import moment from "moment";
import jobsModel from "../models/jobsModel.js";

// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("please provide all fiels");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};


// ======= GET JOBS ===========
export const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;

  //conditons for searching filters
  const queryObject = {
    createdBy: req.user.userId,
  };
  //logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // sorting
  let queryResult = jobsModel.find(queryObject);
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }


  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  queryResult = queryResult.skip(skip).limit(limit);

  //jobs count
  const totolJobs = await jobsModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totolJobs / limit);

  const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totolJobs,
    jobs,
    numOfPage,
  });
};


// ======= UPDATE JOBS ===========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    next("Please Provide all fiels");
  }

  const job = await jobsModel.findOne({ _id: id });

  if (!job) {
    next(`No jobs found with this is ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("Your not authorized to update this job");
    return;
  }

  const updateJob = await jobsModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updateJob });
};

// Delete Job
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next(`No jobs found with this is ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("Your not authorized to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, job deleted! " });
};

// =======  JOBS STATS & FILTERS ===========
export const jobStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultStats = {
    Pending: stats.Pending || 0,
    Reject: stats.Reject || 0,
    Interview: stats.Interview || 0,
  };

  // monthly yearl stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: `$createdAt` },
          month: { $month: `$createdAt` },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totolJob: stats.length, defaultStats, monthlyApplication });
};
