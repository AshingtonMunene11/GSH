"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Package, Layers } from "lucide-react";

export default function AnalyticsPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [timeRange, setTimeRange] = useState("30"); // default: last 30 days

  useEffect(() => {
    async function fetchData() {
      const prodRes = await fetch("/api/products");
      const prodData = await prodRes.json();
      setProducts(prodData);

      const orderRes = await fetch("/api/orders");
      const orderData = await orderRes.json();
      setOrders(orderData);
    }
    fetchData();
  }, []);

  // --- Filter orders by time range ---
  const now = new Date();
  const filteredOrders = orders.filter((o) => {
    const orderDate = new Date(o.date);
    if (timeRange === "7") {
      return orderDate >= new Date(now.setDate(now.getDate() - 7));
    }
    if (timeRange === "30") {
      return orderDate >= new Date(now.setDate(now.getDate() - 30));
    }
    if (timeRange === "ytd") {
      return orderDate.getFullYear() === new Date().getFullYear();
    }
    return true;
  });

  // --- Derived analytics ---
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = filteredOrders.length;
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock_available || 0), 0);

  const categoryDistribution = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || { category: p.category, count: 0 };
      acc[p.category].count += 1;
      return acc;
    }, {})
  );

  const stockLevels = products.map((p) => ({
    name: p.name,
    stock: p.stock_available,
  }));

  const monthlySales = Object.values(
    filteredOrders.reduce((acc, o) => {
      const month = new Date(o.date).toLocaleString("default", { month: "short" });
      acc[month] = acc[month] || { month, total: 0 };
      acc[month].total += o.total;
      return acc;
    }, {})
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Time Range Filter */}
      <div className="flex gap-4 mb-6">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="ytd">Year-to-Date</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock</p>
              <p className="text-2xl font-bold">{totalStock}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <Layers className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts (same as before, but now using filteredOrders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#126936" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#126936", "#f4821f", "#8884d8", "#82ca9d"][index % 4]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stock Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stockLevels}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#f4821f" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
