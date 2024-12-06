import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  Cell,
} from "recharts";
import { Table } from "@/components/ui/table";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  AlertTriangle,
} from "lucide-react";
import { useGetDashboardDataQuery } from "@/services/dashboardApi";
import LoadingSpinner from "@/components/ui/loadingSpinner";

const COLORS = ["#4ADE80", "#38BDF8", "#FF7849", "#F87171", "#A78BFA"];

const Dashboard = () => {
  const { data: dashData, isLoading, isError } = useGetDashboardDataQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong, Try again!</p>;
  }

  const {
    totalUsers = 0,
    totalProducts = 0,
    totalOrders = 0,
    totalRevenue = 0,
    topSellingProducts = [],
    recentOrders = [],
    lowStockProducts = [],
    ordersByStatus = [],
  } = dashData?.data || {};

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <DollarSign size={24} className="text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  ${totalRevenue.toFixed(2)}
                </h2>
                <p className="text-sm text-gray-400">All-Time Revenue</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <ShoppingCart size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{totalOrders}</h2>
                <p className="text-sm text-gray-400">Orders Placed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <Package size={24} className="text-yellow-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{totalProducts}</h2>
                <p className="text-sm text-gray-400">Available in Store</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <Users size={24} className="text-pink-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{totalUsers}</h2>
                <p className="text-sm text-gray-400">Registered Users</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart width={400} height={300}>
                <Pie
                  data={ordersByStatus || []}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {ordersByStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                width={400}
                height={300}
                data={topSellingProducts || []}
              >
                <Bar dataKey="totalSold" fill="#4ADE80" />
                <Tooltip />
              </BarChart>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts?.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders?.map((order) => (
                    <tr key={order._id}>
                      <td>{order.user.name}</td>
                      <td>${order.totalAmount?.toFixed(2)}</td>
                      <td>{order.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <p className="text-gray-400 text-sm">Upcoming events and orders.</p>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
