import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function ProfileDataTable({
  orders = [],
  emptyMessage = "No orders",
}) {
  return (
    <>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-600">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item) => {
              <TableRow>
                <TableCell></TableCell>
              </TableRow>;
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
