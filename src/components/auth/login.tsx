import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import Loader from "../../ui/Loader";
import { useAuth } from "../../context/authContext";
import api, { setAccessToken } from "../../api/api_utility";

/* ================= Zod Validation =================== */
const LoginSchema = z.object({
  role: z.enum(["user", "admin"], {
    required_error: "Role is required",
  }),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

/* ================== Demo Admin ================== */
const DEMO_ADMIN = {
  email: "adminexplorer@gmail.com",
  password: "123456",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    role: "admin",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { setUser } = useAuth();


  /* ================= Validate =================== */
  const validate = () => {
    const result = LoginSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    const formErrors: Record<string, string> = {};
    result.error.errors.forEach((e) => {
      const field = e.path[0];
      if (field) formErrors[field as string] = e.message;
    });

    setErrors(formErrors);
    return false;
  };

  /* ================= Handlers ================== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* 🔥 Admin Demo Only */
  const fillDemo = () => {
    setForm({
      role: "admin",
      email: DEMO_ADMIN.email,
      password: DEMO_ADMIN.password,
    });

    toast.success("ADMIN demo loaded 🚀");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await api.post("/api/v1/user/login", form);
      const { accessToken, user } = res.data?.data || {};

      if (!accessToken || !user) {
        throw new Error("Invalid login response");
      }

      setAccessToken(accessToken);
      setUser(user);

      sessionStorage.removeItem("didLogout");
      toast.success(res.data?.message || "Login successful");

      const role = user.role.toUpperCase();

      navigate(role === "ADMIN" ? "/dashboard" : "/", {
        replace: true,
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        "Login failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate(`/forgot-password/${form.email || "email"}`);
  };

  if (isLoading) return <Loader />;

  /* ====================== UI ====================== */
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md mt-6 border border-gray-200 dark:border-gray-700">

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ADMIN DEMO BUTTON */}
          <button
            type="button"
            onClick={fillDemo}
            className="w-full border border-dashed border-gray-400 dark:border-gray-600 py-2 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
          >
            ⚡ Use Admin Demo
          </button>


          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md p-2">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div
            onClick={handleForgotPassword}
            className="text-sm text-red-500 text-right cursor-pointer hover:underline"
          >
            Forgot password?
          </div>

          {/* LOGIN BUTTON */}
          <button
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold disabled:opacity-60 transition"
          >
            Login
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </section>
  );
};

export default Login;