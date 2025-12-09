const Project = require('../models/Project');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const getProjects = catchAsync(async (req, res, next) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

const createProject = catchAsync(async (req, res, next) => {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
        return next(new AppError('All fields are required', 400));
    }
    const newProject = new Project({ name, description, image });
    await newProject.save();
    res.status(201).json(newProject);
});

const updateProject = catchAsync(async (req, res, next) => {
    const { name, description } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );

    if (!updatedProject) {
        return next(new AppError('No project found with that ID', 404));
    }

    res.json(updatedProject);
});

const deleteProject = catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
        return next(new AppError('No project found with that ID', 404));
    }
    res.json({ message: 'Project deleted' });
});

module.exports = { getProjects, createProject, updateProject, deleteProject };
