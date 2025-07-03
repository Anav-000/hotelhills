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

export default function BanquetsPage() {
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchBanquets();
  }, []);

  const fetchBanquets = async () => {
    try {
      const response = await fetch("/api/banquets");
      if (response.ok) {
        const data = await response.json();
        setBanquets(data);
      }
    } catch (error) {
      console.error("Error fetching banquets:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBanquets = banquets.filter(
    (banquet) =>
      banquet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banquet.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading banquets...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Banquets</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Banquet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Banquet</DialogTitle>
            </DialogHeader>
            {/* Add form here */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search banquets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBanquets.map((banquet) => (
          <Card key={banquet._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{banquet.name}</span>
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
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium">{banquet.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="font-medium">{banquet.capacity} guests</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-medium">${banquet.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium">{banquet.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBanquets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No banquets found.</p>
        </div>
      )}
    </div>
  );
}
