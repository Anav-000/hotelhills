"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Users,
  DollarSign,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookingAPI, roomAPI, guestAPI } from "../../lib/api";
import FormModal from "../../components/FormModal";
import DetailModal from "../../components/DetailModal";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsData, roomsData, guestsData] = await Promise.all([
        bookingAPI.getAll(),
        roomAPI.getAll(),
        guestAPI.getAll(),
      ]);
      setBookings(bookingsData);
      setRooms(roomsData);
      setGuests(guestsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedBooking(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (booking) => {
    if (confirm(`Are you sure you want to delete this booking?`)) {
      try {
        await bookingAPI.delete(booking._id);
        await fetchData();
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert("Failed to delete booking");
      }
    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleCheckIn = async (booking) => {
    try {
      if (booking.status === "booked") {
        await bookingAPI.update(booking._id, { status: "checked-in" });
        alert(`Guest has been checked in for Room ${booking.room?.number}`);
      } else if (booking.status === "checked-in") {
        alert("Guest is already checked in!");
      } else {
        alert("Cannot check in this booking.");
      }
      await fetchData();
    } catch (err) {
      console.error("Error checking in guest:", err);
      alert("Failed to check in guest");
    }
  };

  const handleCheckOut = async (booking) => {
    try {
      if (booking.status === "checked-in") {
        await bookingAPI.update(booking._id, { status: "checked-out" });
        alert(`Guest has been checked out from Room ${booking.room?.number}`);
      } else {
        alert("Guest is not checked in!");
      }
      await fetchData();
    } catch (err) {
      console.error("Error checking out guest:", err);
      alert("Failed to check out guest");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (selectedBooking) {
        await bookingAPI.update(selectedBooking._id, formData);
      } else {
        await bookingAPI.create(formData);
      }
      setIsFormModalOpen(false);
      await fetchData();
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Failed to save booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const bookingFormFields = [
    {
      name: "room",
      label: "Room",
      type: "select",
      required: true,
      options: rooms.map((room) => ({
        value: room._id,
        label: `Room ${room.number} - ${room.type}`,
      })),
    },
    {
      name: "guest",
      label: "Guest",
      type: "select",
      required: true,
      options: guests.map((guest) => ({
        value: guest._id,
        label: guest.name,
      })),
    },
    { name: "checkIn", label: "Check-in Date", type: "date", required: true },
    { name: "checkOut", label: "Check-out Date", type: "date", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "booked", label: "Booked" },
        { value: "checked-in", label: "Checked In" },
        { value: "checked-out", label: "Checked Out" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
  ];

  const bookingDetailFields = [
    { name: "room.number", label: "Room Number" },
    { name: "guest.name", label: "Guest Name" },
    { name: "checkIn", label: "Check-in Date", type: "date" },
    { name: "checkOut", label: "Check-out Date", type: "date" },
    { name: "status", label: "Status" },
    { name: "createdAt", label: "Created", type: "datetime" },
    { name: "updatedAt", label: "Last Updated", type: "datetime" },
  ];

  // Calculate statistics
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (booking) => booking.status === "checked-in"
  ).length;
  const completedBookings = bookings.filter(
    (booking) => booking.status === "checked-out"
  ).length;
  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room?.number?.toString().includes(searchTerm) ||
      booking.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "checked-in":
        return "bg-green-100 text-green-800 border-green-200";
      case "checked-out":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Booking Management
                </h1>
                <p className="text-slate-600">
                  Manage room bookings, check-ins, and check-outs
                </p>
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {totalBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Active</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {activeBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {completedBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Cancelled
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {cancelledBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Data Table */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              A list of all room bookings and their current status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan="6"
                      className="text-center py-8 text-slate-500"
                    >
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking._id || booking.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">
                            {booking.guest?.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {booking.guest?.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          Room {booking.room?.number}
                        </div>
                        <div className="text-sm text-slate-500">
                          {booking.room?.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status?.charAt(0).toUpperCase() +
                            booking.status?.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(booking)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(booking)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {booking.status === "booked" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCheckIn(booking)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <UserCheck className="w-4 h-4" />
                            </Button>
                          )}
                          {booking.status === "checked-in" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCheckOut(booking)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              <Receipt className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(booking)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedBooking ? "Edit Booking" : "New Booking"}
        fields={bookingFormFields}
        initialData={selectedBooking || {}}
        isLoading={isSubmitting}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Booking Details"
        data={selectedBooking || {}}
        fields={bookingDetailFields}
      />
    </div>
  );
}
