import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreditCard,
  House,
  MessageCircle,
  Package,
  PencilIcon,
  PlusCircleIcon,
  Truck,
  Undo2,
  Smile,
} from "lucide-react";
import { useGetMineOrderQuery } from "@/services/ordersApi";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProfileDataTable from "@/components/ProfileDataTable";

export default function ProfileScreen() {
  const { address } = useSelector((state) => state.address);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetMineOrderQuery();

  if (orderLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const orders = data?.data;
  console.log(orders);

  const handleAddAddress = () => {};
  const handleEditAddress = () => {};
  const handleUpdateUser = () => {};

  return (
    <div className="container mx-auto p-6 lg:p-12 space-y-8">
      <Card className="p-6 shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Smile size={32} />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">
              Welcome back, {userInfo.name}!
            </h1>
            <p className="text-lg mt-2">
              Ready to explore your account and manage your orders? We're here
              to help you every step of the way!
            </p>
          </div>
        </div>
      </Card>

      {/* User Details */}
      <Card className="p-6 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-28 h-28">
            <AvatarImage src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
            <AvatarFallback className="text-6xl">
              {userInfo.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{userInfo.name}</h2>
              <button
                title="Update Profile"
                onClick={handleUpdateUser}
                className="hover:text-purple-600"
              >
                <PencilIcon size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500">{userInfo.userEmail}</p>
            <Badge variant="outline">{userInfo.role}</Badge>
          </div>
        </div>
      </Card>

      {/* Address Section */}
      <Card className="p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Address Book</h3>
          {address.length > 0 && (
            <button
              title="Edit Address"
              onClick={handleEditAddress}
              className="hover:text-purple-600"
            >
              <PencilIcon size={16} />
            </button>
          )}
        </div>
        {address.length > 0 ? (
          <div className="space-y-2 text-gray-700">
            <p>{address.fullName}</p>
            <p>{address.address}</p>
            <p>
              {address.city}, {address.postalCode}, {address.country}
            </p>
            <p>{address.phone}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p>No address found. Please add your address.</p>
            <button onClick={handleAddAddress} className="hover:text-green-600">
              <PlusCircleIcon size={18} />
            </button>
          </div>
        )}
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="to-pay" className="w-full">
        <TabsList className="flex justify-center space-x-4 overflow-auto">
          <TabsTrigger value="all-orders" className="flex-1">
            <Package size={18} className="mr-2" />
            All Orders
          </TabsTrigger>
          <TabsTrigger value="to-pay" className="flex-1">
            <CreditCard size={18} className="mr-2" />
            To Pay
          </TabsTrigger>
          <TabsTrigger value="to-ship" className="flex-1">
            <Truck size={18} className="mr-2" />
            To Ship
          </TabsTrigger>
          <TabsTrigger value="to-receive" className="flex-1">
            <House size={18} className="mr-2" />
            To Receive
          </TabsTrigger>
          <TabsTrigger value="to-review" className="flex-1">
            <MessageCircle size={18} className="mr-2" />
            To Review
          </TabsTrigger>
          <TabsTrigger value="returns" className="flex-1">
            <Undo2 size={18} className="mr-2" />
            Returns & Cancellations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all-orders">
          <ProfileDataTable orders={orders} emptyMessage="No orders found" />
        </TabsContent>
        <TabsContent value="to-pay">
          <ProfileDataTable orders={orders} emptyMessage="No orders to pay" />
        </TabsContent>
        <TabsContent value="to-ship">
          <ProfileDataTable orders={orders} emptyMessage="No orders to ship" />
        </TabsContent>
        <TabsContent value="to-receive">
          <ProfileDataTable
            orders={orders}
            emptyMessage="No orders to receive"
          />
        </TabsContent>
        <TabsContent value="to-review">
          <ProfileDataTable orders={orders} emptyMessage="No items to review" />
        </TabsContent>
        <TabsContent value="returns">
          <ProfileDataTable
            orders={orders}
            emptyMessage="No returns or cancellations"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
