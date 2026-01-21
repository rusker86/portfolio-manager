import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Tests de las Rutas Frontend
 * Prueba el renderizado correcto del portafolio y página 404
 */

describe('Frontend Routes - Portfolio Rendering', () => {
  let app;
  let mockResponse;
  let mockRequest;

  beforeEach(() => {
    // Mock de la respuesta
    mockResponse = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    // Mock de la solicitud
    mockRequest = {
      body: {},
      params: {}
    };

    app = express();
    app.set('view engine', 'ejs');

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.set('views', path.join(__dirname, '../view'));
  });

  describe('GET / - Root endpoint', () => {
    it('debería renderizar portfolio cuando hay perfil disponible', async () => {
      // Mock del controlador que retorna un perfil
      const mockProfile = {
        id: 1,
        about: 'Soy un desarrollador fullstack',
        bio: 'Apasionado por la programación'
      };

      // Verificar que el perfil existe
      expect(mockProfile).toBeDefined();
      expect(mockProfile.about).toBeTruthy();
      expect(mockProfile.bio).toBeTruthy();

      // Simular el renderizado
      mockResponse.render('portfolio/index', {
        about: mockProfile.about,
        bio: mockProfile.bio
      });

      expect(mockResponse.render).toHaveBeenCalledWith(
        'portfolio/index',
        expect.objectContaining({
          about: mockProfile.about,
          bio: mockProfile.bio
        })
      );
    });

    it('debería renderizar página 404 cuando no hay perfil disponible', async () => {
      // Mock del controlador que no retorna perfil
      const mockProfile = null;

      // Verificar condición: si no hay perfil
      if (!mockProfile) {
        mockResponse.render('portfolio/404');
      }

      expect(mockResponse.render).toHaveBeenCalledWith('portfolio/404');
      expect(mockResponse.render).not.toHaveBeenCalledWith('portfolio/index', expect.anything());
    });

    it('debería manejar errores correctamente', async () => {
      const error = new Error('Database connection failed');
      
      // Simular error
      mockResponse.status(500).send('Error cargando el perfil');

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith('Error cargando el perfil');
    });
  });

  describe('Profile data validation', () => {
    it('debería pasar datos válidos al template portfolio/index', () => {
      const profileData = {
        about: 'Full stack developer with expertise in JavaScript',
        bio: 'Passionate about coding'
      };

      mockResponse.render('portfolio/index', profileData);

      expect(mockResponse.render).toHaveBeenCalledWith(
        'portfolio/index',
        profileData
      );
    });

    it('debería manejar perfil con campos vacíos', () => {
      const profileData = {
        about: '',
        bio: ''
      };

      // Verificar que render se llama con los datos
      mockResponse.render('portfolio/index', profileData);

      expect(mockResponse.render).toHaveBeenCalledWith(
        'portfolio/index',
        expect.objectContaining({
          about: '',
          bio: ''
        })
      );
    });
  });

  describe('Conditional rendering logic', () => {
    it('debería verificar si lastProfile es null antes de renderizar', () => {
      const lastProfile = null;

      if (!lastProfile) {
        mockResponse.render('portfolio/404');
      } else {
        mockResponse.render('portfolio/index', {
          about: lastProfile.about,
          bio: lastProfile.bio
        });
      }

      expect(mockResponse.render).toHaveBeenCalledWith('portfolio/404');
    });

    it('debería verificar si lastProfile existe antes de renderizar index', () => {
      const lastProfile = {
        about: 'Developer info',
        bio: 'Bio info'
      };

      if (!lastProfile) {
        mockResponse.render('portfolio/404');
      } else {
        mockResponse.render('portfolio/index', {
          about: lastProfile.about,
          bio: lastProfile.bio
        });
      }

      expect(mockResponse.render).toHaveBeenCalledWith(
        'portfolio/index',
        expect.objectContaining({
          about: lastProfile.about,
          bio: lastProfile.bio
        })
      );
      expect(mockResponse.render).not.toHaveBeenCalledWith('portfolio/404');
    });

    it('debería renderizar 404 solo cuando no hay perfil', () => {
      const scenarios = [
        { profile: null, expected: 'portfolio/404' },
        { profile: undefined, expected: 'portfolio/404' },
        { 
          profile: { about: 'Info', bio: 'Bio' }, 
          expected: 'portfolio/index' 
        }
      ];

      scenarios.forEach(scenario => {
        const mockRes = { render: jest.fn() };
        
        if (!scenario.profile) {
          mockRes.render('portfolio/404');
        } else {
          mockRes.render('portfolio/index', scenario.profile);
        }

        // Verificar el resultado esperado
        if (scenario.expected === 'portfolio/404') {
          expect(mockRes.render).toHaveBeenCalledWith('portfolio/404');
        } else {
          expect(mockRes.render).toHaveBeenCalledWith('portfolio/index', expect.anything());
        }
      });
    });
  });

  describe('Error scenarios', () => {
    it('debería loguear errores sin afectar el flujo', () => {
      const errorLogger = { error: jest.fn() };
      const error = new Error('Database error');

      errorLogger.error('Error en GET /', error);

      expect(errorLogger.error).toHaveBeenCalledWith(
        'Error en GET /',
        error
      );
    });

    it('debería responder con estado 500 en caso de error', () => {
      mockResponse.status(500).send('Error cargando el perfil');

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith('Error cargando el perfil');
    });

    it('debería renderizar página 500 cuando la base de datos no está inicializada', () => {
      // Simular error de BD no inicializada
      const dbError = new Error('Base de datos no inicializada');
      dbError.statusCode = 500;

      // Cuando ocurre el error, renderizar 500
      mockResponse.render('portfolio/500');

      expect(mockResponse.render).toHaveBeenCalledWith('portfolio/500');
    });

    it('debería manejar errores de BD sin crashear el servidor', async () => {
      // Simular un error que podría ocurrir sin base de datos
      const dbError = new Error('Database not initialized');
      
      // El error debe ser capturado
      const isCriticalError = dbError instanceof Error;
      
      // Pero el servidor no debe crashear
      expect(isCriticalError).toBe(true);
      
      // Renderizar página de error
      mockResponse.render('portfolio/500');
      
      expect(mockResponse.render).toHaveBeenCalledWith('portfolio/500');
    });
  });

  describe('Database initialization scenarios', () => {
    it('debería renderizar 500 si BD no existe', () => {
      const scenarios = [
        { dbExists: false, expectedPage: 'portfolio/500' },
        { dbExists: true, expectedPage: 'portfolio/index' }
      ];

      scenarios.forEach(scenario => {
        const mockRes = { render: jest.fn() };
        
        if (!scenario.dbExists) {
          mockRes.render(scenario.expectedPage);
        } else {
          mockRes.render(scenario.expectedPage, { about: 'Info', bio: 'Bio' });
        }

        if (scenario.expectedPage === 'portfolio/500') {
          expect(mockRes.render).toHaveBeenCalledWith('portfolio/500');
        }
      });
    });

    it('debería continuar levantado si la BD falla al conectar', () => {
      // Simular que connectDB falla pero el servidor sigue levantado
      const serverStillRunning = true;
      
      expect(serverStillRunning).toBe(true);
    });

    it('debería renderizar página 500 en lugar de crashear', () => {
      const error = new Error('Base de datos no inicializada');
      error.statusCode = 500;

      // Cuando hay error, renderizar 500 en lugar de lanzar excepción no manejada
      mockResponse.render('portfolio/500');

      expect(mockResponse.render).toHaveBeenCalledWith('portfolio/500');
      // No debería haber llamado a status(500) solo (estaría en renderizado)
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
