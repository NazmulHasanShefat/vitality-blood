import { SignOutServerAction } from '@/lib/actions/user'
import Link from 'next/link'
import { 
  FiShieldAlert, 
  FiLock, 
  FiShield, 
  FiArrowLeft, 
  FiLogOut, 
  FiHelpCircle 
} from 'react-icons/fi'
import { LuShieldAlert } from 'react-icons/lu'
import SignOutButtonForUAPage from './SignOutButtonForUAPage'

export default async function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      
      {/* Main Container */}
      <div className="max-w-md w-full text-center px-4">
        
        {/* Animated/Layered Shield and Lock Icons */}
        <div className="relative flex justify-center items-center mb-6">
          {/* Decorative floating minor shield */}
          <div className="absolute -bottom-1 left-[42%] transform -translate-x-8 bg-white dark:bg-[#111827] text-slate-400 p-1.5 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm">
            <FiShield className="text-sm" />
          </div>

          {/* Main central alert shield */}
          <div className="h-20 w-20 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center border border-red-100 dark:border-red-900/30 shadow-inner">
            <LuShieldAlert className="text-4xl" />
          </div>

          {/* Decorative floating lock icon */}
          <div className="absolute -top-2 right-[42%] transform translate-x-8 bg-white dark:bg-[#111827] text-red-500 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm rotate-12">
            <FiLock className="text-xs font-bold" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] dark:text-slate-100 tracking-tight mb-4">
          Access Denied
        </h1>

        {/* Informational Text */}
        <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          You don&apos;t have permission to access this page. If you believe this is an error, please contact your administrator or try logging in with a different account.
        </p>

        {/* Action Buttons Group */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-sm mx-auto mb-6">
          {/* Primary Action Button */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-xl font-semibold text-sm transition duration-200 active:scale-[0.98] shadow-sm"
          >
            <FiArrowLeft className="text-base" />
            Back to Home page
          </Link>

          {/* Secondary Action Button */}
         
       <SignOutButtonForUAPage />
      
        </div>

        {/* Support Footer Link */}
        <Link 
          href="/support"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#b91c1c] hover:text-[#991b1b] dark:text-red-400 dark:hover:text-red-300 transition duration-150"
        >
          <FiHelpCircle className="text-sm" />
          Contact Technical Support
        </Link>

      </div>
    </div>
  )
}