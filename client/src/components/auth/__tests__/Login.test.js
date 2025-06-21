import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';
import Login from '../Login';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(),
  defaults: {
    headers: {
      common: {},
    },
  },
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    renderLogin();
    
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/create a new account/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('shows error for empty password', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('handles successful login and redirects based on role', async () => {
    const mockUser = { role: 'tutor' };
    const mockToken = 'mock-token';
    
    // Mock successful login response
    require('axios').post.mockResolvedValueOnce({
      data: { token: mockToken, user: mockUser }
    });
    
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/tutor');
    });
    
    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  it('handles login error', async () => {
    // Mock failed login response
    require('axios').post.mockRejectedValueOnce({
      response: {
        data: { message: 'Invalid credentials' }
      }
    });
    
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('shows loading state during login', async () => {
    // Mock delayed login response
    require('axios').post.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });
}); 