import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Vitality Blood - regiter",
  description: "A blood donation platform",
};
export default function Register() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-[#111827] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#b91c1c] dark:text-[#ef4444] tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join our network to save lives or request vital support
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
