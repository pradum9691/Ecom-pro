import React, { useMemo, useState } from "react";
import { users as allUsers } from "../utils/data";

const ratingOptions = ["All", "4+", "3+", "2+"];

const UsersPage = () => {
  const [ratingFilter, setRatingFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    return allUsers.filter((u) => {
      if (ratingFilter === "All") return true;
      if (ratingFilter === "4+") return u.rating >= 4;
      if (ratingFilter === "3+") return u.rating >= 3;
      if (ratingFilter === "2+") return u.rating >= 2;
      return true;
    });
  }, [ratingFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Users</h2>
        <p className="text-sm text-gray-400">
          Manage and filter users ({filteredUsers.length} users)
        </p>
      </div>
      <section className="bg-slate-900/70 border border-white/5 rounded-2xl p-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-200">Filters</h3>
        <div className="max-w-xs space-y-1">
          <label className="text-xs text-gray-400">User Rating</label>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
          >
            {ratingOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All" ? "All Ratings" : opt}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.map((user) => (
          <article
            key={user.id}
            className="bg-slate-900/80 border border-white/5 rounded-2xl px-5 py-4 flex items-start gap-4"
          >

            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">
                  {user.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-yellow-400">
                  <span>★</span>
                  <span>{user.rating}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="text-gray-500">📧</span>
                  <span>{user.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-500">📞</span>
                  <span>{user.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-500">🛒</span>
                  <span>{user.orders} orders</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-500">📅</span>
                  <span>
                    Joined{" "}
                    {new Date(user.joinedAt).toLocaleDateString("en-GB")}
                  </span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default UsersPage;
