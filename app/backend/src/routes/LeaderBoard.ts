import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoard.controller';

const leaderRoute = Router();

leaderRoute.get('/home', LeaderBoardController.leaderBoard);

export default leaderRoute;
