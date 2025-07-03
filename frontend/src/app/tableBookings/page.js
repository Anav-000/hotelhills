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
import { Plus, Search, Edit, Trash2, UserCheck, Receipt } from "lucide-react";
import {
  getTableBookings,
  createTableBooking,
  updateTableBooking,
  deleteTableBooking,
} from "@/api/tableBookings";
import { getTables } from "@/api/tables";
import { getGuests } from "@/api/guests";

export default function TableBookingsPage() {
  const [tableBookings, setTableBookings] = useState([]);
  const [tables, setTables] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    table: "",
    guest: "",
    bookingTime: "",
    status: "reserved",
  });

  useEffect(() => {
    fetchTableBookings();
    fetchTables();
    fetchGuests();
  }, []);

  const fetchTableBookings = async () => {
    try {
      const data = await getTableBookings();
      setTableBookings(data);
    } catch (error) {
      console.error("Error fetching table bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    try {
      const data = await getTables();
      setTables(data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const fetchGuests = async () => {
    try {
      const data = await getGuests();
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBooking) {
        await updateTableBooking(editingBooking._id, formData);
      } else {
        await createTableBooking(formData);
      }
      setIsDialogOpen(false);
      setEditingBooking(null);
      resetForm();
      fetchTableBookings();
    } catch (error) {
      console.error("Error saving table booking:", error);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      table: booking.table._id || booking.table,
      guest: booking.guest._id || booking.guest,
      bookingTime: new Date(booking.bookingTime).toISOString().slice(0, 16),
      status: booking.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteTableBooking(id);
        fetchTableBookings();
      } catch (error) {
        console.error("Error deleting table booking:", error);
      }
    }
  };

  const handleCheckIn = async (booking) => {
    try {
      if (booking.status === "reserved") {
        await updateTableBooking(booking._id, { status: "completed" });
        alert(
          `Guest ${booking.guest?.name} has been checked in for Table ${booking.table?.number}`
        );
      } else if (booking.status === "completed") {
        alert("Guest is already checked in!");
      } else {
        alert("Cannot check in a cancelled booking.");
      }
      fetchTableBookings();
    } catch (error) {
      console.error("Error checking in guest:", error);
    }
  };

  const handleGenerateBill = async (booking) => {
    try {
      // Create a simple receipt for table booking
      const receiptData = {
        guestName: booking.guest?.name || "Unknown Guest",
        tableNumber: booking.table?.number || "Unknown",
        bookingTime: new Date(booking.bookingTime).toLocaleString(),
        status: booking.status,
        amount: 0, // This would be calculated based on menu items
        items: `Table booking for Table ${booking.table?.number}`,
      };

      // For now, just show an alert with receipt details
      // In a real application, this would generate a proper receipt
      alert(
        `Receipt Generated!\n\nGuest: ${receiptData.guestName}\nTable: ${receiptData.tableNumber}\nTime: ${receiptData.bookingTime}\nStatus: ${receiptData.status}\n\nPlease add menu items and calculate total amount.`
      );

      // You can also navigate to a receipt page or open a print dialog
      // window.open(`/receipt?data=${encodeURIComponent(JSON.stringify(receiptData))}`, '_blank');
    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      table: "",
      guest: "",
      bookingTime: "",
      status: "reserved",
    });
  };

  const filteredBookings = tableBookings.filter(
    (booking) =>
      booking.guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.table?.number?.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading table bookings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Table Bookings</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingBooking(null);
              resetForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingBooking
                  ? "Edit Table Booking"
                  : "Add New Table Booking"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Table</label>
                <select
                  value={formData.table}
                  onChange={(e) =>
                    setFormData({ ...formData, table: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a table</option>
                  {tables.map((table) => (
                    <option key={table._id} value={table._id}>
                      Table {table.number} (Capacity: {table.capacity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Guest</label>
                <select
                  value={formData.guest}
                  onChange={(e) =>
                    setFormData({ ...formData, guest: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a guest</option>
                  {guests.map((guest) => (
                    <option key={guest._id} value={guest._id}>
                      {guest.name} - {guest.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Booking Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.bookingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, bookingTime: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="reserved">Reserved</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingBooking ? "Update" : "Create"} Booking
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingBooking(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search table bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <Card key={booking._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{booking.guest?.name || "Unknown Guest"}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCheckIn(booking)}
                    disabled={
                      booking.status === "completed" ||
                      booking.status === "cancelled"
                    }
                    title={
                      booking.status === "completed"
                        ? "Already Checked In"
                        : booking.status === "cancelled"
                        ? "Cannot Check In Cancelled Booking"
                        : "Check In Guest"
                    }
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateBill(booking)}
                    disabled={booking.status === "cancelled"}
                    title={
                      booking.status === "cancelled"
                        ? "Cannot Generate Bill for Cancelled Booking"
                        : "Generate Bill/Receipt"
                    }
                  >
                    <Receipt className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(booking)}
                    title="Edit Booking"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(booking._id)}
                    title="Delete Booking"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Table</p>
                  <p className="font-medium">
                    Table {booking.table?.number || "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">
                    {new Date(booking.bookingTime).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">
                    {new Date(booking.bookingTime).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === "reserved"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guest Phone</p>
                  <p className="font-medium">{booking.guest?.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="font-medium">
                    {booking.table?.capacity || "N/A"} persons
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No table bookings found.</p>
        </div>
      )}
    </div>
  );
}
