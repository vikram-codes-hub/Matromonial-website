import React, { useState, useContext } from 'react';
import { Authcontext } from '../Context/Authcontext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Login } = useContext(Authcontext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await Login({ email, password });
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col justify-center items-center gap-6 w-[95%] sm:w-[400px] bg-gray-100 rounded-xl shadow-md p-6 border border-gray-300"
      >
        <div className="flex items-center gap-3 mb-4 justify-center">
          <p className="text-3xl font-semibold">Login</p>
          <hr className="border-none h-[2px] mt-2 bg-gray-800 rounded w-10" />
        </div>

        <input
          className="border border-gray-400 rounded px-3 py-2 w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border border-gray-400 rounded px-3 py-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-1/2 bg-black text-white py-2 rounded-md hover:scale-105 transition-transform"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
