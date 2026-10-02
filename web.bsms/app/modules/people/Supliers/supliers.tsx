import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 8;

type Supplier = {
  id: string;
  fullName: string;
  email: string;
  phone1: string;
  phone2?: string;
  address: string;
  notes?: string;
};

// TODO: replace with real data from your API/loader
const initialSuppliers: Supplier[] = Array.from({ length: 23 }).map(
  (_, i) => ({
    id: `SUP-${1000 + i}`,
    fullName: `Supplier ${i + 1}`,
    email: `supplier${i + 1}@example.com`,
    phone1: `+855 12 345 ${String(i).padStart(3, "0")}`,
    phone2: i % 3 === 0 ? undefined : `+855 89 765 ${String(i).padStart(3, "0")}`,
    address: "Street 271, Phnom Penh, Cambodia",
    notes: i % 4 === 0 ? undefined : "Reliable supplier, pays on delivery.",
  }),
);

export function meta() {
  return [
    { title: "Suppliers - MyTeam" },
    { name: "description", content: "Manage suppliers." },
  ];
}

type SupplierFormState = {
  fullName: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
  notes: string;
};

const emptyForm: SupplierFormState = {
  fullName: "",
  email: "",
  phone1: "",
  phone2: "",
  address: "",
  notes: "",
};

type FormErrors = {
  fullName?: string;
  email?: string;
  phone1?: string;
  address?: string;
};

