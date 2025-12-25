import { useForm } from "react-hook-form";


const Register = ({ setToggle }) => {
 const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully! Please login.");

    reset();
    setToggle(true);
  };
    
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#02030a] text-white px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Create account
        </h1>
        <p className="text-sm text-neutral-400 mb-10">
          Sign up to get started
        </p>

        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-neutral-400">
              Full Name
            </label>
            <input
             {...register("fullname", { required: "fullname is required" })}
              type="text"
              className="w-full bg-transparent border-b border-neutral-700 text-sm py-2.5 focus:outline-none focus:border-neutral-200 transition-colors"
            />
          {errors.fullname && (
            <p className="text-red-500 text-xs mb-2">{errors.fullname.message}</p>
          )}

          </div>

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
              Phone Number
            </label>
            <input
            {...register("mobile", { required: "mobile is required" })}
              type="tel"
              className="w-full bg-transparent border-b border-neutral-700 text-sm py-2.5 focus:outline-none focus:border-neutral-200 transition-colors"
            />
            {errors.mobile && (
            <p className="text-red-500 text-xs mb-2">{errors.mobile.message}</p>
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
          

          <button
            type="submit"
            className="mt-6 w-full bg-white text-black text-sm font-semibold py-3 rounded-md hover:bg-neutral-200 transition-colors"
          >
            Sign Up
          </button>

          <p className="text-xs text-neutral-400 text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setToggle((prev) => !prev)}
              className="text-white font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
