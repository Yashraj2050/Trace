import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '../app/login/page';
import SignupPage from '../app/signup/page';

// Mock Supabase Auth
vi.mock('../lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
    }
  })
}));

describe('Authentication', () => {
  describe('Login Page', () => {
    it('renders the login form', async () => {
      await act(async () => {
        render(<LoginPage />);
      });
      expect(screen.getByPlaceholderText(/operator@trace.network/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/••••••••••••/i)).toBeInTheDocument();
    });
  });

  describe('Signup Page', () => {
    it('renders the signup form', async () => {
      await act(async () => {
        render(<SignupPage />);
      });
      expect(screen.getByPlaceholderText(/Jane Smith/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/operator@trace.network/i)).toBeInTheDocument();
    });
  });
});
