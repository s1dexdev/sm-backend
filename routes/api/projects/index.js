const express = require('express');
const router = express.Router();
const ctrlSprints = require('../../../controllers/sprints');
const ctrlTasks = require('../../../controllers/tasks');
const ctrlProjects = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');

const {
  validateCreateProject,
  validateUpdateProjectName,
  validateCreateSprint,
  validateCreateTask,
  validateSearchTask,
  validateSpentTimeTask,
} = require('./validation_schema');

router.get('/', guard, ctrlProjects.getProjects);

router.get('/sprints/:projectId', guard, ctrlSprints.getSprints);

router.get('/tasks/:sprintId', guard, ctrlTasks.getTasks);

router.post('/', guard, validateCreateProject, ctrlProjects.createProject);

router.post(
  '/sprints/:projectId',
  guard,
  validateCreateSprint,
  ctrlSprints.createSprint,
);

router.post(
  '/tasks/:sprintId',
  guard,
  validateCreateTask,
  ctrlTasks.createTask,
);

router.post(
  '/tasks/:sprintId/search',
  guard,
  validateSearchTask,
  ctrlTasks.findTaskByName,
);

router.delete('/:projectId', guard, ctrlProjects.removeProject);

router.delete('/sprints/:sprintId', guard, ctrlSprints.removeSprint);

router.delete('/tasks/:taskId', guard, ctrlTasks.removeTask);

router.patch(
  '/:projectId/name',
  guard,
  validateUpdateProjectName,
  ctrlProjects.updateProjectName,
);

router.patch(
  '/sprints/:sprintId/name',
  guard,
  validateUpdateProjectName,
  ctrlSprints.updateSprintName,
);

router.patch(
  '/tasks/:taskId',
  guard,
  validateSpentTimeTask,
  ctrlTasks.changeSpentTime,
);

module.exports = router;
