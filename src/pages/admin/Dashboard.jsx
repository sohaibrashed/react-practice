import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Bar, BarChart, Line, LineChart } from "recharts";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, DollarSign, Users } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";

const monthlySalesData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1900 },
  { month: "Mar", sales: 3000 },
  { month: "Apr", sales: 5000 },
  { month: "May", sales: 2400 },
  { month: "Jun", sales: 3300 },
];

const revenueTrendsData = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 2000 },
  { month: "Mar", revenue: 1500 },
  { month: "Apr", revenue: 3000 },
  { month: "May", revenue: 4000 },
  { month: "Jun", revenue: 3500 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#4ADE80",
  },
  revenue: {
    label: "Revenue",
    color: "#38BDF8",
  },
};

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <DollarSign size={24} className="text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">$12,345</h2>
                <p className="text-sm text-gray-400">This Month</p>
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
                <h2 className="text-2xl font-bold">456</h2>
                <p className="text-sm text-gray-400">This Month</p>
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
                <h2 className="text-2xl font-bold">1,234</h2>
                <p className="text-sm text-gray-400">In Stock</p>
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
                <h2 className="text-2xl font-bold">789</h2>
                <p className="text-sm text-gray-400">Registered</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart data={monthlySalesData}>
                  <Bar
                    dataKey="sales"
                    fill={chartConfig.sales.color}
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <LineChart data={revenueTrendsData}>
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={chartConfig.revenue.color}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
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
