import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  FiCheckCircle, 
  FiDownload, 
  FiGrid, 
  FiTwitter, 
  FiLinkedin, 
  FiHeart, 
  FiShield, 
  FiCreditCard
} from 'react-icons/fi'
import { createFundingHistory } from '@/lib/actions/fundings'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // Retrieve session and payment intent details from Stripe
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, payment_intent } = session
  const customerEmail = customer_details?.email || ''

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
    const currencySymbol = session.currency === 'bdt' ? '৳' : '$'
    
    // Transaction ID or current date
    const transactionId = typeof payment_intent === 'object' ? payment_intent?.id : 'N/A'
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    // Payment method type (e.g., Card, bKash, etc.)
    const paymentMethodBrand = typeof payment_intent === 'object' 
      ? payment_intent?.payment_method_types?.[0] 
      : 'Card'


     const result = await createFundingHistory({customerEmail, transactionId, transactionAmount: amountTotal})
     console.log(result)

    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300">
        
        {/* Main success card container */}
        <div className="max-w-xl w-full bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xl text-center relative">
          
          {/* Green success check icon */}
          <div className="flex justify-center mb-5">
            <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40">
              <FiCheckCircle className="text-4xl" />
            </div>
          </div>

          {/* Heading and thank you text */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 tracking-tight mb-3">
            Payment Successful
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto leading-relaxed mb-8">
            Thank you for your contribution. Your donation helps ensure life-saving blood reaches those who need it most.
          </p>

          {/* TRANSACTION SUMMARY BOX */}
          <div className="bg-slate-50 dark:bg-[#1e293b]/30 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-5 mb-8 text-left grid grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Amount Contributed
              </span>
              <span className="text-base font-extrabold text-gray-800 dark:text-slate-200 mt-0.5 block">
                {currencySymbol}{amountTotal}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Transaction ID
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-slate-200 mt-1 block truncate" title={transactionId}>
                {transactionId.substring(0, 15)}...
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Date
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 mt-0.5 block">
                {formattedDate}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Payment Method
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 mt-0.5 block capitalize flex items-center gap-1.5">
                <FiCreditCard className="text-gray-400 text-xs" /> {paymentMethodBrand}
              </span>
            </div>
          </div>

          {/* Email notification alert (styling friendly) */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-8">
            A confirmation email has been sent to <span className="font-medium text-gray-600 dark:text-gray-400">{customerEmail}</span>.
          </p>

          {/* Action button group (Download Receipt and Back to Dashboard) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 border border-[#b91c1c] text-[#b91c1c] hover:bg-red-50/50 dark:hover:bg-red-950/10 px-5 py-3 rounded-xl font-bold text-sm transition duration-200 active:scale-[0.98]"
            >
              <FiDownload className="text-base" />
              Download Receipt
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-3 rounded-xl font-bold text-sm transition duration-200 shadow-md shadow-red-900/10 active:scale-[0.98]"
            >
              <FiGrid className="text-base" />
              Back to Home Page
            </Link>
          </div>

          {/* Social share impact */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-2.5">
            <span className="text-xs text-gray-400 font-medium">Share your impact</span>
            <div className="flex gap-2.5">
              <button type="button" className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <FiTwitter className="text-sm" />
              </button>
              <button type="button" className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <FiLinkedin className="text-sm" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom info grid (Ongoing Impact & Secure Section) */}
        <div className="max-w-xl w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex gap-3 items-center shadow-sm">
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 text-[#b91c1c] shrink-0">
              <FiHeart className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Ongoing Impact</h4>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">Set up automated recurring support for emergency logistics.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex gap-3 items-center shadow-sm">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 shrink-0">
              <FiShield className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Secure & Private</h4>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">All transactions are encrypted and processed securely via Stripe.</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}