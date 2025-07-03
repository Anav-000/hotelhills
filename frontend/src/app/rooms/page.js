"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Bed,
  Users,
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
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
import { roomAPI } from "../../lib/api";
import FormModal from "../../components/FormModal";
import DetailModal from "../../components/DetailModal";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await roomAPI.getAll();
      setRooms(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError(err.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedRoom(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (room) => {
    if (confirm(`Are you sure you want to delete room ${room.number}?`)) {
      try {
        await roomAPI.delete(room._id);
        await fetchRooms(); // Refresh the list
      } catch (err) {
        console.error("Error deleting room:", err);
        alert("Failed to delete room");
      }
    }
  };

  const handleView = (room) => {
    setSelectedRoom(room);
    setIsDetailModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (selectedRoom) {
        await roomAPI.update(selectedRoom._id, formData);
      } else {
        await roomAPI.create(formData);
      }
      setIsFormModalOpen(false);
      await fetchRooms();
    } catch (err) {
      console.error("Error saving room:", err);
      alert("Failed to save room");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roomFormFields = [
    { name: "number", label: "Room Number", type: "text", required: true },
    {
      name: "type",
      label: "Room Type",
      type: "select",
      required: true,
      options: [
        { value: "Single", label: "Single" },
        { value: "Double", label: "Double" },
        { value: "Suite", label: "Suite" },
        { value: "Deluxe", label: "Deluxe" },
      ],
    },
    { name: "price", label: "Price per Night", type: "number", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "available", label: "Available" },
        { value: "booked", label: "Booked" },
        { value: "maintenance", label: "Maintenance" },
      ],
    },
  ];

  const roomDetailFields = [
    { name: "number", label: "Room Number" },
    { name: "type", label: "Room Type" },
    { name: "price", label: "Price per Night", type: "currency" },
    { name: "status", label: "Status" },
    { name: "createdAt", label: "Created", type: "datetime" },
    { name: "updatedAt", label: "Last Updated", type: "datetime" },
  ];

  // Calculate statistics
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(
    (room) => room.status === "available"
  ).length;
  const occupiedRooms = rooms.filter(
    (room) => room.status === "occupied"
  ).length;
  const maintenanceRooms = rooms.filter(
    (room) => room.status === "maintenance"
  ).length;

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(
    (room) =>
      room.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading rooms...</p>
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
                  Room Management
                </h1>
                <p className="text-slate-600">
                  Manage hotel rooms, availability, and pricing
                </p>
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Room
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
                  <Bed className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Total Rooms
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {totalRooms}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Bed className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Available
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {availableRooms}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Bed className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Occupied</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {occupiedRooms}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Bed className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Maintenance
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {maintenanceRooms}
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
                  placeholder="Search rooms..."
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
            <CardTitle>Rooms</CardTitle>
            <CardDescription>
              A list of all hotel rooms and their current status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan="7"
                      className="text-center py-8 text-slate-500"
                    >
                      No rooms found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRooms.map((room, index) => (
                    <motion.tr
                      key={room._id || room.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell className="font-medium">
                        {room.number}
                      </TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-slate-500" />
                          {room.capacity} persons
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center font-medium">
                          <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                          ${room.price}/night
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            room.status
                          )}`}
                        >
                          {room.status?.charAt(0).toUpperCase() +
                            room.status?.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{room.floor}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(room)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(room)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(room)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
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
        title={selectedRoom ? "Edit Room" : "Add New Room"}
        fields={roomFormFields}
        initialData={selectedRoom || {}}
        isLoading={isSubmitting}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Room Details"
        data={selectedRoom || {}}
        fields={roomDetailFields}
      />
    </div>
  );
}
