import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
// Auth Components
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

// Notebook Components
import AddNotebook from "./components/notebooks/AddNotebook";
import EditNotebook from "./components/notebooks/EditNotebook";
import ListNotebooks from "./components/notebooks/ListNotebooks";
import ViewNotebook from "./components/notebooks/ViewNotebook";

// Notes Components
import ListNotes from "./components/notes/ListNotes";
import ViewNote from "./components/notes/ViewNote";
import EditNote from "./components/notes/EditNote.tsx";

import ViewProfile from "./components/profile/ViewProfile.tsx";
import EditProfile from "./components/profile/EditProfile.tsx";
import { Theme } from "@radix-ui/themes";
import AddNote from "./components/notes/AddNote.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import DashboardLayout from "./components/layout/DashboardLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <Theme accentColor="iris" grayColor="sand" radius="large" scaling="95%">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />

          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Notebook Routes */}
            <Route path="/notebooks" element={<ListNotebooks />} />
            <Route path="/notebooks/add" element={<AddNotebook />} />
            <Route path="/notebooks/edit/:id" element={<EditNotebook />} />
            <Route path="/notebooks/view/:id" element={<ViewNotebook />} />

            {/* Notes Routes */}
            <Route path="/notes" element={<ListNotes notebookId="4fc1d3b5-f1b3-4a7e-9d71-4fccf1690ecf" />} />
            <Route path="/notes/add" element={<AddNote />} />
            <Route path="/notes/edit/:id" element={<EditNote />} />
            <Route path="/notes/view/:id" element={<ViewNote />} />

            {/* Profile Routes */}
            <Route path="/profile" element={<ViewProfile />} /> {/* Added generic profile route if needed, or map view/:id */}
            <Route path="/profile/view/:id" element={<ViewProfile />} />
            <Route path="/profile/edit/:id" element={<EditProfile />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    {/* <ThemePanel /> */}
  </Theme>
);
