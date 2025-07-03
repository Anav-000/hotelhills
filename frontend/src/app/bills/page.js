"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Receipt } from "lucide-react";
import { generateBill, getBill } from "@/api/bills";

export default function BillsPage() {
  const [billId, setBillId] = useState("");
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generateData, setGenerateData] = useState({
    bookingId: "",
    additionalCharges: 0,
  });

  const handleFetchBill = async () => {
    setLoading(true);
    setError("");
    setBill(null);
    try {
      const data = await getBill(billId);
      setBill(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBill(null);
    try {
      const data = await generateBill(
        generateData.bookingId,
        generateData.additionalCharges
      );
      setBill(data);
      setIsDialogOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bills</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Bill for Booking</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleGenerateBill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Booking ID
                </label>
                <Input
                  value={generateData.bookingId}
                  onChange={(e) =>
                    setGenerateData({
                      ...generateData,
                      bookingId: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Charges
                </label>
                <Input
                  type="number"
                  value={generateData.additionalCharges}
                  onChange={(e) =>
                    setGenerateData({
                      ...generateData,
                      additionalCharges: Number(e.target.value),
                    })
                  }
                  min={0}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Generate Bill
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 flex gap-2 items-center">
        <Input
          placeholder="Enter Bill ID to fetch..."
          value={billId}
          onChange={(e) => setBillId(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleFetchBill} disabled={!billId || loading}>
          <Receipt className="mr-2 h-4 w-4" />
          Fetch Bill
        </Button>
      </div>

      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {bill && (
        <Card className="max-w-xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Bill Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <b>Bill ID:</b> {bill._id}
              </div>
              <div>
                <b>Booking:</b> {bill.booking}
              </div>
              <div>
                <b>Guest:</b> {bill.guest}
              </div>
              <div>
                <b>Room:</b> {bill.room}
              </div>
              <div>
                <b>Nights:</b> {bill.nights}
              </div>
              <div>
                <b>Room Charge:</b> {bill.roomCharge}
              </div>
              <div>
                <b>Additional Charges:</b> {bill.additionalCharges}
              </div>
              <div>
                <b>Total:</b> {bill.total}
              </div>
              <div>
                <b>Created At:</b> {new Date(bill.createdAt).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
