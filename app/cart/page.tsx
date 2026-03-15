"use client"

import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { items, removeItem } = useCart()

  return (
    <div>
      <h1 className="text-2xl font-bold">Cart</h1>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between border p-4 mt-2">
          <div>
            {item.title} (x{item.quantity})
          </div>

          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}