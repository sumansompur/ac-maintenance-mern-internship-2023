import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Admin from "./components/admin/Admin";
import Customer from "./components/customer/Customer";

const Dashboard = () => {
  const auth = useAuthUser();
  let displayComponent = auth().isAdmin ? <Admin /> : <Customer />;

  return (
    <div className="container my-5 text-center">
      <h3 className="font-weight-bold mb-4 text-white">Hello {auth().name}</h3>
      <p className="lead text-white mb-4">What would you like to do today?</p>
      {displayComponent}
    </div>
  );
};

export default Dashboard;
