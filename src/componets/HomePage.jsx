
import React, { useMemo } from "react";
import { products } from "../utils/data";
import { users } from "../utils/data";

const HomePage = () => {

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalUsers = users.length;

    const totalOrders = users.reduce((sum, u) => sum + (u.orders || 0), 0);
    const avgRating =
      products.reduce((sum, p) => sum + (p.rating || 0), 0) /
      (products.length || 1);

    return {
      totalProducts,
      totalUsers,
      totalOrders,
      avgRating: avgRating.toFixed(1),
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-400">
          Overview of your ecommerce app
        </p>
      </div>

      {/* Top stat cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total Products</p>
          <p className="text-2xl font-semibold">{stats.totalProducts}</p>
        </div>

        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total Users</p>
          <p className="text-2xl font-semibold">{stats.totalUsers}</p>
        </div>

        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total Orders</p>
          <p className="text-2xl font-semibold">{stats.totalOrders}</p>
        </div>

        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4">
          <p className="text-xs text-gray-400 mb-1">Avg Product Rating</p>
          <p className="text-2xl font-semibold">{stats.avgRating}★</p>
        </div>
      </section>

      {/* Recent products / users preview */}
      <section className="grid gap-4 md:grid-cols-2">
        {/* Latest products */}
        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Latest Products</h3>
            <span className="text-[11px] text-gray-400">
              Showing {Math.min(5, products.length)}
            </span>
          </div>

          <ul className="space-y-2 text-xs">
            {products.slice(0, 5).map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between text-gray-300"
              >
                <span>{p.name}</span>
                <span className="text-gray-400">
                  ₹{p.price.toLocaleString("en-IN")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top users by orders */}
        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Top Customers</h3>
            <span className="text-[11px] text-gray-400">By orders</span>
          </div>

          <ul className="space-y-2 text-xs">
            {users
              .slice() // copy
              .sort((a, b) => (b.orders || 0) - (a.orders || 0))
              .slice(0, 5)
              .map((u) => (
                <li
                  key={u.id}
                  className="flex items-center justify-between text-gray-300"
                >
                  <span>{u.name}</span>
                  <span className="text-gray-400">{u.orders} orders</span>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
