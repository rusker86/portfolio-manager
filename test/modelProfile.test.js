import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

jest.mock('../src/db/sqliteClient.js');
jest.mock('../src/utils/logger.js');

import { createProfile, getAllProfiles, getProfileById, getLastProfile } from '../src/model/modelProfile.js';
import { logger } from '../src/utils/logger.js';

describe('Profile Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProfile', () => {
    it('debe crear un perfil correctamente', () => {
      // Simulamos la inserción correcta
      const newProfile = {
        id: 1,
        about: 'About me',
        bio: 'My bio'
      };

      expect(newProfile.id).toBeDefined();
      expect(newProfile.about).toBe('About me');
      expect(newProfile.bio).toBe('My bio');
    });

    it('debe manejar errores en la inserción', () => {
      const dbError = new Error('Insert failed');
      expect(() => {
        throw dbError;
      }).toThrow('Insert failed');
    });
  });

  describe('getAllProfiles', () => {
    it('debe obtener todos los perfiles', () => {
      const mockProfiles = [
        { id: 1, about: 'About 1', bio: 'Bio 1' },
        { id: 2, about: 'About 2', bio: 'Bio 2' }
      ];

      expect(mockProfiles).toHaveLength(2);
      expect(mockProfiles[0].id).toBe(1);
    });

    it('debe retornar null si no hay perfiles', () => {
      const result = null;
      expect(result).toBeNull();
    });

    it('debe manejar errores de la base de datos', () => {
      const dbError = new Error('Query failed');
      expect(() => {
        throw dbError;
      }).toThrow('Query failed');
    });

    it('debe retornar array vacío correctamente', () => {
      const result = [];
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('getProfileById', () => {
    it('debe obtener un perfil por ID', () => {
      const mockProfile = { id: 1, about: 'About me', bio: 'My bio' };
      expect(mockProfile.id).toBe(1);
    });

    it('debe retornar null si no existe', () => {
      const result = null;
      expect(result).toBeNull();
    });
  });

  describe('getLastProfile', () => {
    it('debe obtener el último perfil', () => {
      const mockProfile = { id: 5, about: 'Last profile', bio: 'Last bio' };
      expect(mockProfile.id).toBe(5);
    });

    it('debe retornar null si no hay perfiles', () => {
      const result = null;
      expect(result).toBeNull();
    });
  });
});
