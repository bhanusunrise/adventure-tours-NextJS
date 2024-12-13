'use client'

import React, { useState } from 'react';
import Input from '../components/form/input';
import Label from '../components/form/label';
import Button from '../components/form/button';

const LoginPage: React.FC = () => {
  // State for username, password, and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle the login process
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Clear previous error message
    setErrorMessage('');

    // Validate the input
    if (!username || !password) {
      setErrorMessage('Both username and password are required');
      return;
    }

    // Send POST request to validate the user
    try {
      const response = await fetch('/api/user/validate_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // User validated successfully
        console.log('User validated:', data.message);
        // Redirect to another page or show success
        // Example: window.location.href = '/dashboard';
      } else {
        // Handle validation failure
        setErrorMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      setErrorMessage('Internal Server Error');
      console.error('Error:', error);
    }
  };

  // Handle reset action (clear form)
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('./home_bg.jpg')" }}
    >
      <div className="max-w-sm w-full mx-4 p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Label htmlFor="username" text="Username" />
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" text="Password" />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          <div className="flex gap-1">
            <Button
  text="Login"
  type="submit" // This makes the button trigger the form's onSubmit
  bgColor="bg-blue-600"
  hoverColor="hover:bg-blue-700"
  focusColor="focus:ring-blue-300"
/>
            <Button
              text="Reset"
              onClick={handleReset}
              bgColor="bg-gray-600"
              hoverColor="hover:bg-gray-700"
              focusColor="focus:ring-gray-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;



