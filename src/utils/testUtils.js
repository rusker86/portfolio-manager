import { describe, it, expect } from '@jest/globals';

/**
 * Test Utils - Funciones auxiliares para tests
 */

export function createMockRequest(body = {}, params = {}, query = {}) {
  return {
    body,
    params,
    query,
    headers: {}
  };
}

export function createMockResponse() {
  const res = {
    statusCode: 200,
    _getStatusCode() {
      return this.statusCode;
    },
    _getJSONData() {
      return this._jsonData;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this._jsonData = data;
      return this;
    },
    send(data) {
      this._jsonData = data;
      return this;
    }
  };
  return res;
}

export function createMockNext() {
  return jest.fn();
}

describe('Test Utils', () => {
  it('debe crear un mock de request correctamente', () => {
    const mockReq = createMockRequest(
      { name: 'test' },
      { id: 1 }
    );

    expect(mockReq.body).toEqual({ name: 'test' });
    expect(mockReq.params).toEqual({ id: 1 });
  });

  it('debe crear un mock de response correctamente', () => {
    const mockRes = createMockResponse();
    mockRes.status(404).json({ message: 'Not found' });

    expect(mockRes._getStatusCode()).toBe(404);
    expect(mockRes._getJSONData()).toEqual({ message: 'Not found' });
  });

  it('debe crear un mock de next correctamente', () => {
    const mockNext = createMockNext();
    
    expect(typeof mockNext).toBe('function');
  });
});
