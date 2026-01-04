import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";

function App() {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
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
    await supabase.auth.signOut();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!session ? <Auth /> : <Dashboard onClick={logout} />}
        />
        <Route
          path="/dashboard"
          element={session ? <Dashboard onClick={logout} /> : <Auth />}
        />
      </Routes>
    </Router>
  );
}

export default App;
