import { Router } from 'express';
import MatchesController from '../controller/Match.controller';

const router = Router();
const matchesController = new MatchesController();

router.get('/', matchesController.getAll.bind(matchesController));

export default router;
