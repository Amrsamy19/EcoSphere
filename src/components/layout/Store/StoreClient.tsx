"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/frontend/api/Store";
import ProductFilterBar, {
  ProductCategoryOption,
  ProductSortOption,
} from "./ProductFilterBar";
import ProductCardSection from "./ProductCardSection";
import Pagination from "@/components/ui/Pagination";
import { IProduct } from "@/types/ProductType";

import { useTranslations } from "next-intl";

export default function StoreClient() {
  const t = useTranslations("Store.filter");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<ProductSortOption>("default");
  const [category, setCategory] = useState<ProductCategoryOption>("default");

  const itemsPerPage = 8;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
          sort,
          category,
        });

        if (response.success) {
          const result = response.data;
          if (Array.isArray(result)) {
            setProducts(result);
            setTotalPages(1);
          } else {
            setProducts(result.data);
            setTotalPages(result.metadata.totalPages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, debouncedSearch, sort, category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sort, category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-[80%] mx-auto">
      <ProductFilterBar
        onSortChange={setSort}
        onCategoryChange={setCategory}
        onSearch={setSearch}
        currentSort={sort}
        currentCategory={category}
        searchValue={search}
      />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Loading products...</div>
        </div>
      ) : (
        <>
          <ProductCardSection products={products} />
          {products.length === 0 && (
            <p className="text-center text-foreground py-10">
              {t("noProducts")}
            </p>
          )}
          <div className="flex justify-center mt-8 mb-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages > 0 ? totalPages : 1}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
