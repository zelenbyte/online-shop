import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AccountSidebar from "../components/account/AccountSidebar";
import ProfileInfo from "../components/account/ProfileInfo";
import ChangePassword from "../components/account/ChangePassword";
import AddressInfo from "../components/account/AddressInfo";
import PaymentInfo from "../components/account/PaymentInfo";
import PurchaseInfo from "../components/account/PurchaseInfo";

/**
 * MyAccount page
 * Renders the account sidebar and displays the content based on the active tab.
 */
function MyAccount({ user, setUser, signOut }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  // Update active tab based on URL query param (e.g., ?tab=password)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location.search]);

  // Render the main content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo user={user} setUser={setUser} />;
      case "password":
        return <ChangePassword user={user} setUser={setUser} />;
      case "address":
        return <AddressInfo user={user} setUser={setUser} />;
      case "payment":
        return <PaymentInfo user={user} setUser={setUser} />;
      case "purchases":
        return <PurchaseInfo user={user} />;
      default:
        return <ProfileInfo user={user} setUser={setUser} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row md:space-x-8">
      {/* Sidebar with tabs */}
      <AccountSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        signOut={signOut}
      />

      {/* Main content area */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6 mt-6 md:mt-0">
        {renderContent()}
      </div>
    </div>
  );
}

export default MyAccount;
