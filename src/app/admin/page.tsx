'use client'

import React from 'react';
import Input from '../components/form/input';
import Label from '../components/form/label';
import Button from '../components/form/button';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  const handleReset = () => {
    console.log("Reset button clicked");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('./home_bg.jpg')" }}
    >
      <div className="max-w-sm w-full mx-4 p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h2>
        <form>
          <div className="mb-4">
            <Label htmlFor="username" text="Username" />
            <Input type="text" placeholder="Enter your username" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" text="Password" />
            <Input type="password" placeholder="Enter your password" required />
          </div>
          <div className="flex gap-1">
            <Button text="Login" onClick={handleLogin} bgColor='bg-blue-600' hoverColor='hover:bg-blue-700' focusColor='focus:ring-blue-300'/>
            <Button text="Reset" onClick={handleReset} bgColor='bg-gray-600' hoverColor='hover:bg-gray-700' focusColor='focus:ring-gray-300' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;



