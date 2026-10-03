import {
    ArrowDownToLine,
    ArrowUpRight,
    ClipboardList,
    PackageCheck,
    Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/layouts/dashboard-shell';

const purchases = [
    {
        id: 'PUR-00231',
        supplier: 'ABC Beverage Distribution',
        date: 'Oct 03, 2026',
        items: 'Angkor Beer, Coca-Cola +3',
        total: '$486.00',
        paid: '$300.00',
        status: 'Received',
    },
    {
        id: 'PUR-00230',
        supplier: 'Phnom Penh Drinks Co.',
        date: 'Oct 02, 2026',
        items: 'Boost Strong, Sting',
        total: '$328.50',
        paid: '$328.50',
        status: 'Received',
    },
    {
        id: 'PUR-00229',
        supplier: 'Southeast Asia Imports',
        date: 'Oct 02, 2026',
        items: 'Prime Hydration +2',
        total: '$612.00',
        paid: '$0.00',
        status: 'On the way',
    },
    {
        id: 'PUR-00228',
        supplier: 'ABC Beverage Distribution',
        date: 'Oct 01, 2026',
        items: 'Water, soft drinks +4',
        total: '$274.00',
        paid: '$274.00',
        status: 'Received',
    },
    {
        id: 'PUR-00227',
        supplier: 'Phnom Penh Drinks Co.',
        date: 'Sep 30, 2026',
        items: 'Energy drinks +1',
        total: '$195.00',
        paid: '$100.00',
        status: 'Part paid',
    },
];

export function meta() {
    return [
        { title: 'Purchasing | BSMS' },
        {
            name: 'description',
            content:
                'Manage supplier orders, received goods, and purchase payments.',
        },
    ];
}

export default function PurchasingPage() {
    return (
        <DashboardShell>
            <main className="h-full min-h-0 overflow-y-auto bg-[#f7f8f5] px-4 py-6 text-[#202920] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <header className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
                                Suppliers · orders · receiving
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Purchasing
                            </h1>
                            <p className="mt-1 text-sm text-[#69746a]">
                                Follow each order from supplier to stockroom.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="border-[#dce3d9] bg-white"
                                render={<a href="/people/suppliers" />}
                            >
                                <Truck data-icon="inline-start" /> Suppliers
                            </Button>
                            <Button
                                className="bg-[#176b4d] text-white hover:bg-[#10583e]"
                                render={<a href="/reports" />}
                            >
                                <ClipboardList data-icon="inline-start" />{' '}
                                Purchase report
                            </Button>
                        </div>
                    </header>

                    <section
                        aria-label="Purchasing summary"
                        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                    >
                        {[
                            {
                                label: 'Purchases this month',
                                value: '$8,462.50',
                                note: '+6.2% from September',
                                icon: ClipboardList,
                            },
                            {
                                label: 'Orders this month',
                                value: '28',
                                note: '21 received',
                                icon: PackageCheck,
                            },
                            {
                                label: 'Products received',
                                value: '3,840',
                                note: 'units this month',
                                icon: ArrowDownToLine,
                            },
                            {
                                label: 'Supplier balance due',
                                value: '$1,140.00',
                                note: '2 invoices outstanding',
                                icon: Truck,
                            },
                        ].map(({ label, value, note, icon: Icon }) => (
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
                                <p className="mt-2 text-xs text-[#788378]">
                                    {note}
                                </p>
                            </article>
                        ))}
                    </section>

                    <section className="grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
                        <article className="overflow-hidden rounded-md border border-[#e4e9e1] bg-white">
                            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                                <div>
                                    <h2 className="font-semibold">
                                        Purchase orders
                                    </h2>
                                    <p className="mt-1 text-sm text-[#788378]">
                                        Latest supplier orders and receiving
                                        status
                                    </p>
                                </div>
                                <label
                                    className="sr-only"
                                    htmlFor="purchase-status"
                                >
                                    Filter purchase orders
                                </label>
                                <select
                                    id="purchase-status"
                                    className="h-9 rounded-md border border-[#dce3d9] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-700/20"
                                    defaultValue="all"
                                >
                                    <option value="all">All orders</option>
                                    <option>Received</option>
                                    <option>On the way</option>
                                    <option>Part paid</option>
                                </select>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-220 text-left text-sm">
                                    <thead className="border-y border-[#edf0eb] bg-[#fafbf9] text-xs text-[#788378]">
                                        <tr>
                                            <th className="px-5 py-3">Order</th>
                                            <th className="px-5 py-3">
                                                Supplier
                                            </th>
                                            <th className="px-5 py-3">Date</th>
                                            <th className="px-5 py-3">
                                                Products
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Total
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Paid
                                            </th>
                                            <th className="px-5 py-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#edf0eb]">
                                        {purchases.map((purchase) => (
                                            <tr
                                                key={purchase.id}
                                                className="hover:bg-[#fafbf9]"
                                            >
                                                <td className="px-5 py-3.5 font-medium text-[#176b4d]">
                                                    {purchase.id}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    {purchase.supplier}
                                                </td>
                                                <td className="px-5 py-3.5 text-[#788378]">
                                                    {purchase.date}
                                                </td>
                                                <td className="max-w-48 truncate px-5 py-3.5 text-[#788378]">
                                                    {purchase.items}
                                                </td>
                                                <td className="px-5 py-3.5 text-right font-medium">
                                                    {purchase.total}
                                                </td>
                                                <td className="px-5 py-3.5 text-right text-[#788378]">
                                                    {purchase.paid}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <Badge
                                                        className={
                                                            purchase.status ===
                                                            'Received'
                                                                ? 'border border-[#cce8d6] bg-[#eff8f1] text-[#26734b]'
                                                                : purchase.status ===
                                                                    'On the way'
                                                                  ? 'border border-[#f3d7b7] bg-[#fff5e8] text-[#a75b1a]'
                                                                  : 'border border-[#d9e2f0] bg-[#f1f5fa] text-[#496483]'
                                                        }
                                                    >
                                                        {purchase.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </article>

                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <h2 className="font-semibold">Order progress</h2>
                            <p className="mt-1 text-sm text-[#788378]">
                                From order to inventory update
                            </p>
                            <ol className="mt-5 space-y-5">
                                {[
                                    {
                                        step: 'Purchase order',
                                        detail: 'Supplier and products confirmed',
                                        count: '28',
                                        active: true,
                                    },
                                    {
                                        step: 'Goods received',
                                        detail: 'Stock updated after delivery',
                                        count: '21',
                                        active: true,
                                    },
                                    {
                                        step: 'Supplier payment',
                                        detail: 'Record paid and outstanding amounts',
                                        count: '18',
                                        active: false,
                                    },
                                ].map(
                                    (
                                        { step, detail, count, active },
                                        index,
                                    ) => (
                                        <li key={step} className="flex gap-3">
                                            <span
                                                className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${active ? 'bg-[#e8f3ea] text-[#176b4d]' : 'bg-[#f2f3f0] text-[#7e897e]'}`}
                                            >
                                                {index + 1}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex justify-between gap-2">
                                                    <p className="text-sm font-medium">
                                                        {step}
                                                    </p>
                                                    <span className="text-xs text-[#788378]">
                                                        {count}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs leading-5 text-[#899389]">
                                                    {detail}
                                                </p>
                                                {index < 2 && (
                                                    <div className="mt-3 h-px bg-[#edf0eb]" />
                                                )}
                                            </div>
                                        </li>
                                    ),
                                )}
                            </ol>
                            <div className="mt-5 rounded-md bg-[#f6f8f4] p-3 text-xs leading-5 text-[#69746a]">
                                Receiving products increases on-hand stock.
                                Supplier payments reduce the outstanding
                                balance.
                            </div>
                            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#176b4d]">
                                <ArrowUpRight className="size-3.5" /> 4 orders
                                need follow-up
                            </div>
                        </article>
                    </section>
                </div>
            </main>
        </DashboardShell>
    );
}
