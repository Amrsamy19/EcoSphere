"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import ProductCard from "@/components/layout/restaurant/products/ProductCard";
import ProductPopup from "@/components/layout/restaurant/products/ProductPopup";
import DeleteProductDialog from "@/components/layout/restaurant/products/DeleteProductDialog";
import {
  ProductResponse,
  CreateProductDTO,
} from "@/backend/features/product/dto/product.dto";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("Restaurant.Products");
  const { data: session } = useSession();
  const restaurantId = session?.user?.id;

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState<any>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<
    ProductResponse | undefined
  >(undefined);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // Debounce search
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchProducts = async () => {
    if (!restaurantId) return;
    try {
      setLoading(true);
      const res = await axios.get(`/api/restaurants/${restaurantId}/products`, {
        params: {
          page,
          limit: 12,
          search: debouncedSearch,
        },
      });
      // Handle both pagination and legacy array response
      if (res.data.data.data) {
        setProducts(res.data.data.data);
        setMetadata(res.data.data.metadata);
      } else {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.loadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [restaurantId, page, debouncedSearch]);

  const handleCreate = async (data: CreateProductDTO) => {
    if (!restaurantId) return;
    try {
      await axios.post(`/api/restaurants/${restaurantId}/products`, data);
      toast.success(t("toasts.createSuccess"));
      fetchProducts();
      setIsPopupOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.createError"));
    }
  };

  const handleUpdate = async (data: CreateProductDTO) => {
    if (!restaurantId || !editingProduct) return;
    try {
      await axios.put(
        `/api/restaurants/${restaurantId}/products/${editingProduct._id}`,
        data
      );
      toast.success(t("toasts.updateSuccess"));
      fetchProducts();
      setIsPopupOpen(false);
      setEditingProduct(undefined);
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.updateError"));
    }
  };

  const handleDelete = (productId: string) => {
    setDeleteProductId(productId);
  };

  const confirmDelete = async () => {
    if (!restaurantId || !deleteProductId) return;
    try {
      await axios.delete(
        `/api/restaurants/${restaurantId}/products/${deleteProductId}`
      );
      toast.success(t("toasts.deleteSuccess"));
      setDeleteProductId(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.deleteError"));
    }
  };

  const openCreate = () => {
    setEditingProduct(undefined);
    setIsPopupOpen(true);
  };

  const openEdit = (product: ProductResponse) => {
    setEditingProduct(product);
    setIsPopupOpen(true);
  };

  // Seed Data Function
  /* const handleSeed = async () => {
    if (
      !restaurantId ||
      !confirm("This will add demo products to your menu. Continue?")
    )
      return;
    try {
      setLoading(true);
      let successCount = 0;
      for (const product of seedProducts) {
        try {
          await axios.post(
            `/api/restaurants/${restaurantId}/products`,
            product
          );
          successCount++;
        } catch (err) {
          console.error(`Failed to add ${product.title}`, err);
        }
      }
      toast.success(`Successfully added ${successCount} products`);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to seed products");
    } finally {
      setLoading(false);
    }
  }; */

  const renderProductsGrid = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
          ))}
        </div>
      );
    }

    if (products.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-15">
          {products.map((product) => (
            <ProductCard
              key={String(product._id)}
              product={product}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-20 text-muted-foreground">
        {t("noProducts")}
      </div>
    );
  };

  return (
    <div className="pt-15 h-[calc(100vh-20px)] w-[80%] mx-auto flex flex-col space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        </div>
        <div className="flex gap-3">
          {/* <Button
            variant="outline"
            onClick={handleSeed}
            className="rounded-full px-5 hover:bg-secondary/80"
          >
            Seed Data
          </Button> */}
          <Button
            onClick={openCreate}
            className="myBtnPrimary hover:scale-105 transition-transform"
          >
            <Plus className="mr-2 h-5 w-5" /> {t("addProduct")}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 bg-card p-3 mb-5 rounded-full border border-border shadow-sm shrink-0">
        <Search className="w-5 h-5 text-muted-foreground ml-2" />
        <Input
          placeholder={t("searchPlaceholder")}
          className="border-none focus-visible:ring-0 shadow-none bg-transparent rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-1 min-h-0">
        {renderProductsGrid()}
      </div>

      {/* Pagination */}
      {metadata && metadata.totalPages > 1 && (
        <div className="flex justify-center space-x-2 shrink-0">
          <Button
            className="myBtnPrimary"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            {t("previous")}
          </Button>
          <div className="flex items-center px-4 text-sm">
            {t("page", { current: page, total: metadata.totalPages })}
          </div>
          <Button
            className="myBtnPrimary"
            disabled={page === metadata.totalPages}
            onClick={() => setPage((p) => Math.min(metadata.totalPages, p + 1))}
          >
            {t("next")}
          </Button>
        </div>
      )}

      <ProductPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={editingProduct ? handleUpdate : handleCreate}
        title={editingProduct ? t("popup.editTitle") : t("popup.addTitle")}
        initialData={
          editingProduct
            ? {
                title: editingProduct.title,
                subtitle: editingProduct.subtitle,
                price: editingProduct.price,
                availableOnline: editingProduct.availableOnline,
                avatar: editingProduct.avatar,
              }
            : undefined
        }
      />

      <DeleteProductDialog
        isOpen={!!deleteProductId}
        onClose={() => setDeleteProductId(null)}
        onConfirm={confirmDelete}
        isDeleting={loading && !!deleteProductId} // Reusing loading state or we can add specific one
        productTitle={
          products.find((p) => String(p._id) === deleteProductId)?.title
        }
      />
    </div>
  );
}
