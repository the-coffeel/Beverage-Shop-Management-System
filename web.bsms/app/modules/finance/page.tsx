import {
    ArrowDownRight,
    ArrowUpRight,
    Banknote,
    CircleDollarSign,
    ReceiptText,
    WalletCards,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/layouts/dashboard-shell';

const metrics = [
    {
        label: 'Sales revenue',
        value: '$4,286.50',
        note: '+12.8% vs. last week',
        icon: CircleDollarSign,
        positive: true,
    },
    {
        label: 'Cost of goods',
        value: '$2,617.20',
        note: '61.1% of revenue',
        icon: WalletCards,
        positive: false,
    },
    {
        label: 'Operating expenses',
        value: '$384.00',
        note: '6 expenses this month',
        icon: ReceiptText,
        positive: false,
    },
    {
        label: 'Net profit',
        value: '$1,285.30',
        note: '30.0% net margin',
        icon: Banknote,
        positive: true,
    },
];

const expenses = [
    {
        category: 'Electricity',
        description: 'September electricity bill',
        date: 'Oct 02, 2026',
        method: 'Cash',
        amount: '$80.00',
    },
    {
        category: 'Transportation',
        description: 'Supplier delivery fee',
        date: 'Oct 01, 2026',
        method: 'Cash',
        amount: '$35.00',
    },
    {
        category: 'Shop rent',
        description: 'October shop rent',
        date: 'Oct 01, 2026',
        method: 'Bank transfer',
        amount: '$220.00',
    },
    {
        category: 'Internet',
        description: 'Monthly internet plan',
        date: 'Sep 29, 2026',
        method: 'ABA Pay',
        amount: '$49.00',
    },
];

export function meta() {
    return [
        { title: 'Finance | BSMS' },
        {
            name: 'description',
            content: 'Track shop income, expenses, and outstanding balances.',
        },
    ];
}

export default function FinancePage() {
    return (
        <DashboardShell>
            <main className="h-full min-h-0 overflow-y-auto bg-[#f7f8f5] px-4 py-6 text-[#202920] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <header className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
                                Money in · money out
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Finance
                            </h1>
                            <p className="mt-1 text-sm text-[#69746a]">
                                A clear view of shop performance and balances.
                            </p>
                        </div>
                        <label className="flex items-center gap-2 text-sm text-[#69746a]">
                            <span>Period</span>
                            <select
                                className="h-9 rounded-md border border-[#dce3d9] bg-white px-3 text-sm text-[#202920] outline-none focus:ring-2 focus:ring-emerald-700/20"
                                defaultValue="month"
                            >
                                <option value="month">This month</option>
                                <option value="week">This week</option>
                                <option value="quarter">This quarter</option>
                            </select>
                        </label>
                    </header>

                    <section
                        aria-label="Financial summary"
                        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                    >
                        {metrics.map(
                            ({ label, value, note, icon: Icon, positive }) => (
                                <article
                                    key={label}
                                    className="rounded-md border border-[#e4e9e1] bg-white p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-[#647064]">
                                            {label}
                                        </p>
                                        <span className="grid size-9 place-items-center rounded-md bg-[#eff5ee] text-[#176b4d]">
                                            <Icon className="size-4.5" />
                                        </span>
                                    </div>
                                    <p className="mt-4 text-2xl font-semibold tracking-tight">
                                        {value}
                                    </p>
                                    <p
                                        className={`mt-2 flex items-center gap-1 text-xs ${positive ? 'text-[#16734f]' : 'text-[#788378]'}`}
                                    >
                                        {positive ? (
                                            <ArrowUpRight className="size-3.5" />
                                        ) : (
                                            <ArrowDownRight className="size-3.5" />
                                        )}
                                        {note}
                                    </p>
                                </article>
                            ),
                        )}
                    </section>

                    <section className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h2 className="font-semibold">
                                        Income & expenses
                                    </h2>
                                    <p className="mt-1 text-sm text-[#788378]">
                                        Monthly movement at a glance
                                    </p>
                                </div>
                                <Badge className="border border-[#cce8d6] bg-[#eff8f1] text-[#26734b]">
                                    Net +$1,285.30
                                </Badge>
                            </div>
                            <div
                                className="mt-7 grid h-48 grid-cols-6 items-end gap-4 border-b border-[#edf0eb] pb-2 sm:gap-7"
                                role="img"
                                aria-label="Monthly comparison chart with revenue above expenses"
                            >
                                {[
                                    { month: 'May', income: 64, cost: 34 },
                                    { month: 'Jun', income: 76, cost: 40 },
                                    { month: 'Jul', income: 58, cost: 31 },
                                    { month: 'Aug', income: 85, cost: 43 },
                                    { month: 'Sep', income: 72, cost: 39 },
                                    { month: 'Oct', income: 95, cost: 48 },
                                ].map(({ month, income, cost }) => (
                                    <div
                                        key={month}
                                        className="flex h-full flex-col items-center justify-end gap-2"
                                    >
                                        <div className="flex h-full w-full items-end justify-center gap-1">
                                            <div
                                                className={`w-2/5 rounded-t-[3px] ${month === 'Oct' ? 'bg-[#176b4d]' : 'bg-[#c8dfce]'}`}
                                                style={{ height: `${income}%` }}
                                            />
                                            <div
                                                className="w-2/5 rounded-t-[3px] bg-[#f0c98b]"
                                                style={{ height: `${cost}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-[#899389]">
                                            {month}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex gap-5 text-xs text-[#788378]">
                                <span className="inline-flex items-center gap-2">
                                    <i className="size-2 rounded-full bg-[#176b4d]" />
                                    Revenue
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <i className="size-2 rounded-full bg-[#f0c98b]" />
                                    Expenses
                                </span>
                            </div>
                        </article>

                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <h2 className="font-semibold">
                                Outstanding balances
                            </h2>
                            <p className="mt-1 text-sm text-[#788378]">
                                Payments to collect and settle
                            </p>
                            <div className="mt-5 divide-y divide-[#edf0eb]">
                                <div className="flex items-center justify-between gap-4 py-4 first:pt-2">
                                    <div>
                                        <p className="text-sm font-medium">
                                            Customer balances
                                        </p>
                                        <p className="mt-1 text-xs text-[#899389]">
                                            3 unpaid invoices
                                        </p>
                                    </div>
                                    <p className="text-lg font-semibold">
                                        $620.00
                                    </p>
                                </div>
                                <div className="flex items-center justify-between gap-4 py-4">
                                    <div>
                                        <p className="text-sm font-medium">
                                            Supplier balances
                                        </p>
                                        <p className="mt-1 text-xs text-[#899389]">
                                            2 invoices due
                                        </p>
                                    </div>
                                    <p className="text-lg font-semibold">
                                        $1,140.00
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 rounded-md bg-[#f6f8f4] p-3 text-xs leading-5 text-[#69746a]">
                                <span className="font-semibold text-[#202920]">
                                    Net payable
                                </span>
                                <span className="float-right font-semibold text-[#202920]">
                                    $520.00
                                </span>
                                <p className="clear-both pt-1">
                                    Supplier payables less customer receivables
                                </p>
                            </div>
                        </article>
                    </section>

                    <section className="overflow-hidden rounded-md border border-[#e4e9e1] bg-white">
                        <div className="flex items-center justify-between gap-3 px-5 py-4">
                            <div>
                                <h2 className="font-semibold">
                                    Recent expenses
                                </h2>
                                <p className="mt-1 text-sm text-[#788378]">
                                    Operating costs recorded for the shop
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="border-[#dce3d9]"
                                render={<a href="/reports" />}
                            >
                                View reports
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-160 text-left text-sm">
                                <thead className="border-y border-[#edf0eb] bg-[#fafbf9] text-xs text-[#788378]">
                                    <tr>
                                        <th className="px-5 py-3">Category</th>
                                        <th className="px-5 py-3">
                                            Description
                                        </th>
                                        <th className="px-5 py-3">Date</th>
                                        <th className="px-5 py-3">Paid by</th>
                                        <th className="px-5 py-3 text-right">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#edf0eb]">
                                    {expenses.map((expense) => (
                                        <tr
                                            key={`${expense.category}-${expense.date}`}
                                            className="hover:bg-[#fafbf9]"
                                        >
                                            <td className="px-5 py-3.5 font-medium">
                                                {expense.category}
                                            </td>
                                            <td className="px-5 py-3.5 text-[#69746a]">
                                                {expense.description}
                                            </td>
                                            <td className="px-5 py-3.5 text-[#69746a]">
                                                {expense.date}
                                            </td>
                                            <td className="px-5 py-3.5 text-[#69746a]">
                                                {expense.method}
                                            </td>
                                            <td className="px-5 py-3.5 text-right font-medium">
                                                {expense.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </DashboardShell>
    );
}
