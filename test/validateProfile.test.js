import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { validateProfileInput } from '../src/middleware/validateProfile.js';

describe('Profile Validation Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  describe('validateProfileInput', () => {
    it('debe pasar validación con datos correctos', () => {
      req.body = {
        about: 'This is a description',
        bio: 'My bio'
      };

      validateProfileInput(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('debe rechazar si falta el campo about', () => {
      req.body = {
        bio: 'My bio'
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La descripción y la bio son obligatorias'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('debe rechazar si falta el campo bio', () => {
      req.body = {
        about: 'About me'
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La descripción y la bio son obligatorias'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('debe rechazar si about no es una cadena', () => {
      req.body = {
        about: 123,
        bio: 'My bio'
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La descripción y la bio deben ser texto'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('debe rechazar si bio no es una cadena', () => {
      req.body = {
        about: 'About me',
        bio: {}
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La descripción y la bio deben ser texto'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('debe rechazar si about tiene menos de 10 caracteres', () => {
      req.body = {
        about: 'Short',
        bio: 'My bio'
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La descripción debe tener al menos 10 caracteres'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('debe rechazar si bio tiene menos de 5 caracteres', () => {
      req.body = {
        about: 'This is a valid description',
        bio: 'Bio'
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La bio debe tener al menos 5 caracteres'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('debe ignorar espacios en blanco al validar longitud de about', () => {
      req.body = {
        about: '          ',
        bio: 'My bio'
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La descripción debe tener al menos 10 caracteres'
      });
    });

    it('debe ignorar espacios en blanco al validar longitud de bio', () => {
      req.body = {
        about: 'This is a valid description',
        bio: '     '
      };

      validateProfileInput(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La bio debe tener al menos 5 caracteres'
      });
    });

    it('debe aceptar exactly 10 caracteres en about', () => {
      req.body = {
        about: '1234567890',
        bio: 'My bio'
      };

      validateProfileInput(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('debe aceptar exactly 5 caracteres en bio', () => {
      req.body = {
        about: 'This is a valid description',
        bio: '12345'
      };

      validateProfileInput(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
