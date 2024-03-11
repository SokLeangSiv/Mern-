import Job from "../model/jobModel.js";
import mongoose from "mongoose";
import day from "dayjs";
import { query } from "express";

export const getAllJobs = async (req, res) => {


  try {
    const { search, jobStatus, jobType, sort } = req.query;

    const queryObject = {
      createdBy: req.user.userId,
    };

    if (search) {
      queryObject.$or = [
        { postion: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (jobStatus && jobStatus !== "all") {
      queryObject.jobStatus = jobStatus;
    }

    if (jobType && jobType !== "all") {
      queryObject.jobType = jobType;
    }

    const sortOptions = {
      newest: "-createdAt",
      oldest: "createdAt",
      "a-z": "position",
      "z-a": "-position",
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;


    //piganation
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //piganation


    const totalJobs = await Job.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalJobs / limit);

    // req.user.createdBy = req.user.userId;
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);
    res.status(200).json({
      message: "Data received successfully!",
      totalJobs,
      numOfPages,
      currentPage: page,
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(201).json({
    message: "Data received successfully!",
    job,
  });
};

export const getOneJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found with this id",
      });
    }

    res.status(200).json({
      message: "Data received successfully!",
      job,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updateJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

  if (!updateJob) {
    return res.status(404).json({
      message: "Job not found with this id",
    });
  }

  res.status(200).json({
    message: "Data updated successfully!",
    updateJob,
  });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removeJob = await Job.findByIdAndDelete(id);

  if (!removeJob) {
    return res.status(404).json({
      message: "Job not found with this id",
    });
  }

  res.status(200).json({
    message: "Job deleted successfully!",
    job: removeJob,
  });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);

  const defaultStats = {
    pending: stats.pending || 0,
    interviewd: stats.interviewd || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(200).json({ defaultStats, monthlyApplications });
};
