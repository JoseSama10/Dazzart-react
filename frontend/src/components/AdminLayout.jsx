import React from "react";
import SidebarAdmin from "./SidebarAdmin";
import "../Styles/App.css"; 


export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout d-flex">
      <SidebarAdmin />
      <div className="admin-content flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
}
