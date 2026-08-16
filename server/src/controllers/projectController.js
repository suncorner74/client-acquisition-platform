const Project = require('../models/Project');

// @desc    Get all projects (Public view)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ featured: -1, order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by slug or ID
// @route   GET /api/projects/:idOrSlug
// @access  Public
const getProjectByIdOrSlug = async (req, res, next) => {
  try {
    const param = req.params.idOrSlug;
    let project = await Project.findOne({ slug: param });
    if (!project && param.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(param);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project (Admin)
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      clientType,
      category,
      technologies,
      image,
      liveUrl,
      githubUrl,
      features,
      challenges,
      solution,
      results,
      featured,
      order
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Title, description and category are required' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const project = await Project.create({
      title,
      slug: slug + '-' + Date.now().toString().slice(-4),
      description,
      clientType: clientType || 'Enterprise Client',
      category,
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()) : []),
      image,
      liveUrl,
      githubUrl,
      features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : []),
      challenges,
      solution,
      results,
      featured: Boolean(featured),
      order: Number(order) || 0
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project (Admin)
// @route   PATCH /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project (Admin)
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject
};
