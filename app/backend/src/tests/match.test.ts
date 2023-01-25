import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User.Model';
import MatchesMock from './mocks/MatchesMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEpuUlVsblBxa0lldk12ZDgzeEZMcE9YZGF3UkhHL250cWlrYU14Y2JXRXRhcUQzUUZyOWVtIiwiaWF0IjoxNjc0NTc5MDUzLCJleHAiOjE2NzUxODM4NTN9.y8vNZgENvwUg7wGRMqJo27mu4IYP7YvWxUtHyaeuJJY'

describe('Cobertura dos requisitos de Login', () => {
  afterEach(sinon.restore);

  it('Retorna todos as partidas do database', async () => {
    const result = await chai.request(app).get('/matches');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(MatchesMock.matches);
  });

  it('Retorna partidas em progresso do database', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(MatchesMock.matchesInProgress);
  });

  it('Retorna partidas terminadas do database', async () => {
    const result = await chai.request(app).get('/matches?inProgress=false');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(MatchesMock.matchesFinished);
  });

  it('Cria uma partida', async () => {
    const result = await chai.request(app).post('/matches').set('Authorization', token).send({
      homeTeamId: 16,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 0
    });
    expect(result.status).to.be.equal(201);
  });

  it('Erro com 2 times iguais', async () => {
    const result = await chai.request(app).post('/matches').set('Authorization', token).send({
      homeTeamId: 16,
      awayTeamId: 16,
      homeTeamGoals: 1,
      awayTeamGoals: 0
    });
    expect(result.status).to.be.equal(422);
  });

  it('Criacao de partida com time inexistente', async () => {
    const result = await chai.request(app).post('/matches').set('Authorization', token).send({
      homeTeamId: 750,
      awayTeamId: 16,
      homeTeamGoals: 1,
      awayTeamGoals: 0
    });
    expect(result.status).to.be.equal(404);
  });

  it('Criacao de partida sem token', async () => {
    const result = await chai.request(app).post('/matches').send({
      homeTeamId: 16,
      awayTeamId: 15,
      homeTeamGoals: 1,
      awayTeamGoals: 0
    });
    expect(result.status).to.be.equal(401);
  });
})