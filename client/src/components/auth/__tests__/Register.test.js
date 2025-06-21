import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';
import Register from '../Register';

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

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders registration form correctly', () => {
    renderRegister();
    
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderRegister();
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/phone number is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderRegister();
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('validates password requirements', async () => {
    renderRegister();
    
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });

  it('validates password confirmation', async () => {
    renderRegister();
    
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password456' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('validates tutor-specific fields', async () => {
    renderRegister();
    
    // Switch to tutor role
    const roleSelect = screen.getByLabelText(/role/i);
    fireEvent.change(roleSelect, { target: { value: 'tutor' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/hourly rate is required for tutors/i)).toBeInTheDocument();
  });

  it('handles successful registration and redirects based on role', async () => {
    const mockUser = { role: 'tutor' };
    const mockToken = 'mock-token';
    
    // Mock successful registration response
    require('axios').post.mockResolvedValueOnce({
      data: { token: mockToken, user: mockUser }
    });
    
    renderRegister();
    
    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: 'Password123' } });
    
    // Switch to tutor role and set hourly rate
    const roleSelect = screen.getByLabelText(/role/i);
    fireEvent.change(roleSelect, { target: { value: 'tutor' } });
    fireEvent.change(screen.getByLabelText(/hourly rate/i), { target: { value: '50000' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/tutor');
    });
    
    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  it('handles registration error', async () => {
    // Mock failed registration response
    require('axios').post.mockRejectedValueOnce({
      response: {
        data: { message: 'Email already exists' }
      }
    });
    
    renderRegister();
    
    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: 'Password123' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/email already exists/i)).toBeInTheDocument();
  });

  it('shows loading state during registration', async () => {
    // Mock delayed registration response
    require('axios').post.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    
    renderRegister();
    
    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: 'Password123' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/creating account/i)).toBeInTheDocument();
  });
}); 