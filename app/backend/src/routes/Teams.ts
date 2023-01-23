import { Router } from 'express';
import TeamsController from '../controller/Teams.controller';

const router = Router();
const teamsController = new TeamsController();

router.get('/', teamsController.getAll.bind(teamsController));
router.get('/:id', teamsController.findOneTeam.bind(teamsController));

export default router;
