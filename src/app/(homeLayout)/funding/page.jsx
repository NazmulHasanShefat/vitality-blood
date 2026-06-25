
import { getTransactionHistory } from '@/lib/api/transaction'
import Link from 'next/link'
import { 
  FiHeart, 
  FiDollarSign, 
  FiCalendar, 
  FiUser, 
  FiArrowUpRight, 
  FiTrendingUp 
} from 'react-icons/fi'

// Mock Data: Replace this with your actual database query (Prisma, Mongoose, Postgres, etc.)
async function getFundingHistory() {
  return [
    { id: '1', name: 'Anik Rahman', amount: 50.00, currency: '$', date: 'Jun 24, 2026' },
    { id: '2', name: 'Sarah Jenkins', amount: 120.00, currency: '$', date: 'Jun 22, 2026' },
    { id: '3', name: 'Tanvir Hossain', amount: 30.00, currency: '$', date: 'Jun 18, 2026' },
  ]
}

export default async function FundingPage() {
  const funds = await getFundingHistory()
  const transactionHistory = await getTransactionHistory();
  // Calculate total funds for the dashboard summary banner
  const totalRaised = funds.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)
  console.log(transactionHistory)

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block & Donation Trigger Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
          <div>
            <span className="text-xs font-bold text-[#b91c1c] tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
              <FiHeart className="animate-pulse" /> Financial Transparency
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Organization Fund Logs
            </h1>
            <p className="text-slate-400 dark:text-gray-400 text-sm mt-1 max-w-xl">
              Track public micro-donations directly supporting field operations. Volunteer and Admin modules aggregate these records instantly.
            </p>
          </div>

          {/* Secure Form wrapping Server Action for Checkout redirection */}
          <div className="w-full sm:w-auto">
            <Link
              href={`/funding/give-fund`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-red-900/10 transition active:scale-[0.98]"
            >
              <FiHeart className="text-base fill-current" />
              Contribute Funds
              <FiArrowUpRight className="text-xs opacity-60" />
            </Link>
          </div>
        </div>

        {/* Funding History Table Section */}
        <div className="bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Recent Contributions</h3>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-50 dark:bg-slate-800 text-slate-400">
              {funds.length} Donations Recorded
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-[#1e293b]/20 border-b border-slate-100 dark:border-slate-800/50">
                  <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400"><span className="flex items-center gap-1.5"><FiUser /> Contributor</span></th>
                  <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400"><span className="flex items-center gap-1.5"><FiDollarSign /> Amount</span></th>
                  <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400"><span className="flex items-center gap-1.5"><FiCalendar /> Date</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {funds.map((fund) => (
                  <tr key={fund.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {fund.name}
                    </td>
                    <td className="p-4 text-sm font-bold text-emerald-500 dark:text-emerald-400">
                      {fund.currency}{fund.amount.toFixed(2)}
                    </td>
                    <td className="p-4 text-xs font-medium text-slate-400 dark:text-slate-500">
                      {fund.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}