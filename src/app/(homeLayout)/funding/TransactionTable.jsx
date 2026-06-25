import React from "react";
import { FiCalendar, FiDollarSign, FiUser } from "react-icons/fi";

const TransactionTable = () => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50/70 dark:bg-[#1e293b]/20 border-b border-slate-100 dark:border-slate-800/50">
          <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiUser /> Contributor
            </span>
          </th>
          <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiDollarSign /> Amount
            </span>
          </th>
          <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiCalendar /> Date
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
        {funds.map((fund) => (
          <tr
            key={fund.id}
            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
          >
            <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {fund.name}
            </td>
            <td className="p-4 text-sm font-bold text-emerald-500 dark:text-emerald-400">
              {fund.currency}
              {fund.amount.toFixed(2)}
            </td>
            <td className="p-4 text-xs font-medium text-slate-400 dark:text-slate-500">
              {fund.date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
