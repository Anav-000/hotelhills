"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
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
import { guestAPI } from "../../lib/api";
import FormModal from "../../components/FormModal";
import DetailModal from "../../components/DetailModal";

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const data = await guestAPI.getAll();
      setGuests(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching guests:", err);
      setError(err.message || "Failed to fetch guests");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedGuest(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (guest) => {
    if (confirm(`Are you sure you want to delete guest ${guest.name}?`)) {
      try {
        await guestAPI.delete(guest._id);
        await fetchGuests(); // Refresh the list
      } catch (err) {
        console.error("Error deleting guest:", err);
        alert("Failed to delete guest");
      }
    }
  };

  const handleView = (guest) => {
    setSelectedGuest(guest);
    setIsDetailModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (selectedGuest) {
        await guestAPI.update(selectedGuest._id, formData);
      } else {
        await guestAPI.create(formData);
      }
      setIsFormModalOpen(false);
      await fetchGuests();
    } catch (err) {
      console.error("Error saving guest:", err);
      alert("Failed to save guest");
    } finally {
      setIsSubmitting(false);
    }
  };

  const guestFormFields = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email" },
    { name: "address", label: "Address", type: "textarea" },
  ];

  const guestDetailFields = [
    { name: "name", label: "Full Name" },
    { name: "phone", label: "Phone Number" },
    { name: "email", label: "Email Address" },
    { name: "address", label: "Address" },
    { name: "createdAt", label: "Registered", type: "datetime" },
    { name: "updatedAt", label: "Last Updated", type: "datetime" },
  ];

  // Calculate statistics
  const totalGuests = guests.length;
  const checkedInGuests = guests.filter(
    (guest) => guest.status === "checked-in"
  ).length;
  const checkedOutGuests = guests.filter(
    (guest) => guest.status === "checked-out"
  ).length;
  const reservedGuests = guests.filter(
    (guest) => guest.status === "reserved"
  ).length;

  // Filter guests based on search term
  const filteredGuests = guests.filter(
    (guest) =>
      guest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800 border-green-200";
      case "checked-out":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "reserved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading guests...</p>
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
                  Guest Management
                </h1>
                <p className="text-slate-600">
                  Manage guest information, check-ins, and profiles
                </p>
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Guest
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
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Total Guests
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {totalGuests}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Checked In
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {checkedInGuests}
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
                    Checked Out
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {checkedOutGuests}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Reserved</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {reservedGuests}
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
                  placeholder="Search guests..."
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
            <CardTitle>Guests</CardTitle>
            <CardDescription>
              A list of all hotel guests and their current status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan="7"
                      className="text-center py-8 text-slate-500"
                    >
                      No guests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGuests.map((guest, index) => (
                    <motion.tr
                      key={guest._id || guest.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">
                            {guest.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            ID: {guest._id?.slice(-8)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-slate-500" />
                          <span className="text-sm">{guest.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-slate-500" />
                          <span className="text-sm">{guest.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center max-w-xs">
                          <MapPin className="w-4 h-4 mr-2 text-slate-500 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {guest.address}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                          <span className="text-sm">
                            {guest.checkInDate
                              ? new Date(guest.checkInDate).toLocaleDateString()
                              : "Not checked in"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            guest.status
                          )}`}
                        >
                          {guest.status === "checked-in"
                            ? "Checked In"
                            : guest.status === "checked-out"
                            ? "Checked Out"
                            : "Reserved"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(guest)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(guest)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(guest)}
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
        title={selectedGuest ? "Edit Guest" : "Add New Guest"}
        fields={guestFormFields}
        initialData={selectedGuest || {}}
        isLoading={isSubmitting}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Guest Details"
        data={selectedGuest || {}}
        fields={guestDetailFields}
      />
    </div>
  );
}
