import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, logout } from "../config/firebase";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user === null) navigate("/login");
  }, [user, loading]);

  return (
    <div>
      <h1>Hello, this is Dashboard pages</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
