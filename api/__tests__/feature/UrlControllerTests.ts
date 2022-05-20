
import supertest from 'supertest';
import { connect } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { HttpResponseCode } from '../../src/http/types';
import server from '../../src/http/server';
import { Url } from '../../src/app/domain/models/Url';
import { environment } from '../../src/environment/environment'
import { setupDbConnection } from '../../src/infrastructure/db'

const request = supertest(server);

describe('Url API tests', () => {
  beforeEach(async () => {
    setupDbConnection();
  });

  it('should return a 200 for a valid GET request', async () => {
    // Arrange
    // Act
    const response = await request
      .get('/urls')
      .send();

    // Assert
    expect(response.statusCode).toBe(HttpResponseCode.Success);
    expect(Array.isArray(response.body)).toBe(true);
  })

  it('should return a model for a valid GET request', async () => {
    // Arrange
    const id = uuid();

    const url = new Url({
      url: `https://${id}.com`,
      short: id.substring(0, 7),
    }); 
  
    await url.save();

    // Act
    const response = await request
      .get('/urls')
      .send();

    // Assert
    expect(response.body.length > 0);
  })
  
  it('should return a 200 for a valid POST request', async () => {
    // Arrange
    const body = { url: 'https://google.com' };

    // Act
    const response = await request
      .post('/urls')
      .send(body);

    // Assert
    expect(response.statusCode).toBe(HttpResponseCode.Success);
  })

  it('should return a 400 for a invalid POST request', async () => {
    // Arrange
    const body = { url: 'https://google' };

    // Act
    const response = await request
      .post('/urls')
      .send(body);

    // Assert
    expect(response.statusCode).toBe(HttpResponseCode.BadRequest);
  })

  it('should persist the url model in the db', async () => {
    // Arrange
    const id = uuid();
    const body = { url: `https://${id}.com` };

    // Act
    await request
      .post('/urls')
      .send(body);

    // Assert
    const model = await Url.findOne({url: body.url});
    expect(model?.short).toBeDefined();
  })

  it('should return the newly created url from the db', async () => {
    // Arrange
    const id = uuid();
    const body = { url: `https://${id}.com` };

    // Act
    const response = await request
      .post('/urls')
      .send(body);

    // Assert
    expect(response.body.url).toContain(id);
    expect(response.body.short).toBeDefined();
  })
});