// Shared fields used by both the Create and Edit dialogs
function SupplierFormFields({
  idPrefix,
  form,
  setForm,
  errors,
  setErrors,
}: {
  idPrefix: string;
  form: SupplierFormState;
  setForm: React.Dispatch<React.SetStateAction<SupplierFormState>>;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}) {
  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-fullName`}>
          Full name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}-fullName`}
          value={form.fullName}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, fullName: e.target.value }));
            clearError("fullName");
          }}
          placeholder="e.g. Sok Dara"
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-email`}>
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}-email`}
          type="email"
          value={form.email}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, email: e.target.value }));
            clearError("email");
          }}
          placeholder="supplier@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-phone1`}>
            Phone 1 <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${idPrefix}-phone1`}
            type="tel"
            value={form.phone1}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, phone1: e.target.value }));
              clearError("phone1");
            }}
            placeholder="+855 12 345 678"
            aria-invalid={!!errors.phone1}
          />
          {errors.phone1 && (
            <p className="text-sm text-destructive">{errors.phone1}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-phone2`}>
            Phone 2 <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id={`${idPrefix}-phone2`}
            type="tel"
            value={form.phone2}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone2: e.target.value }))
            }
            placeholder="+855 89 765 432"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-address`}>
          Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}-address`}
          value={form.address}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, address: e.target.value }));
            clearError("address");
          }}
          placeholder="Street, city, country"
          aria-invalid={!!errors.address}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-notes`}>
          Notes <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id={`${idPrefix}-notes`}
          value={form.notes}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="Any additional notes about this supplier"
          rows={3}
        />
      </div>
    </div>
  );
}

function validateForm(form: SupplierFormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.phone1.trim()) errors.phone1 = "Phone 1 is required.";
  if (!form.address.trim()) errors.address = "Address is required.";
  return errors;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [page, setPage] = useState(1);

  // Create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<SupplierFormState>(emptyForm);
  const [createErrors, setCreateErrors] = useState<FormErrors>({});

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<SupplierFormState>(emptyForm);
  const [editErrors, setEditErrors] = useState<FormErrors>({});

  const totalPages = Math.max(1, Math.ceil(suppliers.length / PAGE_SIZE));

  const paginatedSuppliers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return suppliers.slice(start, start + PAGE_SIZE);
  }, [suppliers, page]);

  const pageNumbers = useMemo(() => {
    // Show up to 5 page links, with ellipses for the rest
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  }, [page, totalPages]);

  // --- Create handlers ---
  const handleCreateOpenChange = (next: boolean) => {
    setCreateOpen(next);
    if (!next) {
      setCreateForm(emptyForm);
      setCreateErrors({});
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(createForm);
    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      return;
    }

    const newSupplier: Supplier = {
      id: `SUP-${1000 + suppliers.length}`,
      fullName: createForm.fullName.trim(),
      email: createForm.email.trim(),
      phone1: createForm.phone1.trim(),
      phone2: createForm.phone2.trim() || undefined,
      address: createForm.address.trim(),
      notes: createForm.notes.trim() || undefined,
    };

    // TODO: replace with your API call (POST /suppliers)
    setSuppliers((prev) => [newSupplier, ...prev]);
    setPage(1);
    handleCreateOpenChange(false);
  };

  // --- Edit handlers ---
  const handleEditOpen = (supplier: Supplier) => {
    setEditingId(supplier.id);
    setEditForm({
      fullName: supplier.fullName,
      email: supplier.email,
      phone1: supplier.phone1,
      phone2: supplier.phone2 ?? "",
      address: supplier.address,
      notes: supplier.notes ?? "",
    });
    setEditErrors({});
    setEditOpen(true);
  };

  const handleEditOpenChange = (next: boolean) => {
    setEditOpen(next);
    if (!next) {
      setEditingId(null);
      setEditForm(emptyForm);
      setEditErrors({});
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(editForm);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    // TODO: replace with your API call (PATCH /suppliers/:id)
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === editingId
          ? {
              ...supplier,
              fullName: editForm.fullName.trim(),
              email: editForm.email.trim(),
              phone1: editForm.phone1.trim(),
              phone2: editForm.phone2.trim() || undefined,
              address: editForm.address.trim(),
              notes: editForm.notes.trim() || undefined,
            }
          : supplier,
      ),
    );
    handleEditOpenChange(false);
  };

  const handleDelete = (id: string) => {
    // TODO: replace with your API call (DELETE /suppliers/:id)
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
  };

  return (
    <DashboardShell>
      <main className="min-h-screen bg-background p-4 text-foreground">
        <div className="">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Suppliers
            </h2>

            <Dialog open={createOpen} onOpenChange={handleCreateOpenChange}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Create new Supplier
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <form onSubmit={handleCreateSubmit}>
                  <DialogHeader>
                    <DialogTitle>Create supplier</DialogTitle>
                    <DialogDescription>
                      Add a new supplier. Phone 2 and notes are optional.
                    </DialogDescription>
                  </DialogHeader>

                  <SupplierFormFields
                    idPrefix="create"
                    form={createForm}
                    setForm={setCreateForm}
                    errors={createErrors}
                    setErrors={setCreateErrors}
                  />

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleCreateOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create supplier</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Edit dialog — opened programmatically from the row dropdown, no trigger here */}
          <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
            <DialogContent className="sm:max-w-md">
              <form onSubmit={handleEditSubmit}>
                <DialogHeader>
                  <DialogTitle>Edit supplier</DialogTitle>
                  <DialogDescription>
                    Update the supplier's details.
                  </DialogDescription>
                </DialogHeader>

                <SupplierFormFields
                  idPrefix="edit"
                  form={editForm}
                  setForm={setEditForm}
                  errors={editErrors}
                  setErrors={setEditErrors}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleEditOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <div className="rounded-xl border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="w-15" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="font-medium">{supplier.fullName}</div>
                      <div className="text-xs text-muted-foreground">
                        {supplier.id}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {supplier.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div>{supplier.phone1}</div>
                      {supplier.phone2 && (
                        <div className="text-xs">{supplier.phone2}</div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {supplier.address}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditOpen(supplier)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(supplier.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between border-t px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.max(1, p - 1));
                      }}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : undefined
                      }
                    />
                  </PaginationItem>
                  {pageNumbers.map((p, i) =>
                    p === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(p);
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.min(totalPages, p + 1));
                      }}
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}