import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { User, AuthState } from '../types';
import { api } from '../services/api';

// ===== CONTEXT TYPES =====
interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ===== REDUCER =====
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

// ===== CONTEXT =====
const AuthContext = createContext<AuthContextValue | null>(null);

// ===== PROVIDER =====
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('rt_token');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }
      try {
        const user = await api.auth.verifyToken(token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch {
        localStorage.removeItem('rt_token');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { user, token } = await api.auth.login(email, password);
      localStorage.setItem('rt_token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch (err) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    await api.auth.logout();
    localStorage.removeItem('rt_token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ===== HOOK =====
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
