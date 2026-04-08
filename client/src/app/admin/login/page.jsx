"use client";

import AdminLoginModal from "@/components/AdminLoginModal";

export default function AdminLoginPage() {
  return <AdminLoginModal onClose={() => (window.location.href = "/")} />;
}
