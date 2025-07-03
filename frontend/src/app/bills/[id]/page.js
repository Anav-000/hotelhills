"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBill } from "../../../../api/bills";

export default function BillPage() {
  const searchParams = useSearchParams();
  const id =
    searchParams.get("id") ||
    (typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : null);
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      getBill(id)
        .then(setBill)
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!bill) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 border mt-8 bg-white">
      <h1 className="text-2xl font-bold mb-4">Room Stay Bill</h1>
      <div className="mb-2">Bill ID: {bill._id}</div>
      <div className="mb-2">Guest: {bill.guest?.name}</div>
      <div className="mb-2">
        Room: {bill.room?.number} ({bill.room?.type})
      </div>
      <div className="mb-2">Nights: {bill.nights}</div>
      <div className="mb-2">Room Charge: ₹{bill.roomCharge}</div>
      <div className="mb-2">Additional Charges: ₹{bill.additionalCharges}</div>
      <div className="mb-2 font-bold">Total: ₹{bill.total}</div>
      <div className="mb-2 text-sm text-gray-500">
        Created: {bill.createdAt?.slice(0, 10)}
      </div>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => window.print()}
      >
        Print Bill
      </button>
    </div>
  );
}
