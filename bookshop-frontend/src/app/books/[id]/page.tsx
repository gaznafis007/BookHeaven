"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthContext";
import { toast } from "sonner";

const API_URL = "https://bookshop-backend-api.vercel.app/api/products";

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const { currentUser, purchaseProduct } = useUser();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data: Product = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load book");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const hasPurchased = book?.purchasedBy?.some(
    (p) => p.userId === currentUser?._id
  );

  const insufficientCredits =
    currentUser && book && currentUser.credits < book.price;

  const handlePurchase = async () => {
    if (!currentUser || !book) return toast.error("Please login to purchase");
    if (insufficientCredits) return toast.error("Insufficient credits");

    try {
      setPurchasing(true);
      const updatedUser = await purchaseProduct(currentUser._id, book);
      if (updatedUser) {
        toast.success(`Purchased ${book.title} successfully!`);
        const res = await fetch(`${API_URL}/${id}`);
        const updatedBook: Product = await res.json();
        setBook(updatedBook);
      }
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        toast.error(err.message || "Purchase failed");
      } else {
        toast.error("Purchase failed");
      }
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading book...</p>;
  if (!book) return <p className="text-center mt-10">Book not found</p>;

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
          <p className="text-gray-500">{book.author}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>{book.description}</p>
          <p className="font-semibold text-lg">${book.price}</p>
          <Button
            onClick={handlePurchase}
            disabled={!!hasPurchased || purchasing || !!insufficientCredits}
          >
            {purchasing
              ? "Processing..."
              : hasPurchased
              ? "Purchased"
              : !!insufficientCredits
              ? "Insufficient credits"
              : "Buy"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
