import { DashboardShell } from '@/components/layouts/dashboard-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Wand2, CalendarIcon } from 'lucide-react';
import { Select as CustomSelect } from '@/components/custom/select';
import { NumberInput } from '@/components/custom/number-input';

export function meta() {
    return [
        { title: 'Create Product - MyTeam' },
        { name: 'description', content: 'Create a new product.' },
    ];
}

export default function ProductCreatePage() {
    return (
        <DashboardShell>
            <main className="min-h-screen bg-background p-4 text-foreground">
                <div className="">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Create New Product
                        </h2>

                        <a
                            href="/products"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground border py-1.5 px-4 rounded-md"
                        >
                            Back to Products
                        </a>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
                        {/* Column 1 */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Name:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input id="name" className='rounded-sm' placeholder="Enter Name" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">
                                    Product Category:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <div className="flex gap-2">
                                    <CustomSelect
                                        id="category"
                                        placeholder="Choose Product Category"
                                        defaultValue=""
                                        options={[
                                            {
                                                value: 'none',
                                                label: 'None',
                                            },
                                            {
                                                value: 'electronics',
                                                label: 'Electronics',
                                            },
                                            {
                                                value: 'apparel',
                                                label: 'Apparel',
                                            },
                                            {
                                                value: 'home',
                                                label: 'Home',
                                            },
                                        ]}
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        className="shrink-0"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="barcode-symbology">
                                    Barcode Symbology:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <CustomSelect
                                    id="category"
                                    placeholder="Choose Product Category"
                                    defaultValue=""
                                    options={[
                                        {
                                            value: 'none',
                                            label: 'None',
                                        },
                                        {
                                            value: 'code128',
                                            label: 'CODE128',
                                        },
                                        {
                                            value: 'ean13',
                                            label: 'EAN13',
                                        },
                                    ]}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sale-unit">
                                    Sale Unit:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <CustomSelect
                                    id="sale-unit"
                                    placeholder="Choose Sale Unit"
                                    defaultValue=""
                                    options={[
                                        {
                                            value: 'none',
                                            label: 'None',
                                        },
                                        {
                                            value: 'electronics',
                                            label: 'Electronics',
                                        },
                                        {
                                            value: 'apparel',
                                            label: 'Apparel',
                                        },
                                    ]}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quantity-limitation">
                                    Quantity Limitation:
                                </Label>
                                <NumberInput id="quantity-limitation" defaultValue={0} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expiry-date">
                                    Expiry date:
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="expiry-date"
                                        type="date"
                                        placeholder="Enter expiry date"
                                        className="pr-9"
                                    />
                                    <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="sku">
                                    SKU/Barcode:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="sku"
                                        placeholder="Enter Code"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        className="shrink-0"
                                    >
                                        <Wand2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brand">
                                    Brand:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <div className="flex gap-2">
                                    <CustomSelect
                                        id="category"
                                        placeholder="Choose Product Category"
                                        defaultValue=""
                                        options={[
                                            {
                                                value: 'none',
                                                label: 'None',
                                            },
                                            {
                                                value: 'electronics',
                                                label: 'Electronics',
                                            },
                                            {
                                                value: 'apparel',
                                                label: 'Apparel',
                                            },
                                            {
                                                value: 'home',
                                                label: 'Home',
                                            },
                                        ]}
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        className="shrink-0"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="product-unit">
                                    Product Unit:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <div className="flex gap-2">
                                    <CustomSelect
                                        id="category"
                                        placeholder="Choose Product Category"
                                        defaultValue=""
                                        options={[
                                            {
                                                value: 'none',
                                                label: 'None',
                                            },
                                            {
                                                value: 'electronics',
                                                label: 'Electronics',
                                            },
                                            {
                                                value: 'apparel',
                                                label: 'Apparel',
                                            },
                                            {
                                                value: 'home',
                                                label: 'Home',
                                            },
                                        ]}
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        className="shrink-0"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="purchase-unit">
                                    Purchase Unit:
                                    <span className="text-destructive">*</span>
                                </Label>
                                <CustomSelect
                                    id="category"
                                    placeholder="Choose Product Category"
                                    defaultValue=""
                                    options={[
                                        {
                                            value: 'none',
                                            label: 'None',
                                        },
                                        {
                                            value: 'electronics',
                                            label: 'Electronics',
                                        },
                                        {
                                            value: 'apparel',
                                            label: 'Apparel',
                                        },
                                        {
                                            value: 'home',
                                            label: 'Home',
                                        },
                                    ]}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="note">Note:</Label>
                                <Textarea
                                    id="note"
                                    placeholder="Enter Note"
                                    className="min-h-[140px] resize-y"
                                />
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="images">Multiple Image:</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    className="pt-1.5"
                                />
                            </div>

                            <div className="rounded-lg border p-4">
                                <h3 className="mb-4 text-center text-lg font-bold">
                                    Add Stock :
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="warehouse">
                                            Warehouse:
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <CustomSelect
                                            id="warehouse"
                                            placeholder="Choose Warehouse"
                                            defaultValue=""
                                            options={[
                                                {
                                                    value: 'generalwarehouse',
                                                    label: 'General Warehouse',
                                                },
                                                {
                                                    value: 'apparelwarehouse',
                                                    label: 'Apparel Warehouse',
                                                },
                                            ]}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="supplier">
                                            Supplier:
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <CustomSelect
                                            id="category"
                                            placeholder="Choose Product Category"
                                            defaultValue=""
                                            options={[
                                                {
                                                    value: 'none',
                                                    label: 'None',
                                                },
                                                {
                                                    value: 'electronics',
                                                    label: 'Electronics',
                                                },
                                                {
                                                    value: 'apparel',
                                                    label: 'Apparel',
                                                },
                                                {
                                                    value: 'home',
                                                    label: 'Home',
                                                },
                                            ]}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">
                                            Status:
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <CustomSelect
                                            id="status"
                                            placeholder="Choose Product Status"
                                            defaultValue=""
                                            options={[
                                                {
                                                    value: 'none',
                                                    label: 'None',
                                                },
                                                {
                                                    value: 'delivered',
                                                    label: 'Delivered',
                                                },
                                                {
                                                    value: 'pending',
                                                    label: 'Pending',
                                                },
                                                {
                                                    value: 'canceled',
                                                    label: 'Canceled',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full width row */}
                        <div className="space-y-2 md:col-span-3">
                            <Label htmlFor="product-type">
                                Product Type:
                                <span className="text-destructive">*</span>
                            </Label>
                            <CustomSelect
                                id="category"
                                placeholder="Choose Product Category"
                                defaultValue=""
                                options={[
                                    {
                                        value: 'none',
                                        label: 'None',
                                    },
                                    {
                                        value: 'electronics',
                                        label: 'Electronics',
                                    },
                                    {
                                        value: 'apparel',
                                        label: 'Apparel',
                                    },
                                    {
                                        value: 'home',
                                        label: 'Home',
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </main>
        </DashboardShell>
    );
}
