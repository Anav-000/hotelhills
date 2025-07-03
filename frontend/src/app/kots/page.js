"use client";

import { useState, useEffect } from "react";
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
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default function KOTsPage() {
  const [kots, setKots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchKOTs();
  }, []);

  const fetchKOTs = async () => {
    try {
      const response = await fetch("/api/kots");
      if (response.ok) {
        const data = await response.json();
        setKots(data);
      }
    } catch (error) {
      console.error("Error fetching KOTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredKOTs = kots.filter(
    (kot) =>
      kot.tableNumber?.toString().includes(searchTerm) ||
      kot.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading KOTs...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kitchen Order Tickets (KOTs)</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New KOT
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New KOT</DialogTitle>
            </DialogHeader>
            {/* Add form here */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search KOTs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredKOTs.map((kot) => (
          <Card key={kot._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>KOT #{kot.kotNumber}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Table</p>
                  <p className="font-medium">{kot.tableNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">
                    {new Date(kot.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <p className="font-medium">{kot.items?.length || 0} items</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium">{kot.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredKOTs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No KOTs found.</p>
        </div>
      )}
    </div>
  );
}
