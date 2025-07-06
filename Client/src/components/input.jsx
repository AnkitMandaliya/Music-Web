import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Input({ type, placeholder, value, name, onChange, required }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  return (
    <div className="relative w-full mt-4">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg bg-gray-800 text-white"
        autoComplete={name}
      />
      {isPassword && (
        <span
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      )}
    </div>
  );
}



export function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-full bg-blue-500 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-base sm:text-lg"
    >
      {text}
    </button>
  );
}

