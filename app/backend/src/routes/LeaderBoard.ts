import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoard.controller';

const router = Router();
const leaderboardController = new LeaderBoardController();

router.get('/home', leaderboardController.getHomeLeaderBoard);
router.get('/away', leaderboardController.getAwayLeaderBoard);

export default router;
