// components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalItems, perPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / perPage);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-6 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border border-slate-700 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border text-gray-300 hover:bg-slate-800 ${
            page === currentPage
              ? "bg-white text-black border-white"
              : "border-slate-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border border-slate-700 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
