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
})