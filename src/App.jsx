import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserProvider";
import Login from "./components/login";
import Info from "./components/info";
import "./App.css";
import Kyc from "./Kyc-form/Kyc";
import Dashboard from './pages/Dashboard.jsx';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile.jsx';
import Level from './pages/Level.jsx';
import Wallet from './pages/Wallet.jsx';
import WithdrawRequest from './pages/WithdrawRequest.jsx';
import PaymentHistory from './pages/PaymentHistory.jsx';
// import Rewards from './pages/Rewards';
import ForgotPassword from './components/forgotPassword';
import Activate from "./components/activate";
import AdminSidebar from "./components/AdminSidebar";

// Placeholder components for the admin pages
import AdminRegister from './components/adminRegister'
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"
// import ProfileUpdate from './pages/ProfileUpdate.jsx';
import AdminLevels from './pages/AdminLevel';
import AdminWithdrawReq from './pages/AdminWithdrawReq';
import AcActivation from './pages/AcActivation/AcActivation';
import AdminPayHistory from './pages/AdminPayHistory.jsx';
import Settings from './pages/Settings.jsx';
import MemberStatus from './pages/MemberStatus.jsx';
import MemberDetails from './pages/MemberDetails.jsx';
import Adminpanel from './pages/Adminpanel.jsx';
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleSetRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole); // Store the role in local storage
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // Load the role from local storage when the component mounts


  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/userRegister" element={<Kyc />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/userLogin" element={<Login setRole={handleSetRole} />} />
          <Route path="/adminLogin" element={<AdminLogin setRole={handleSetRole} />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/activate/:activationToken" element={<Activate />} />
          <Route path="/verifyRandomString/:randomString" element={<ResetPassword />} />
        </Routes>


        {role === "user" && (
          <Sidebar>
            <Routes>
              <Route path="/userDashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/level" element={<Level />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/withdrawRequest" element={<WithdrawRequest />} />
              <Route path="/paymentHistory" element={<PaymentHistory />} />
            </Routes>
          </Sidebar>
        )}
        {role === "admin" && (
          <AdminSidebar>
            <Routes>
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              {/* <Route path="/profileupdates" element={<ProfileUpdate />} /> */}
              <Route path="/adminLevels" element={<AdminLevels />} />
              <Route path="/withdrawReq" element={<AdminWithdrawReq />} />
              <Route path="/accountactivation" element={<AcActivation />} />
              <Route path="/adminpaymentHistory" element={<AdminPayHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/memberstatus" element={<MemberStatus />} />
              <Route path="/memberdetails" element={<MemberDetails />} />
              <Route path="/adminpanel" element={<Adminpanel />} />
            </Routes>
          </AdminSidebar>
        )}
      </Router>
    </UserProvider>
  );
}

export default App;
