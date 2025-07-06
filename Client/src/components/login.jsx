import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./input";
import { useState } from "react";
const initialvalue = {
  email: "",
  password: ""
};

const reducer = (state, action) => {
  return { ...state, [action.field]: action.val };
};

export function Login() {
  const [state, dispatch] = useReducer(reducer, initialvalue);
  const [error,setError]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.email || !state.password) {
      setError("Email and password are required");
      return;
     }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storage")); // Notify other components

        alert("✅ Login successful");
        console.log("User:", data.user);
        console.log("Token:", data.token);
        navigate("/"); // Redirect after login
      } else {
        alert("❌ " + data.message);
        navigate("/register"); // Redirect to register if login failed
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ val: e.target.value, field: "email" })
          }
          required
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ val: e.target.value, field: "password" })
          }
          required
        />
           {error && (
        <p className="text-red-700 text-sm text-center font-semibold mb-2">
          {error}
        </p>
      )}
        <Button text="Login" className="w-full" />
      </form>
    </div>
  );
}
