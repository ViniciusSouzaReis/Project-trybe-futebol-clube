import MatchModel from '../database/models/Match.Model';
import TeamsModel from '../database/models/Team.Model';
import { startTeam } from '../interfaces/LeaderBoard.interface';

const teamStatistics = () => {
  const team = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };
  return team;
};

let leaderBoard = [] as startTeam[];
let newteam = teamStatistics();

const calculateHome = (matchFinished: MatchModel[], team: TeamsModel) => {
  newteam.name = team.teamName;
  matchFinished.forEach((e) => {
    if (team.id === e.homeTeamId) {
      newteam.goalsFavor += e.homeTeamGoals;
      newteam.goalsOwn += e.awayTeamGoals;
      newteam.totalGames += 1;
      if (e.homeTeamGoals > e.awayTeamGoals) {
        newteam.totalPoints += 3;
        newteam.totalVictories += 1;
      } else if (e.homeTeamGoals === e.awayTeamGoals) {
        newteam.totalPoints += 1;
        newteam.totalDraws += 1;
      } else {
        newteam.totalLosses += 1;
      }
    }
  });
};

const sortTeamsLeaders = (arrLeaderBoard: startTeam[]) => arrLeaderBoard
  .sort((a: startTeam, b: startTeam) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn
  ));

const createLeaderBoardHome = async () => {
  const allTeams = await TeamsModel.findAll();
  const matchesFinished = await MatchModel.findAll({ where: { inProgress: false } });

  allTeams.forEach((team) => {
    newteam = teamStatistics();
    calculateHome(matchesFinished, team);
    newteam.goalsBalance = newteam.goalsFavor - newteam.goalsOwn;
    newteam.efficiency = ((newteam.totalPoints / ((newteam.totalGames * 3) * 100)) * 10000)
      .toFixed(2);
    leaderBoard.push(newteam);
  });

  const boardSort = sortTeamsLeaders(leaderBoard);
  leaderBoard = [];
  return boardSort;
};

export default {
  createLeaderBoardHome,
};
