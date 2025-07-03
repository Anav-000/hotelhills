// frontend/src/app/page.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bed,
  Users,
  Calendar,
  Utensils,
  ChefHat,
  Receipt,
  FileText,
  Building2,
  Table,
  ClipboardList,
  CreditCard,
  Settings,
  ArrowRight,
  TrendingUp,
  Hotel,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Room Management",
    description: "Manage hotel rooms, availability, and room types",
    href: "/rooms",
    icon: Bed,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Guest Management",
    description: "Handle guest information, check-ins, and profiles",
    href: "/guests",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    title: "Booking Management",
    description: "Manage room reservations and booking schedules",
    href: "/bookings",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    title: "Table Management",
    description: "Manage restaurant tables and seating arrangements",
    href: "/tables",
    icon: Table,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    title: "Table Booking",
    description: "Handle restaurant table reservations",
    href: "/tableBookings",
    icon: ClipboardList,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    title: "KOT Management",
    description: "Kitchen Order Tickets and food service management",
    href: "/kots",
    icon: Receipt,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    title: "Menu Management",
    description: "Manage restaurant menus and food items",
    href: "/menu",
    icon: Utensils,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    title: "Banquet Management",
    description: "Handle banquet halls and event spaces",
    href: "/banquets",
    icon: Building2,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    title: "Banquet Booking",
    description: "Manage banquet hall reservations and events",
    href: "/banquetBookings",
    icon: ChefHat,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
  {
    title: "Quotation Management",
    description: "Handle price quotes and proposals",
    href: "/quotations",
    icon: FileText,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
  {
    title: "Bill Management",
    description: "Generate and manage customer bills",
    href: "/bills",
    icon: CreditCard,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
];

const stats = [
  {
    title: "Total Revenue",
    value: "₹124,563.00",
    change: "+20.1%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    title: "Active Bookings",
    value: "573",
    change: "+180.1%",
    changeType: "positive",
    icon: Calendar,
  },
  {
    title: "Available Rooms",
    value: "45",
    change: "+19%",
    changeType: "positive",
    icon: Bed,
  },
  {
    title: "Guest Satisfaction",
    value: "4.8/5",
    change: "+4.75%",
    changeType: "positive",
    icon: Star,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-4">
                <Hotel className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HotelHills
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Complete hotel management solution for rooms, bookings, dining,
              and events
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-full">
                    <stat.icon className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={module.href}>
                <Card
                  className={`border-2 hover:border-${
                    module.color.split("-")[1]
                  }-300 transition-all duration-300 cursor-pointer group hover:shadow-xl ${
                    module.borderColor
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${module.bgColor}`}>
                        <module.icon className={`w-6 h-6 ${module.color}`} />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardTitle className="text-lg mb-2 text-slate-900 group-hover:text-slate-700 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <p className="text-blue-100 mb-6">
                  Get started with the most common tasks
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/bookings">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      New Booking
                    </Button>
                  </Link>
                  <Link href="/guests">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Check-in Guest
                    </Button>
                  </Link>
                  <Link href="/bills">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      Generate Bill
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
