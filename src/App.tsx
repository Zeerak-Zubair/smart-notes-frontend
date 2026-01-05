import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";
import AuthLayout from "./auth/components/AuthLayout";
import { getSession, signout } from "./services/supabase/auth.service";
import DashboardLayout from "./dashboard/components/DashboardLayout";

function App() {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await signout();
  };

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={!session ? <Auth /> : <Dashboard onClick={logout} />}
        />
        <Route
          path="/dashboard"
          element={session ? <Dashboard onClick={logout} /> : <Auth />}
        /> */}
        <Route
          path="/"
          element={
            !session ? <AuthLayout /> : <DashboardLayout logout={logout} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
