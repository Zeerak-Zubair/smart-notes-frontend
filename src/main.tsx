import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
// Auth Components
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

// Folder Components
import AddFolder from "./components/folders/AddFolder";
import EditFolder from "./components/folders/EditFolder";
import ListFolders from "./components/folders/ListFolders";
import ViewFolders from "./components/folders/ViewFolders";

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
import { Theme, ThemePanel } from "@radix-ui/themes";
import AddNote from "./components/notes/AddNote.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";

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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Folder Routes */}
        <Route path="/folders" element={<ProtectedRoute><ListFolders /></ProtectedRoute>} />
        <Route path="/folders/add" element={<ProtectedRoute><AddFolder /></ProtectedRoute>} />
        <Route path="/folders/edit/:id" element={<ProtectedRoute><EditFolder /></ProtectedRoute>} />
        <Route path="/folders/view/:id" element={<ProtectedRoute><ViewFolders /></ProtectedRoute>} />

        {/* Notebook Routes */}
        <Route path="/notebooks" element={<ProtectedRoute><ListNotebooks /></ProtectedRoute>} />
        <Route path="/notebooks/add" element={<ProtectedRoute><AddNotebook /></ProtectedRoute>} />
        <Route path="/notebooks/edit/:id" element={<ProtectedRoute><EditNotebook /></ProtectedRoute>} />
        <Route path="/notebooks/view/:id" element={<ProtectedRoute><ViewNotebook /></ProtectedRoute>} />

        {/* Notes Routes */}
        <Route path="/notes" element={<ProtectedRoute><ListNotes /></ProtectedRoute>} />
        <Route path="/notes/add" element={<ProtectedRoute><AddNote /></ProtectedRoute>} />
        <Route path="/notes/edit/:id" element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
        <Route path="/notes/view/:id" element={<ProtectedRoute><ViewNote /></ProtectedRoute>} />

        {/* Profile Routes */}
        <Route path="/profile/view/:id" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
        <Route path="/profile/edit/:id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    {/* <ThemePanel /> */}
  </Theme>
);
