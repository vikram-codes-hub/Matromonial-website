import React, { useState,useContext } from 'react';
import { Authcontext } from '../context/authcontext';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {Login}=useContext(Authcontext)

const onSubmitHandler = async (e) => {
  e.preventDefault();

  const user = await Login(
    currentState === "Sign up" ? "register" : "login",
    { name, email, password }
  );

  if (user) {
    if (currentState === "Sign up") {
      setTimeout(() => {
        toast.info("Please update your profile.");
      }, 1500);
    }


  }
};


  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-6 w-[95%] sm:w-[400px] mx-auto mt-20 bg-white rounded-xl shadow-md p-6 border border-gray-300"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <p className="text-3xl font-semibold">{currentState}</p>
        <hr className="border-none h-[2px] w-10 bg-gray-800 rounded" />
      </div>

      {currentState === "Sign up" && (
        <input
          className="border border-gray-400 rounded px-3 py-2 w-full"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        className="border border-gray-400 rounded px-3 py-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="border border-gray-400 rounded px-3 py-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex justify-between text-sm text-gray-600">
        <p className="cursor-pointer hover:underline">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer hover:underline"
            onClick={() => setCurrentState("Sign up")}
          >
            Create an account
          </p>
        ) : (
          <p
            className="cursor-pointer hover:underline"
            onClick={() => setCurrentState("Login")}
          >
            Already have an account? Login
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        {currentState === "Sign up" ? "Sign up" : "Login"}
      </button>
    </form>
  );
};

export default Login;
