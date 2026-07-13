import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { z } from "zod";
import signinGif from "../../assets/signin.gif";

interface SignupResponse {
  success?: boolean;
  error?: boolean;
  message: string;
  intentToken?: string;
}

// ✅ ZOD SCHEMA
const SignupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be less than 15 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Must be 6+ chars"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ VALIDATION
  const validate = () => {
    const result = SignupSchema.safeParse(form);

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

  // ✅ IMAGE UPLOAD
  const imageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleUploadPic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await imageToBase64(file);
      setImagePreview(base64);
      setSelectedFile(file);
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("confirmPassword", form.confirmPassword);

      if (selectedFile) formData.append("image", selectedFile);

      const response = await fetch(
        "http://localhost:8080/api/v1/user/register",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const result: SignupResponse = await response.json();

      if (!response.ok) throw new Error(result.message);

      localStorage.setItem("intentToken", result.intentToken || "");
      toast.success(result.message);
      navigate("/otpverify");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE
  const googleSignUp = () => {
    const API_BASE =
      import.meta.env.VITE_BACKEND_URL_LOCAL ||
      import.meta.env.VITE_BACKEND_URL_PRODUCTION ||
      "http://localhost:8080";

    window.location.href = `${API_BASE}/api/v1/auth/google`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-10">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <img
              src={imagePreview || signinGif}
              className="w-14 h-14 rounded-full object-cover border-4"
            />
            <label className="absolute bottom-0 left-0 w-full text-center bg-black/60 text-white text-xs py-2 opacity-0 group-hover:opacity-100 cursor-pointer rounded-b-full">
              Upload Photo
              <input type="file" className="hidden" onChange={handleUploadPic} />
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* PASSWORD */}
          <div className="flex border p-2 rounded">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="flex-grow outline-none"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* CONFIRM */}
          <div className="flex border p-2 rounded">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="flex-grow outline-none"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-red-600 text-white rounded"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
          </button>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={googleSignUp}
            className="w-full border py-2 flex justify-center gap-2"
          >
            <FcGoogle /> Sign up with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}