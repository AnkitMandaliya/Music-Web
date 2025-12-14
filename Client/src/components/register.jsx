import { useReducer } from "react";
import { Input, Button } from "./input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initialvalue = {
  username: "",
  email: "",
  password: "",
};

const reducer = (state, action) => {
  return { ...state, [action.field]: action.val };
};

export function Register() {
  const [state, dispatch] = useReducer(reducer, initialvalue);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.email || !state.password || !state.username) {
      setError("Email and password are required");
      return;
    }
    const Passpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
    if (state.username.length > 8) {
      setError("Username should not be more than 8 character ");
      return;
    }
    if (state.password.length < 5) {
      setError("Password should not be less than 5 characters");
      return;
    } else if (!Passpattern.test(state.password)) {
      setError(
        "Password must contain at least one capital letter, one small letter, and one special character"
      );
      return;
    } else {
      setError("");
    }

    try {
      if (!import.meta.env.VITE_API_URL) {
        alert("❌ API URL not configured");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state),
        }
      );

      let data;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Server did not return JSON");
      }

      if (res.ok) {
        alert("✅ Registered successfully!");
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("❌ Server error");
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Register
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={state.username}
          onChange={(e) => dispatch({ val: e.target.value, field: "username" })}
          required
          autoComplete="username"
          className="w-full"
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={(e) => dispatch({ val: e.target.value, field: "email" })}
          required
          autoComplete="email"
          className="w-full"
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={(e) => dispatch({ val: e.target.value, field: "password" })}
          required
          autoComplete="new-password"
          className="w-full"
        />
        {error && (
          <p className="text-red-700 text-sm text-center font-semibold mb-2">
            {error}
          </p>
        )}
        <Button text="Register" className="w-full" />
      </form>
    </div>
  );
}
