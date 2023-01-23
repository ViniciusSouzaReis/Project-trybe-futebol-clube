import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User.Model';
import TeamsMock from './mocks/TeamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Cobertura dos requisitos de Login', () => {
  afterEach(sinon.restore);

  it('Retorna todos os times do database', async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(TeamsMock);
  });

  it('Retorna apenas 1 time do database', async () => {
    const result = await chai.request(app).get('/teams/5');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(TeamsMock[4]);
  });
})