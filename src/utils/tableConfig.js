export const userTableConfig = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "role",
    header: "Role",
    cellClassName: (role) =>
      role === "admin"
        ? "text-green-600"
        : role === "owner"
        ? "text-yellow-600"
        : role === "user"
        ? "text-blue-600"
        : "",
    render: (item) => item.role.toUpperCase(),
  },
];

export const productTableConfig = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "description",
    header: "Description",
    render: (item) =>
      item.description ? `${item.description.slice(0, 50)}...` : "N/A",
  },
  {
    key: "brand",
    header: "Brand",
  },
  {
    key: "category.name",
    header: "Category",
  },
  {
    key: "stock",
    header: "Stock",
    cellClassName: (stock) =>
      stock <= 5
        ? "text-red-600 font-bold"
        : stock <= 20
        ? "text-orange-600"
        : "text-green-600",
  },
  {
    key: "price",
    header: "Price",
    render: (item) => `$${item.price.toFixed(2)}`,
    cellClassName: "text-green-600 font-semibold",
  },
];

export const orderTableConfig = [
  {
    key: "shippingAddress.fullName",
    header: "Customer Name",
  },
  {
    key: "totalAmount",
    header: "Total Amount",
    render: (item) => `$${item.totalAmount.toFixed(2)}`,
    cellClassName: "text-green-600 font-semibold",
  },
  {
    key: "paymentStatus",
    header: "Payment Status",
    cellClassName: (status) =>
      status === "Processing"
        ? "text-orange-600"
        : status === "Completed"
        ? "text-green-600"
        : status === "Failed"
        ? "text-red-600"
        : "",
    render: (item) => item.paymentStatus.toUpperCase(),
  },
  {
    key: "orderStatus",
    header: "Order Status",
    cellClassName: (status) =>
      status === "Processing"
        ? "text-orange-600"
        : status === "Completed"
        ? "text-green-600"
        : status === "Cancelled"
        ? "text-red-600"
        : "",
    render: (item) => item.orderStatus.toUpperCase(),
  },
  {
    key: "createdAt",
    header: "Created At",
    render: (item) => new Date(item.createdAt).toLocaleDateString(),
  },
];
