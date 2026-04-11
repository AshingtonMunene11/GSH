export default function OrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      {/* Your orders table or content */}
    </div>
  );
}

// ??llllllllllll
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

//function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // New order form
//   const [newCustomer, setNewCustomer] = useState("");
//   const [newStatus, setNewStatus] = useState("");
//   const [newTotal, setNewTotal] = useState("");

//   // Editing state
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [editStatus, setEditStatus] = useState("");

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         const res = await fetch("/api/orders");
//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         console.error("Failed to fetch orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchOrders();
//   }, []);

//   // Create
//   const handleCreate = async () => {
//     if (!newCustomer || !newStatus || !newTotal) return;
//     const res = await fetch("/api/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         customer_name: newCustomer,
//         status: newStatus,
//         total: parseFloat(newTotal),
//       }),
//     });
//     const saved = await res.json();
//     setOrders((prev) => [...prev, saved]);
//     setNewCustomer("");
//     setNewStatus("");
//     setNewTotal("");
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
//     setOrders((prev) => prev.filter((o) => o.id !== id));
//   };

//   // Update
//   const handleUpdate = async (id) => {
//     await fetch("/api/orders", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, status: editStatus }),
//     });
//     setOrders((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, status: editStatus } : o))
//     );
//     setEditingOrder(null);
//     setEditStatus("");
//   };

//   if (loading) return <p className="p-8">Loading orders...</p>;

//   return (
//     <div className="p-8 space-y-8">
//       <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

//       {/* Create New Order */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Create New Order</CardTitle>
//         </CardHeader>
//         <CardContent className="flex gap-4">
//           <Input
//             placeholder="Customer name"
//             value={newCustomer}
//             onChange={(e) => setNewCustomer(e.target.value)}
//           />
//           <Input
//             placeholder="Status"
//             value={newStatus}
//             onChange={(e) => setNewStatus(e.target.value)}
//           />
//           <Input
//             placeholder="Total"
//             type="number"
//             value={newTotal}
//             onChange={(e) => setNewTotal(e.target.value)}
//           />
//           <Button onClick={handleCreate}>Add Order</Button>
//         </CardContent>
//       </Card>

//       {/* Orders List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Orders List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2">Order ID</th>
//                 <th className="p-2">Customer</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Total</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id} className="border-t">
//                   <td className="p-2">{order.id}</td>
//                   <td className="p-2">{order.customer_name}</td>
//                   <td className="p-2">
//                     {editingOrder === order.id ? (
//                       <Input
//                         value={editStatus}
//                         onChange={(e) => setEditStatus(e.target.value)}
//                         placeholder="New status"
//                       />
//                     ) : (
//                       order.status
//                     )}
//                   </td>
//                   <td className="p-2">${order.total}</td>
//                   <td className="p-2 flex gap-2">
//                     {editingOrder === order.id ? (
//                       <>
//                         <Button size="sm" onClick={() => handleUpdate(order.id)}>
//                           Save
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => {
//                             setEditingOrder(null);
//                             setEditStatus("");
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => {
//                             setEditingOrder(order.id);
//                             setEditStatus(order.status);
//                           }}
//                         >
//                           Update
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDelete(order.id)}
//                         >
//                           Delete
//                         </Button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
