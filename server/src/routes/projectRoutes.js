const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.get('/:idOrSlug', getProjectByIdOrSlug);
router.post('/', protect, createProject);
router.patch('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
