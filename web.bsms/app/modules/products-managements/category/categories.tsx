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
import {
  ImageIcon,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 8;

type Category = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};

// TODO: replace with real data from your API/loader
const initialCategories: Category[] = Array.from({ length: 23 }).map(
  (_, i) => ({
    id: `CAT-${1000 + i}`,
    name: `Category ${i + 1}`,
    description:
      i % 3 === 0
        ? undefined
        : "Short description of what this category covers.",
    image:
      i % 4 === 0 ? undefined : `https://picsum.photos/seed/cat-${i}/200/200`,
  }),
);

export function meta() {
  return [
    { title: "Categories - MyTeam" },
    { name: "description", content: "Manage product categories." },
  ];
}

type CategoryFormState = {
  name: string;
  description: string;
  imagePreview?: string;
};

const emptyForm: CategoryFormState = {
  name: "",
  description: "",
  imagePreview: undefined,
};

// Shared fields used by both the Create and Edit dialogs
function CategoryFormFields({
  idPrefix,
  form,
  setForm,
  errors,
  setErrors,
}: {
  idPrefix: string;
  form: CategoryFormState;
  setForm: React.Dispatch<React.SetStateAction<CategoryFormState>>;
  errors: { name?: string };
  setErrors: React.Dispatch<React.SetStateAction<{ name?: string }>>;
}) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, imagePreview: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-name`}>
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}-name`}
          value={form.name}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, name: e.target.value }));
            if (errors.name) setErrors({});
          }}
          placeholder="e.g. Footwear"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-description`}>
          Description{" "}
          <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id={`${idPrefix}-description`}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="What belongs in this category?"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-image`}>
          Image <span className="text-muted-foreground">(optional)</span>
        </Label>

        {form.imagePreview ? (
          <div className="relative h-24 w-24">
            <img
              src={form.imagePreview}
              alt="Preview"
              className="h-24 w-24 rounded-md border object-cover"
            />
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({ ...prev, imagePreview: undefined }))
              }
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <Input
            id={`${idPrefix}-image`}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        )}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [page, setPage] = useState(1);

  // Create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CategoryFormState>(emptyForm);
  const [createErrors, setCreateErrors] = useState<{ name?: string }>({});

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CategoryFormState>(emptyForm);
  const [editErrors, setEditErrors] = useState<{ name?: string }>({});

  const totalPages = Math.max(1, Math.ceil(categories.length / PAGE_SIZE));

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return categories.slice(start, start + PAGE_SIZE);
  }, [categories, page]);

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

    if (!createForm.name.trim()) {
      setCreateErrors({ name: "Category name is required." });
      return;
    }

    const newCategory: Category = {
      id: `CAT-${1000 + categories.length}`,
      name: createForm.name.trim(),
      description: createForm.description.trim() || undefined,
      image: createForm.imagePreview,
    };

    // TODO: replace with your API call (POST /categories)
    setCategories((prev) => [newCategory, ...prev]);
    setPage(1);
    handleCreateOpenChange(false);
  };

  // --- Edit handlers ---
  const handleEditOpen = (category: Category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      description: category.description ?? "",
      imagePreview: category.image,
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

    if (!editForm.name.trim()) {
      setEditErrors({ name: "Category name is required." });
      return;
    }

    // TODO: replace with your API call (PATCH /categories/:id)
    setCategories((prev) =>
      prev.map((category) =>
        category.id === editingId
          ? {
              ...category,
              name: editForm.name.trim(),
              description: editForm.description.trim() || undefined,
              image: editForm.imagePreview,
            }
          : category,
      ),
    );
    handleEditOpenChange(false);
  };

  const handleDelete = (id: string) => {
    // TODO: replace with your API call (DELETE /categories/:id)
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return (
    <DashboardShell>
      <main className="min-h-screen bg-background p-4 text-foreground">
        <div className="">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Categories
            </h2>

            <Dialog open={createOpen} onOpenChange={handleCreateOpenChange}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Create new category
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <form onSubmit={handleCreateSubmit}>
                  <DialogHeader>
                    <DialogTitle>Create category</DialogTitle>
                    <DialogDescription>
                      Add a new category. Description and image are optional.
                    </DialogDescription>
                  </DialogHeader>

                  <CategoryFormFields
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
                    <Button type="submit">Create category</Button>
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
                  <DialogTitle>Edit category</DialogTitle>
                  <DialogDescription>
                    Update the category's details.
                  </DialogDescription>
                </DialogHeader>

                <CategoryFormFields
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
                  <TableHead className="w-15">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-15" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.id}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-sm truncate text-muted-foreground">
                      {category.description ?? (
                        <span className="italic text-muted-foreground/60">
                          No description
                        </span>
                      )}
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
                            onClick={() => handleEditOpen(category)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(category.id)}
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