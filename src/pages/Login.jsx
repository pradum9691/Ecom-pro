import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = ({ setToggle }) => {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login form data", data);
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );
    console.log("Match user form Localstorage", user);

    if (user) {
      localStorage.setItem("currentuser", JSON.stringify(user));
      alert("Login successfully");
      reset();
      navigate("/home");
    } else {
      alert("😞 User not found, please Register first..");
      reset();
      setToggle(false);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#02030a] text-white px-4">
    
      <div className="w-full max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-neutral-400 mb-10">
          sign in to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-neutral-400">
              Email
            </label>
            <input
            {...register("email", { required: "email is required" })}
              type="email"
              className="w-full bg-transparent border-b border-neutral-700 text-sm py-2.5 focus:outline-none focus:border-neutral-200 transition-colors"
            />
            {errors.email && (
            <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
          )}
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-neutral-400">
              Password
            </label>
            <input
            {...register("password", { required: "password is required" })}
              type="password"
              className="w-full bg-transparent border-b border-neutral-700 text-sm py-2.5 focus:outline-none focus:border-neutral-200 transition-colors"
            />
            {errors.password && (
            <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>
          )}
          </div>
           <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 accent-white rounded cursor-pointer"
              />
              <span className="text-neutral-400 group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-white text-black text-sm font-semibold py-3 rounded-md hover:bg-neutral-200 transition-colors"
          >
            sing in
          </button>

          <p className="text-xs text-neutral-400 text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setToggle((prev) => !prev)}
              className="text-white font-medium hover:underline"
            >
                Register her
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
