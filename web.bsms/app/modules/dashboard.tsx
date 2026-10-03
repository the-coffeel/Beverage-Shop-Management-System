import type { Route } from './+types/home';
import { DashboardShell } from '@/components/layouts/dashboard-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Boxes,
    CircleDollarSign,
    PackagePlus,
    ShoppingBag,
    TrendingUp,
} from 'lucide-react';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Dashboard | BSMS' },
        {
            name: 'description',
            content: 'Beverage shop sales, purchasing, and stock overview.',
        },
    ];
}

const metrics = [
    {
        label: "Today's sales",
        value: '$428.50',
        change: '+12.8%',
        detail: 'vs. yesterday',
        icon: CircleDollarSign,
        trend: 'up',
    },
    {
        label: 'Orders today',
        value: '64',
        change: '+8.3%',
        detail: 'vs. yesterday',
        icon: ShoppingBag,
        trend: 'up',
    },
    {
        label: 'Items in stock',
        value: '1,284',
        change: '12 low',
        detail: 'need attention',
        icon: Boxes,
        trend: 'down',
    },
    {
        label: 'Gross profit',
        value: '$126.20',
        change: '29.5%',
        detail: "today's margin",
        icon: TrendingUp,
        trend: 'up',
    },
] as const;

const sales = [
    { day: 'Mon', amount: 58 },
    { day: 'Tue', amount: 76 },
    { day: 'Wed', amount: 49 },
    { day: 'Thu', amount: 88 },
    { day: 'Fri', amount: 67 },
    { day: 'Sat', amount: 100 },
    { day: 'Sun', amount: 72 },
];

const lowStock = [
    {
        name: 'Prime Hydration 500ml',
        category: 'Sports drink',
        stock: 5,
        minimum: 18,
        color: 'bg-violet-500',
    },
    {
        name: 'Coca-Cola 330ml',
        category: 'Soft drink',
        stock: 8,
        minimum: 24,
        color: 'bg-red-500',
    },
    {
        name: 'Angkor Beer 330ml',
        category: 'Beer',
        stock: 12,
        minimum: 30,
        color: 'bg-amber-500',
    },
    {
        name: 'Boost Strong 330ml',
        category: 'Energy drink',
        stock: 14,
        minimum: 20,
        color: 'bg-lime-600',
    },
];

const transactions = [
    {
        id: 'SALE-00148',
        customer: 'Walk-in customer',
        time: '10:42 AM',
        method: 'Cash',
        amount: '$18.60',
        status: 'Complete',
    },
    {
        id: 'SALE-00147',
        customer: 'Sokha Mini Mart',
        time: '10:18 AM',
        method: 'ABA Pay',
        amount: '$42.00',
        status: 'Complete',
    },
    {
        id: 'SALE-00146',
        customer: 'Walk-in customer',
        time: '9:56 AM',
        method: 'Cash',
        amount: '$7.25',
        status: 'Complete',
    },
    {
        id: 'SALE-00145',
        customer: 'Dara Vann',
        time: '9:31 AM',
        method: 'ABA Pay',
        amount: '$24.50',
        status: 'Complete',
    },
];

