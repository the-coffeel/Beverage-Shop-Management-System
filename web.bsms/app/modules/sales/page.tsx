import { useState } from 'react';
import {
    ArrowRight,
    Check,
    Minus,
    Plus,
    Search,
    ShoppingBag,
    Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/layouts/dashboard-shell';

const products = [
    {
        id: 'DRK-001',
        name: 'Coca-Cola 330ml',
        category: 'Soft drink',
        price: 0.6,
        stock: 84,
        color: 'bg-red-100 text-red-800',
        mark: 'C',
    },
    {
        id: 'BEER-001',
        name: 'Angkor Beer 330ml',
        category: 'Beer',
        price: 0.75,
        stock: 42,
        color: 'bg-amber-100 text-amber-900',
        mark: 'A',
    },
    {
        id: 'DRK-002',
        name: 'Boost Strong 330ml',
        category: 'Energy',
        price: 0.75,
        stock: 36,
        color: 'bg-lime-100 text-lime-900',
        mark: 'B',
    },
    {
        id: 'DRK-003',
        name: 'Prime Hydration 500ml',
        category: 'Sports drink',
        price: 1.5,
        stock: 18,
        color: 'bg-violet-100 text-violet-900',
        mark: 'P',
    },
    {
        id: 'WTR-001',
        name: 'Bottled Water 500ml',
        category: 'Water',
        price: 0.35,
        stock: 120,
        color: 'bg-sky-100 text-sky-900',
        mark: 'W',
    },
    {
        id: 'DRK-004',
        name: 'Sprite 330ml',
        category: 'Soft drink',
        price: 0.6,
        stock: 56,
        color: 'bg-emerald-100 text-emerald-900',
        mark: 'S',
    },
];

const initialSales = [
    {
        id: 'SALE-00148',
        customer: 'Walk-in customer',
        time: '10:42 AM',
        method: 'Cash',
        amount: 18.6,
    },
    {
        id: 'SALE-00147',
        customer: 'Sokha Mini Mart',
        time: '10:18 AM',
        method: 'ABA Pay',
        amount: 42,
    },
    {
        id: 'SALE-00146',
        customer: 'Walk-in customer',
        time: '9:56 AM',
        method: 'Cash',
        amount: 7.25,
    },
];

type CartLine = { id: string; quantity: number };

export function meta() {
    return [
        { title: 'Sales & POS | BSMS' },
        {
            name: 'description',
            content: 'Ring up beverage sales and review recent transactions.',
        },
    ];
}

export default function SalesPage() {
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState<CartLine[]>([]);
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [salesToday, setSalesToday] = useState(initialSales);
    const [confirmation, setConfirmation] = useState('');
    const total = cart.reduce(
        (sum, line) =>
            sum +
            (products.find((product) => product.id === line.id)?.price ?? 0) *
                line.quantity,
        0,
    );
    const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
    const visibleProducts = products.filter((product) =>
        `${product.name} ${product.category} ${product.id}`
            .toLowerCase()
            .includes(search.toLowerCase()),
    );

    function updateQuantity(id: string, difference: number) {
        const product = products.find((item) => item.id === id);
        setCart((current) => {
            const line = current.find((item) => item.id === id);
            const nextQuantity = (line?.quantity ?? 0) + difference;
            if (!product || nextQuantity > product.stock) return current;
            if (nextQuantity <= 0)
                return current.filter((item) => item.id !== id);
            return line
                ? current.map((item) =>
                      item.id === id
                          ? { ...item, quantity: nextQuantity }
                          : item,
                  )
                : [...current, { id, quantity: nextQuantity }];
        });
    }

    function completeSale() {
        if (cart.length === 0) return;
        const id = `SALE-${String(149 + salesToday.length - initialSales.length).padStart(5, '0')}`;
        setSalesToday((current) => [
            {
                id,
                customer: 'Walk-in customer',
                time: 'Just now',
                method: paymentMethod,
                amount: total,
            },
            ...current,
        ]);
        setConfirmation(
            `${id} · $${total.toFixed(2)} paid by ${paymentMethod}`,
        );
        setCart([]);
    }

    return (
        <DashboardShell>
            <main className="h-full min-h-0 overflow-y-auto bg-[#f7f8f5] px-4 py-6 text-[#202920] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <header className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
                                Point of sale
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Sales
                            </h1>
                            <p className="mt-1 text-sm text-[#69746a]">
                                Scan or add drinks, check stock, and take
                                payment.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border border-[#dce3d9] bg-white px-3 py-2 text-sm">
                            <ShoppingBag className="size-4 text-[#176b4d]" />
                            <span>
                                <strong>64</strong> sales today
                            </span>
                            <span className="text-[#a0a9a0]">·</span>
                            <span className="font-semibold">$428.50</span>
                        </div>
                    </header>

                    {confirmation && (
                        <div
                            role="status"
                            className="flex items-center gap-2 rounded-md border border-[#cce8d6] bg-[#eff8f1] px-4 py-3 text-sm text-[#26734b]"
                        >
                            <Check className="size-4" /> Sale complete:{' '}
                            {confirmation}
                        </div>
                    )}

                    <section className="grid items-start gap-5 xl:grid-cols-[1.55fr_0.85fr]">
                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="font-semibold">
                                        Product catalog
                                    </h2>
                                    <p className="mt-1 text-sm text-[#788378]">
                                        Available products and selling prices
                                    </p>
                                </div>
                                <Badge variant="outline">
                                    {visibleProducts.length} products
                                </Badge>
                            </div>
                            <label className="mt-4 flex h-10 items-center gap-2 rounded-md border border-[#dce3d9] px-3 text-[#788378] focus-within:ring-2 focus-within:ring-emerald-700/20">
                                <Search className="size-4 shrink-0" />
                                <span className="sr-only">Search products</span>
                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search name, category, or SKU"
                                    className="min-w-0 flex-1 bg-transparent text-sm text-[#202920] outline-none placeholder:text-[#9aa39a]"
                                />
                            </label>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleProducts.map((product) => {
                                    const inCart =
                                        cart.find(
                                            (line) => line.id === product.id,
                                        )?.quantity ?? 0;
                                    return (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(product.id, 1)
                                            }
                                            disabled={inCart >= product.stock}
                                            className="group flex min-h-28 flex-col justify-between rounded-md border border-[#e4e9e1] p-3 text-left transition hover:border-[#9fc6aa] hover:bg-[#fbfdfb] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <div className="flex w-full items-start justify-between gap-2">
                                                <span
                                                    className={`grid size-9 place-items-center rounded-md text-sm font-bold ${product.color}`}
                                                >
                                                    {product.mark}
                                                </span>
                                                <Plus className="size-4 text-[#9aa39a] group-hover:text-[#176b4d]" />
                                            </div>
                                            <span className="mt-3 block w-full">
                                                <span className="block truncate text-sm font-medium">
                                                    {product.name}
                                                </span>
                                                <span className="mt-1 flex items-center justify-between text-xs text-[#899389]">
                                                    <span>
                                                        {product.stock - inCart}{' '}
                                                        in stock
                                                    </span>
                                                    <strong className="text-[#202920]">
                                                        $
                                                        {product.price.toFixed(
                                                            2,
                                                        )}
                                                    </strong>
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                                {visibleProducts.length === 0 && (
                                    <p className="col-span-full py-8 text-center text-sm text-[#788378]">
                                        No matching products.
                                    </p>
                                )}
                            </div>
                        </article>

                        <article className="rounded-md border border-[#e4e9e1] bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold">
                                        Current sale
                                    </h2>
                                    <p className="mt-1 text-sm text-[#788378]">
                                        Walk-in customer
                                    </p>
                                </div>
                                <Badge className="bg-[#eff5ee] text-[#176b4d]">
                                    {itemCount} items
                                </Badge>
                            </div>
                            <div className="mt-4 min-h-36 divide-y divide-[#edf0eb] border-y border-[#edf0eb]">
                                {cart.length === 0 ? (
                                    <div className="grid min-h-36 place-items-center text-center text-sm text-[#899389]">
                                        Your sale is empty.
                                        <br />
                                        Select a product to add it.
                                    </div>
                                ) : (
                                    cart.map((line) => {
                                        const product = products.find(
                                            (item) => item.id === line.id,
                                        )!;
                                        return (
                                            <div
                                                key={line.id}
                                                className="flex items-center gap-3 py-3"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium">
                                                        {product.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-[#899389]">
                                                        $
                                                        {product.price.toFixed(
                                                            2,
                                                        )}{' '}
                                                        each
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-xs"
                                                        aria-label={`Remove one ${product.name}`}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                line.id,
                                                                -1,
                                                            )
                                                        }
                                                    >
                                                        <Minus />
                                                    </Button>
                                                    <span className="w-5 text-center text-sm">
                                                        {line.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-xs"
                                                        aria-label={`Add one ${product.name}`}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                line.id,
                                                                1,
                                                            )
                                                        }
                                                    >
                                                        <Plus />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-xs"
                                                        aria-label={`Remove ${product.name} from sale`}
                                                        onClick={() =>
                                                            setCart((current) =>
                                                                current.filter(
                                                                    (item) =>
                                                                        item.id !==
                                                                        line.id,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                                <span className="w-14 text-right text-sm font-medium">
                                                    $
                                                    {(
                                                        product.price *
                                                        line.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-sm text-[#69746a]">
                                    Total
                                </span>
                                <span className="text-2xl font-semibold">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <fieldset>
                                <legend className="mb-2 text-xs font-medium text-[#69746a]">
                                    Payment method
                                </legend>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Cash', 'ABA Pay', 'Credit'].map(
                                        (method) => (
                                            <button
                                                key={method}
                                                type="button"
                                                onClick={() =>
                                                    setPaymentMethod(method)
                                                }
                                                aria-pressed={
                                                    paymentMethod === method
                                                }
                                                className={`h-9 rounded-md border text-xs font-medium transition ${paymentMethod === method ? 'border-[#176b4d] bg-[#eff5ee] text-[#176b4d]' : 'border-[#dce3d9] bg-white text-[#69746a] hover:bg-[#fafbf9]'}`}
                                            >
                                                {method}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </fieldset>
                            <Button
                                onClick={completeSale}
                                disabled={cart.length === 0}
                                className="mt-4 h-10 w-full bg-[#176b4d] text-white hover:bg-[#10583e]"
                            >
                                Complete sale{' '}
                                <ArrowRight data-icon="inline-end" />
                            </Button>
                        </article>
                    </section>

                    <section className="overflow-hidden rounded-md border border-[#e4e9e1] bg-white">
                        <div className="flex items-center justify-between px-5 py-4">
                            <div>
                                <h2 className="font-semibold">Recent sales</h2>
                                <p className="mt-1 text-sm text-[#788378]">
                                    Today's latest transactions
                                </p>
                            </div>
                            <span className="text-xs text-[#899389]">
                                {salesToday.length} shown
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-160 text-left text-sm">
                                <thead className="border-y border-[#edf0eb] bg-[#fafbf9] text-xs text-[#788378]">
                                    <tr>
                                        <th className="px-5 py-3">Sale</th>
                                        <th className="px-5 py-3">Customer</th>
                                        <th className="px-5 py-3">Time</th>
                                        <th className="px-5 py-3">Payment</th>
                                        <th className="px-5 py-3 text-right">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#edf0eb]">
                                    {salesToday.map((sale) => (
                                        <tr key={sale.id}>
                                            <td className="px-5 py-3 font-medium text-[#176b4d]">
                                                {sale.id}
                                            </td>
                                            <td className="px-5 py-3">
                                                {sale.customer}
                                            </td>
                                            <td className="px-5 py-3 text-[#788378]">
                                                {sale.time}
                                            </td>
                                            <td className="px-5 py-3 text-[#788378]">
                                                {sale.method}
                                            </td>
                                            <td className="px-5 py-3 text-right font-medium">
                                                ${sale.amount.toFixed(2)}
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
