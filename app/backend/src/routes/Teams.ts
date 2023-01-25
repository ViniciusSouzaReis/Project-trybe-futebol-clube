import { Router } from 'express';
import TeamsController from '../controller/Teams.controller';

const router = Router();
const teamsController = new TeamsController();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.findOneTeam);

export default router;
