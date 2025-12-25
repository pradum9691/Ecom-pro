import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products as allProducts } from "../utils/data";

const ProductsPage = () => {
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const brands = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.brand));
    return ["All", ...Array.from(set)];
  }, []);

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const priceRanges = [
    "All",
    "0-999",
    "1000-1999",
    "2000-4999",
    "5000-999999",
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const brandOk = brand === "All" || p.brand === brand;
      const catOk = category === "All" || p.category === category;

      let priceOk = true;
      if (priceRange !== "All") {
        const [min, max] = priceRange.split("-").map(Number);
        priceOk = p.price >= min && p.price <= max;
      }

      return brandOk && catOk && priceOk;
    });
  }, [brand, category, priceRange]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (filterSetter, value) => {
    filterSetter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Products</h2>
        <p className="text-sm text-gray-400">
          Browse and filter products ({filteredProducts.length} products)
        </p>
      </div>

      <section className="bg-slate-900/70 border border-white/5 rounded-2xl p-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-200">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Brand</label>
            <select
              value={brand}
              onChange={(e) => handleFilterChange(setBrand, e.target.value)}
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b === "All" ? "All Brands" : b}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Category</label>
            <select
              value={category}
              onChange={(e) =>
                handleFilterChange(setCategory, e.target.value)
              }
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) =>
                handleFilterChange(setPriceRange, e.target.value)
              }
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
            >
              {priceRanges.map((p) => (
                <option key={p} value={p}>
                  {p === "All"
                    ? "All Prices"
                    : `₹${p.split("-")[0]} - ₹${p.split("-")[1]}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {paginatedProducts.map((product) => (
          <article
            key={product.id}
            className="bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-white/20 transition-all duration-300"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-black/70 text-xs px-2 py-1 rounded-md">
                {product.brand}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-between p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center gap-1 text-xs text-yellow-400">
                  <span>★</span>
                  <span>{product.rating}</span>
                </div>
              </div>

              <button className="mt-2 w-full bg-white text-black py-2 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </section>
      {totalPages > 1 && (
        <section className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-700 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              const isNearby =
                Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;

              return isNearby ? (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white text-black"
                      : "border border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {page}
                </button>
              ) : page === 2 || page === totalPages - 1 ? (
                <span key={page} className="px-2 text-gray-400">
                  ...
                </span>
              ) : null;
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-slate-700 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} />
          </button>

          <span className="ml-4 text-xs text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
        </section>
      )}
    </div>
  );
};

export default ProductsPage;
