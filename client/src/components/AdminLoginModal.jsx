"use client";

import { useState } from "react";

export default function AdminLoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("adminToken", data.token);
      window.location.href = "/admin/dashboard";
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Bubble card */}
      <div className="relative bg-white rounded-3xl shadow-xl p-8 w-full max-w-md animate-[scaleUp_0.3s_ease-out]">
        {/* Floating cancel button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-red-600 transition"
        >
          ✕
        </button>

        <h1 className="text-[#126936] font-bold mb-6 text-center text-xl">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 hover:ring hover:ring-[#126936] transition"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 hover:ring hover:ring-[#126936] transition"
              placeholder="***********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#126936] text-white py-2 rounded-md hover:bg-[#f4821f] hover:text-[#126936] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";

// export default function AdminLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (res.ok && data.token) {
//       localStorage.setItem("adminToken", data.token);
//       window.location.href = "/admin/dashboard";
//     } else {
//       alert(data.error || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
//         <h1 className="text-[#126936] font-bold mb-6 text-center">Admin Login</h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 hover:ring hover:ring-[#126936] transition"
//               placeholder="Login"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 hover:ring hover:ring-[#126936] transition"
//               placeholder="***********"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#126936] text-white py-2 rounded-md hover:bg-[#f4821f] hover:text-[#126936] transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
