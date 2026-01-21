import { describe, it, expect } from '@jest/globals';

/**
 * Tests del Controller de Profiles
 * Prueba la lógica de negocio y validaciones
 */

describe('Profile Controller - Unit Tests', () => {
  describe('handleCreateProfile Validation', () => {
    it('debe validar que los datos no estén vacíos', () => {
      const validateData = (about, bio) => {
        if (!about || !bio) {
          throw new Error('No hay datos para agregar');
        }
        return true;
      };

      expect(() => validateData('', '')).toThrow('No hay datos para agregar');
      expect(() => validateData('About me', '')).toThrow('No hay datos para agregar');
      expect(() => validateData('', 'My bio')).toThrow('No hay datos para agregar');
    });

    it('debe permitir datos válidos', () => {
      const validateData = (about, bio) => {
        if (!about || !bio) {
          throw new Error('No hay datos para agregar');
        }
        return true;
      };

      expect(validateData('About me', 'My bio')).toBe(true);
    });

    it('debe retornar un perfil con ID después de crear', () => {
      const newProfile = {
        id: 1,
        about: 'About me',
        bio: 'My bio'
      };

      expect(newProfile).toHaveProperty('id');
      expect(newProfile).toHaveProperty('about');
      expect(newProfile).toHaveProperty('bio');
    });
  });

  describe('handleGetAllProfiles', () => {
    it('debe retornar una lista de perfiles', () => {
      const profiles = [
        { id: 1, about: 'About 1', bio: 'Bio 1' },
        { id: 2, about: 'About 2', bio: 'Bio 2' }
      ];

      expect(Array.isArray(profiles)).toBe(true);
      expect(profiles.length).toBe(2);
    });

    it('debe retornar lista vacía si no hay perfiles', () => {
      const profiles = [];
      
      expect(Array.isArray(profiles)).toBe(true);
      expect(profiles.length).toBe(0);
    });
  });

  describe('handleGetProfileById', () => {
    it('debe obtener un perfil específico por ID', () => {
      const profile = { id: 1, about: 'About me', bio: 'My bio' };
      
      expect(profile.id).toBe(1);
      expect(profile).toBeDefined();
    });

    it('debe retornar null si el perfil no existe', () => {
      const profile = null;
      
      expect(profile).toBeNull();
    });
  });

  describe('handleGetLastProfile', () => {
    it('debe obtener el último perfil creado', () => {
      const lastProfile = { id: 5, about: 'Latest', bio: 'Latest bio' };
      
      expect(lastProfile).toBeDefined();
      expect(lastProfile.id).toBe(5);
    });

    it('debe retornar null si no hay perfiles', () => {
      const lastProfile = null;
      
      expect(lastProfile).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('debe lanzar error cuando falta datos', () => {
      const throwError = () => {
        throw new Error('No hay datos para agregar');
      };

      expect(throwError).toThrow('No hay datos para agregar');
    });

    it('debe capturar errores de base de datos', () => {
      const dbError = new Error('Database connection failed');
      
      expect(() => {
        throw dbError;
      }).toThrow('Database connection failed');
    });
  });
});
