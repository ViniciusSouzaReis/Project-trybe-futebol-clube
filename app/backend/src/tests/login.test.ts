import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User.Model';
import LoginMock from './mocks/LoginMocks'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Cobertura dos requisitos de Login', () => {
  afterEach(sinon.restore);

  it('Login com dados validos', async () => {
    const result = await chai.request(app).post('/login').send({ email: LoginMock.user.email, password: "secret_admin"});
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('token');
  });

  it('Tentativa de login com dados incompletos', async () => {
    const result = await chai.request(app).post('/login').send({ password: "secret_admin"});
    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.equal({ message: 'All fields must be filled' });
  });

  it('Tentativa de login com usuario incorreto', async () => {
    const result = await chai.request(app).post('/login').send({ email: LoginMock.fakeUser.email, password: "fake_admin"});
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.equal({ message: 'Incorrect email or password' });
  });

  it('Retorna a role do usuário', async () => {
    sinon.stub(UserModel, 'findOne').resolves({ dataValues: LoginMock.user } as UserModel);
    const result = await chai.request(app).get('/login/validate').set('Authorization', LoginMock.token);
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal({ role: "admin" });
  });

  it('Retorna a role do usuário com o token incorreto', async () => {
    const result = await chai.request(app).get('/login/validate');
    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.equal({ message: 'Token not found' });
  });
})