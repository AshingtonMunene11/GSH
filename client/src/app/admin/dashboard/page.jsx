"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Package,
  Star,
  AlertTriangle,
  TrendingUp,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
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

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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

  // KPIs
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock_available || 0), 0);
  const lowStockCount = products.filter((p) => p.stock_available < 30).length;
  const featuredCount = products.filter((p) => p.featured).length;
  const avgRating =
    products.reduce((sum, p) => sum + (p.rating || 0), 0) / (products.length || 1);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  const stats = [
    { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Products", value: totalProducts, icon: Package, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Low Stock", value: lowStockCount, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
    { title: "Featured", value: featuredCount, icon: Star, color: "text-yellow-600", bg: "bg-yellow-100" },
    { title: "Avg Rating", value: avgRating.toFixed(1), icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  ];

  // Analytics data
  const monthlySales = Object.values(
    orders.reduce((acc, o) => {
      const month = new Date(o.date).toLocaleString("default", { month: "short" });
      acc[month] = acc[month] || { month, total: 0 };
      acc[month].total += o.total;
      return acc;
    }, {})
  );

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

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600">Overview of your store performance.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Monthly Sales Trends</CardTitle></CardHeader>
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

        <Card>
          <CardHeader><CardTitle>Category Distribution</CardTitle></CardHeader>
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

      <Card>
        <CardHeader><CardTitle>Stock Levels by Product</CardTitle></CardHeader>
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
