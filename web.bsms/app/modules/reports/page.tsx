import { useState } from 'react';
import {
    ArrowDownToLine,
    ArrowRight,
    BarChart3,
    Boxes,
    CircleDollarSign,
    ShoppingCart,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/layouts/dashboard-shell';

const reportRows = [
    {
        label: 'Sales',
        detail: 'Revenue from completed transactions',
        value: '$12,846.50',
        change: '+12.8%',
        icon: CircleDollarSign,
        color: 'text-[#176b4d]',
    },
    {
        label: 'Purchases',
        detail: 'Supplier orders placed',
        value: '$8,462.50',
        change: '+6.2%',
        icon: ShoppingCart,
        color: 'text-[#b16b22]',
    },
    {
        label: 'Inventory',
        detail: 'Products · units · low stock',
        value: '1,284 units',
        change: '12 low',
        icon: Boxes,
        color: 'text-[#54718d]',
    },
    {
        label: 'Gross profit',
        detail: 'Revenue less cost of goods sold',
        value: '$4,384.00',
        change: '34.1% margin',
        icon: BarChart3,
        color: 'text-[#a55d5b]',
    },
];

export function meta() {
    return [
        { title: 'Reports | BSMS' },
        {
            name: 'description',
            content: 'Review sales, purchases, inventory, and profit reports.',
        },
    ];
}

export default function ReportsPage() {
    const [period, setPeriod] = useState('month');

    function exportReport() {
        const rows = [
            ['Report', 'Value', 'Change'],
            ...reportRows.map(({ label, value, change }) => [
                label,
                value,
                change,
            ]),
        ];
        const csv = rows
            .map((row) =>
                row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','),
            )
            .join('\n');
        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'bsms-business-report.csv';
        link.click();
        URL.revokeObjectURL(url);
    }

    return (
        <DashboardShell>
            <main className="h-full min-h-0 overflow-y-auto bg-[#f7f8f5] px-4 py-6 text-[#202920] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <header className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
                                Business performance
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Reports
                            </h1>
                            <p className="mt-1 text-sm text-[#69746a]">
                                One place to review the numbers behind your
                                shop.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <label className="sr-only" htmlFor="report-period">
                                Report period
                            </label>
                            <select
                                id="report-period"
                                value={period}
                                onChange={(event) =>
                                    setPeriod(event.target.value)
                                }
                                className="h-9 rounded-md border border-[#dce3d9] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-700/20"
                            >
                                <option value="week">This week</option>
                                <option value="month">This month</option>
                                <option value="quarter">This quarter</option>
                            </select>
                            <Button
                                onClick={exportReport}
                                className="bg-[#176b4d] text-white hover:bg-[#10583e]"
                            >
                                <ArrowDownToLine data-icon="inline-start" />{' '}
                                Export CSV
                            </Button>
                        </div>
                    </header>

                    <section
                        aria-label="Report summary"
                        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                    >
                        {reportRows.map(
                            ({
                                label,
                                detail,
                                value,
                                change,
                                icon: Icon,
                                color,
                            }) => (
                                <article
                                    key={label}
                                    className="rounded-md border border-[#e4e9e1] bg-white p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-[#647064]">
                                            {label}
                                        </p>
                                        <Icon className={`size-5 ${color}`} />
                                    </div>
                                    <p className="mt-4 text-2xl font-semibold tracking-tight">
                                        {value}
                                    </p>
                                    <div className="mt-2 flex items-center justify-between gap-2">
                                        <span className="truncate text-xs text-[#899389]">
                                            {detail}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="shrink-0"
                                        >
                                            {change}
                                        </Badge>
                                    </div>
                                </article>
                            ),
                        )}
                    </section>

                    <section className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h2 className="font-semibold">
                                        Sales & purchases
                                    </h2>
                                    <p className="mt-1 text-sm text-[#788378]">
                                        Monthly totals · October 2026
                                    </p>
                                </div>
                                <div className="flex gap-4 text-xs text-[#788378]">
                                    <span className="inline-flex items-center gap-2">
                                        <i className="size-2 rounded-full bg-[#176b4d]" />
                                        Sales
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <i className="size-2 rounded-full bg-[#efc98d]" />
                                        Purchases
                                    </span>
                                </div>
                            </div>
                            <div
                                className="mt-7 grid h-52 grid-cols-6 items-end gap-4 border-b border-[#edf0eb] pb-2 sm:gap-7"
                                role="img"
                                aria-label="Bar chart comparing monthly sales and purchases from May through October"
                            >
                                {[
                                    { month: 'May', sales: 58, purchase: 34 },
                                    { month: 'Jun', sales: 74, purchase: 48 },
                                    { month: 'Jul', sales: 65, purchase: 42 },
                                    { month: 'Aug', sales: 83, purchase: 55 },
                                    { month: 'Sep', sales: 70, purchase: 46 },
                                    { month: 'Oct', sales: 96, purchase: 61 },
                                ].map(({ month, sales, purchase }) => (
                                    <div
                                        key={month}
                                        className="flex h-full flex-col items-center justify-end gap-2"
                                    >
                                        <div className="flex h-full w-full items-end justify-center gap-1">
                                            <div
                                                className={`w-2/5 rounded-t-[3px] ${month === 'Oct' ? 'bg-[#176b4d]' : 'bg-[#c8dfce]'}`}
                                                style={{ height: `${sales}%` }}
                                            />
                                            <div
                                                className="w-2/5 rounded-t-[3px] bg-[#efc98d]"
                                                style={{
                                                    height: `${purchase}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-[#899389]">
                                            {month}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center justify-between text-xs text-[#899389]">
                                <span>May 2026</span>
                                <span>Revenue compared with purchases</span>
                                <span>Oct 2026</span>
                            </div>
                        </article>

                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <h2 className="font-semibold">Report center</h2>
                            <p className="mt-1 text-sm text-[#788378]">
                                Go to a detailed business area
                            </p>
                            <div className="mt-4 divide-y divide-[#edf0eb]">
                                {[
                                    {
                                        title: 'Sales report',
                                        detail: 'Transactions, average sale, and revenue',
                                        href: '/sales',
                                        icon: CircleDollarSign,
                                    },
                                    {
                                        title: 'Purchase report',
                                        detail: 'Orders, suppliers, and goods received',
                                        href: '/purchasing',
                                        icon: ShoppingCart,
                                    },
                                    {
                                        title: 'Inventory report',
                                        detail: 'Stock on hand and low-stock items',
                                        href: '/products',
                                        icon: Boxes,
                                    },
                                    {
                                        title: 'Profit summary',
                                        detail: 'Revenue, costs, expenses, and net profit',
                                        href: '/finance',
                                        icon: BarChart3,
                                    },
                                ].map(({ title, detail, href, icon: Icon }) => (
                                    <a
                                        key={title}
                                        href={href}
                                        className="group flex items-center gap-3 py-3.5 first:pt-2 last:pb-1"
                                    >
                                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#eff5ee] text-[#176b4d]">
                                            <Icon className="size-4.5" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-medium">
                                                {title}
                                            </span>
                                            <span className="mt-0.5 block truncate text-xs text-[#899389]">
                                                {detail}
                                            </span>
                                        </span>
                                        <ArrowRight className="size-4 text-[#9aa39a] transition group-hover:translate-x-0.5 group-hover:text-[#176b4d]" />
                                    </a>
                                ))}
                            </div>
                        </article>
                    </section>
                </div>
            </main>
        </DashboardShell>
    );
}
