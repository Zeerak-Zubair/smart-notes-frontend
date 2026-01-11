import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
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

createRoot(document.getElementById("root")!).render(
  <Theme accentColor="iris" grayColor="sand" radius="large" scaling="95%">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Folder Routes */}
        <Route path="/folders" element={<ListFolders />} />
        <Route path="/folders/add" element={<AddFolder />} />
        <Route path="/folders/edit/:id" element={<EditFolder />} />
        <Route path="/folders/view/:id" element={<ViewFolders />} />

        {/* Notebook Routes */}
        <Route path="/notebooks" element={<ListNotebooks />} />
        <Route path="/notebooks/add" element={<AddNotebook />} />
        <Route path="/notebooks/edit/:id" element={<EditNotebook />} />
        <Route path="/notebooks/view/:id" element={<ViewNotebook />} />

        {/* Notes Routes */}
        <Route path="/notes" element={<ListNotes />} />
        <Route path="/notes/add" element={<AddNote />} />
        <Route path="/notes/edit/:id" element={<EditNote />} />
        <Route path="/notes/view/:id" element={<ViewNote />} />

        {/* Profile Routes */}
        <Route path="/profile/view/:id" element={<ViewProfile />} />
        <Route path="/profile/edit/:id" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
    {/* <ThemePanel /> */}
  </Theme>
);
