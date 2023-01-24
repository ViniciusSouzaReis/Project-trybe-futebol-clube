import { Router } from 'express';
import MatchesController from '../controller/Match.controller';

const router = Router();
const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
router.post('/', matchesController.createMatch);

export default router;