export default function DashboardPage() {
    return (
        <DashboardShell>
            <main className="h-full min-h-0 overflow-y-auto bg-[#f7f8f5] px-4 py-6 text-[#202920] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
                                Saturday, October 3, 2026
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Good morning, Saroeun
                            </h1>
                            <p className="mt-1 text-sm text-[#69746a]">
                                Here’s what’s happening at your shop today.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="border-[#dce3d9] bg-white"
                                render={<a href="/products" />}
                            >
                                View inventory
                            </Button>
                            <Button
                                className="bg-[#176b4d] text-white hover:bg-[#10583e]"
                                render={<a href="/products/create" />}
                            >
                                <PackagePlus data-icon="inline-start" /> Add
                                product
                            </Button>
                        </div>
                    </section>

                    <section
                        aria-label="Today's business summary"
                        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                    >
                        {metrics.map(
                            ({
                                label,
                                value,
                                change,
                                detail,
                                icon: Icon,
                                trend,
                            }) => (
                                <article
                                    key={label}
                                    className="rounded-md border border-[#e4e9e1] bg-white p-4 shadow-[0_1px_2px_rgba(25,45,29,0.03)]"
                                >
                                    <div className="flex items-start justify-between">
                                        <p className="text-sm font-medium text-[#647064]">
                                            {label}
                                        </p>
                                        <span className="grid size-9 place-items-center rounded-md bg-[#eff5ee] text-[#176b4d]">
                                            <Icon className="size-4.5" />
                                        </span>
                                    </div>
                                    <p className="mt-4 text-[27px] font-semibold leading-none tracking-tight">
                                        {value}
                                    </p>
                                    <div className="mt-3 flex items-center gap-1.5 text-xs">
                                        <span
                                            className={
                                                trend === 'up'
                                                    ? 'inline-flex items-center font-semibold text-[#16734f]'
                                                    : 'inline-flex items-center font-semibold text-[#b25b22]'
                                            }
                                        >
                                            {trend === 'up' ? (
                                                <ArrowUpRight className="mr-0.5 size-3.5" />
                                            ) : (
                                                <ArrowDownRight className="mr-0.5 size-3.5" />
                                            )}
                                            {change}
                                        </span>
                                        <span className="text-[#849084]">
                                            {detail}
                                        </span>
                                    </div>
                                </article>
                            ),
                        )}
                    </section>

                    <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h2 className="font-semibold">
                                        Sales overview
                                    </h2>
                                    <p className="mt-1 text-sm text-[#788378]">
                                        Daily sales for the last 7 days
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-semibold">
                                        $2,846.20
                                    </p>
                                    <p className="mt-0.5 text-xs font-medium text-[#16734f]">
                                        ↑ 9.4% from last week
                                    </p>
                                </div>
                            </div>
                            <div
                                className="mt-7 grid h-44 grid-cols-7 items-end gap-3 border-b border-[#edf0eb] pb-2 sm:gap-5"
                                role="img"
                                aria-label="Bar chart showing sales from Monday through Sunday, with Saturday as the busiest day"
                            >
                                {sales.map(({ day, amount }) => (
                                    <div
                                        key={day}
                                        className="flex h-full flex-col items-center justify-end gap-2"
                                    >
                                        <div className="flex h-full w-full items-end">
                                            <div
                                                className={`w-full rounded-t-[3px] ${day === 'Sat' ? 'bg-[#176b4d]' : 'bg-[#c8dfce]'}`}
                                                style={{ height: `${amount}%` }}
                                                title={`${day}: ${amount}% of weekly peak`}
                                            />
                                        </div>
                                        <span
                                            className={`text-xs ${day === 'Sat' ? 'font-semibold text-[#176b4d]' : 'text-[#899389]'}`}
                                        >
                                            {day}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center justify-between text-xs text-[#818b81]">
                                <span>Mon, Sep 28</span>
                                <span>Sat was your busiest day</span>
                                <span>Sun, Oct 4</span>
                            </div>
                        </article>

                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-semibold">
                                            Low stock
                                        </h2>
                                        <Badge className="border border-[#f3d7b7] bg-[#fff5e8] text-[#a75b1a]">
                                            12 products
                                        </Badge>
                                    </div>
                                    <p className="mt-1 text-sm text-[#788378]">
                                        Below minimum stock level
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label="View all low-stock products"
                                    render={<a href="/products" />}
                                >
                                    <ArrowRight />
                                </Button>
                            </div>
                            <ul className="mt-4 divide-y divide-[#edf0eb]">
                                {lowStock.map((product) => (
                                    <li
                                        key={product.name}
                                        className="flex items-center gap-3 py-3 first:pt-1 last:pb-0"
                                    >
                                        <span
                                            className={`size-2 shrink-0 rounded-full ${product.color}`}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                {product.name}
                                            </p>
                                            <p className="mt-0.5 text-xs text-[#899389]">
                                                {product.category}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-[#a75b1a]">
                                                {product.stock} left
                                            </p>
                                            <p className="mt-0.5 text-xs text-[#899389]">
                                                Min. {product.minimum}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                variant="outline"
                                className="mt-4 w-full border-[#dce3d9]"
                                render={<a href="/products" />}
                            >
                                Review stock levels
                            </Button>
                        </article>
                    </section>

                    <section className="overflow-hidden rounded-md border border-[#e4e9e1] bg-white">
                        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                            <div>
                                <h2 className="font-semibold">Recent sales</h2>
                                <p className="mt-1 text-sm text-[#788378]">
                                    Latest transactions recorded today
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-[#176b4d]"
                                render={<a href="/reports/sales" />}
                            >
                                Sales report{' '}
                                <ArrowRight data-icon="inline-end" />
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-160 text-left text-sm">
                                <thead className="border-y border-[#edf0eb] bg-[#fafbf9] text-xs font-medium text-[#788378]">
                                    <tr>
                                        <th className="px-5 py-3">Sale</th>
                                        <th className="px-5 py-3">Customer</th>
                                        <th className="px-5 py-3">Time</th>
                                        <th className="px-5 py-3">Payment</th>
                                        <th className="px-5 py-3 text-right">
                                            Amount
                                        </th>
                                        <th className="px-5 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#edf0eb]">
                                    {transactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="hover:bg-[#fafbf9]"
                                        >
                                            <td className="px-5 py-3.5 font-medium text-[#176b4d]">
                                                {transaction.id}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {transaction.customer}
                                            </td>
                                            <td className="px-5 py-3.5 text-[#788378]">
                                                {transaction.time}
                                            </td>
                                            <td className="px-5 py-3.5 text-[#788378]">
                                                {transaction.method}
                                            </td>
                                            <td className="px-5 py-3.5 text-right font-medium">
                                                {transaction.amount}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <Badge className="border border-[#cce8d6] bg-[#eff8f1] text-[#26734b]">
                                                    {transaction.status}
                                                </Badge>
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
