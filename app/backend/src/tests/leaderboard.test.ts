import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User.Model';
import LeaderBoardMoks from './mocks/LeaderBoardMoks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Cobertura dos requisitos de Leaderboard', () => {
  afterEach(sinon.restore);

  it('Retorna o leaderboard do time da casa do database', async () => {
    const result = await chai.request(app).get('/leaderboard/home');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(LeaderBoardMoks.home);
  });

  it('Retorna o leaderboard do time visitante do database', async () => {
    const result = await chai.request(app).get('/leaderboard/away');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(LeaderBoardMoks.away);
  }); 
  
  it('Retorna o leaderboard geral do database', async () => {
    const result = await chai.request(app).get('/leaderboard');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(LeaderBoardMoks.overall);
  });  
});