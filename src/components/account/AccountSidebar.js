import React from "react";
import { useNavigate } from "react-router-dom";

function AccountSidebar({ activeTab, setActiveTab, signOut }) {
  const navigate = useNavigate();

  // Sidebar menu items with labels and unique keys
  const menuItems = [
    { label: "👤 Profile Info", key: "profile" },
    { label: "🛡️ Change Password", key: "password" },
    { label: "📍 Address", key: "address" },
    { label: "💳 Payment Info", key: "payment" },
    { label: "🛒 Purchases", key: "purchases" },
  ];

  // Handle tab selection and update the URL
  const handleClick = (key) => {
    setActiveTab(key);
    navigate(`/myaccount?tab=${key}`);
  };

  return (
    <div className="w-64 p-4 space-y-2">
      {/* Render account navigation buttons */}
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleClick(item.key)}
          className={`block w-full text-left px-4 py-2 rounded-lg transition ${
            activeTab === item.key
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {item.label}
        </button>
      ))}

      {/* Optional Sign Out button */}
      {signOut && (
        <button
          onClick={signOut}
          className="block w-full text-left px-4 py-2 rounded-lg transition text-gray-700 hover:bg-gray-200 mt-2"
        >
          🔓 Sign Out
        </button>
      )}
    </div>
  );
}

export default AccountSidebar;
