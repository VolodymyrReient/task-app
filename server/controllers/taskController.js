const Task = require("../models/taskModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find(), req.query).paginate().sort();
  const totalCount = await Task.countDocuments();
  const tasks = await features.query;

  res.status(200).json({
    status: "success",
    results: tasks.length,
    totalCount,
    data: { tasks },
  });
});

exports.getSingleTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return next(new AppError("No task found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { task },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const newTask = await Task.create(req.body);

  res.status(201).json({ status: "success", data: { task: newTask } });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(new AppError("No task found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { task },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return next(new AppError("No task found with that ID", 404));
  }

  res.status(204).json({
    data: null,
  });
});
