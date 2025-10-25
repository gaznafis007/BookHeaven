"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = "https://bookshop-backend-api.vercel.app/api/products";

export default function BooksPage() {
  const [books, setBooks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch books");
        const data: Product[] = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Card key={book._id} className="shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{book.title}</CardTitle>
            <p className="text-sm text-gray-500">{book.author}</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm line-clamp-3">
              {book.description}
            </p>
            <p className="font-semibold">${book.price}</p>
            <div className="flex justify-between mt-2">
              <Link
                href={`/books/${book._id}`}
                className="text-primary underline hover:text-primary/80"
              >
                Details
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
