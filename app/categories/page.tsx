"use client"

import Link from "next/link"
import { useCategories } from "@/hooks/useCategories"

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kamu bisa pakai Skeleton UI di sini */}
          <p>Loading categories...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories?.map((c) => (
          <Link 
            key={c.id} 
            href={`/categories/${encodeURIComponent(c.name.toLowerCase())}`}
          >
            <div className="p-6 border rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all cursor-pointer shadow-sm">
              <h2 className="text-xl font-semibold capitalize">{c.name}</h2>
              <p className="text-gray-500 text-sm">View products &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}