/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from 'app';

describe('App', () => {
  before((done) => {
    app.listen((err: unknown) => {
      if (err) return done(err);
      return done();
    });
  });

  it('Works Properly', (done) => {
    request(app)
      .get('/')
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Hello World!');
        return done();
      });
  });
});
