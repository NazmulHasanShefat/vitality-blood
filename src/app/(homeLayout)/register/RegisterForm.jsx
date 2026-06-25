"use client";

import { districts, divisions, upazilas } from "@/context/address";
import { CreateUser } from "@/lib/actions/user";
import { authClient, signUp } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploads/imageUpload";
import { toast } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiMapPin,
  FiDroplet,
  FiUploadCloud,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
    password: "",
    confirmPassword: "",
  });

  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const data = await uploadImage(imageFormData);
      console.log(data);
      if (data.success) {
        setAvatarUrl(data.data.url);
        setSuccess("Avatar uploaded successfully!");
      } else {
        setError("Failed to upload image to Imgbb.");
      }
    } catch (err) {
      setError("Something went wrong during image upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!avatarUrl) {
      setError("Please upload your avatar first.");
      return;
    }

    const result = await CreateUser({
      email: formData.email,
      name: formData.name,
      password: formData.password,
      role: "donor",
      data: {
        image: avatarUrl,
        status: "active",
        bloodGroup: formData.bloodGroup,
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
      },
    });

    console.log(result);
    if (!result.success) {
      toast.danger(result.message)
    }
    if (result.success) {
      toast.success("regiterd successfully");
      router.push("/login");
    }
  };
  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-900/30 font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg border border-emerald-200 dark:border-emerald-900/30 font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* নাম ও ইমেইল */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* অবতার আপলোডার */}
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
            User Avatar (via Imgbb)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl hover:border-red-400 dark:hover:border-red-500 transition cursor-pointer relative bg-white dark:bg-[#1e293b]">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="space-y-1 text-center">
              {avatarUrl ? (
                <div className="flex flex-col items-center space-y-2">
                  <FiCheckCircle className="text-emerald-500 text-3xl animate-bounce" />
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    Image uploaded safely!
                  </p>
                </div>
              ) : uploading ? (
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                  Uploading to Imgbb... Please wait.
                </div>
              ) : (
                <>
                  <FiUploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="relative font-medium text-[#b91c1c] dark:text-[#ef4444]">
                      Upload a file
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* বিভাগ ও ব্লাড গ্রুপ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Division
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
              <select
                name="division"
                required
                value={formData.division}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                >
                  Select Division
                </option>
                {divisions.map((division) => (
                  <option
                    key={division}
                    value={division}
                    className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                  >
                    {division}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Blood Group
            </label>
            <div className="relative">
              <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
              <select
                name="bloodGroup"
                required
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                >
                  Select Blood Group
                </option>
                {bloodGroups.map((group) => (
                  <option
                    key={group}
                    value={group}
                    className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                  >
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ডিস্ট্রিক্ট */}
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
            District
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
            <select
              name="district"
              required
              value={formData.district}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition appearance-none"
            >
              <option
                value=""
                disabled
                className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
              >
                Select District
              </option>
              {districts.map((district) => (
                <option
                  key={district}
                  value={district}
                  className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                >
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* উপজেলা */}
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
            Upazila
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
            <select
              name="upazila"
              required
              disabled={!formData.district}
              value={formData.upazila}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition appearance-none disabled:opacity-50"
            >
              <option
                value=""
                disabled
                className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
              >
                Select Upazila
              </option>
              {formData.district &&
                upazilas[formData.district]?.map((upazila) => (
                  <option
                    key={upazila}
                    value={upazila}
                    className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                  >
                    {upazila}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 rounded-xl font-semibold tracking-wide transition shadow-lg shadow-red-600/10 focus:outline-none disabled:opacity-50 dark:bg-[#b91c1c] dark:hover:bg-[#a11818]"
          >
            {uploading ? "Processing Image..." : "Register Now"}
          </button>
        </div>
        <p>
          Alrady I have an acount
          <Link href={`/login`} className="px-3 underline text-red-600">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
