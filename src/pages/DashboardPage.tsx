import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { fetchWithAuth } from "../auth/api";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [protectedData, setProtectedData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth(
          `${process.env.REACT_APP_PRIVATE_API_URL}/protected`
        );
        const data = await response.json();
        setProtectedData(data.message);
      } catch (error) {
        console.error("Error fetching user protected data:", error);
        logout(); // Auto-logout if token invalid
      }
    };

    fetchData();
  }, [logout]);

  return (
    <div className="container">
      <h2>Welcome to the dashboard!</h2>
      <p>You are logged in as: {user?.name || "unknown user"}</p>
      <button onClick={() => logout()}>Logout</button>

      {protectedData && (
        <div className="protected-data">
          <p>Protected Data: {protectedData}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
