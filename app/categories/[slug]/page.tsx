"use client"

import { useParams, useRouter } from "next/navigation" // Tambah useRouter
import { useProducts } from "@/hooks/useProducts"
import { ProductCard } from "@/components/product/ProductCard"
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton"
import type { Product } from "@/types/product"

export default function CategoryDetailPage() {
  const params = useParams()
  const router = useRouter() // Inisialisasi router
  
  const categorySlug = params.slug ? decodeURIComponent(params.slug as string) : undefined
  const { data, isLoading } = useProducts(categorySlug)

  return (
    <div className="container mx-auto p-6">
      {/* Tombol Kembali */}
      <button 
        onClick={() => router.back()} // Menggunakan fungsi back bawaan browser
        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6 group"
      >
        <span className="transition-transform group-hover:-translate-x-1">
          &larr; 
        </span>
        <span className="text-sm font-medium">Back to Categories</span>
      </button>

      {/* Header Halaman */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold capitalize text-gray-900">
          {categorySlug}
        </h1>
        <p className="text-gray-500 mt-2">
          {isLoading ? "Fetching products..." : `Found ${data?.length || 0} products`}
        </p>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : (
          data?.map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))
        )}
      </div>

      {!isLoading && data?.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl mt-10">
          <p className="text-xl text-gray-400">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}