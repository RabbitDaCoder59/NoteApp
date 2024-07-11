// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Editprofile from "./components/Editprofile";
import Searchui from "./components/404";
import NoteEditor from "./pages/NoteEditor";
import Notes from "./pages/Notes";
import Login from "./components/auth/Login";
import Footer from "./components/footer/Footer";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./routes/PrivateRoutes";
import { NotesProvider } from "./context/NotesContext";
import { LoadingProvider } from "./context/LoadingContext";

const App = () => {
  return (
    <LoadingProvider>
      <NotesProvider>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<Editprofile />} />
                <Route path="/notes/new" element={<NoteEditor />} />
                <Route path="/notes/:id" element={<Notes />} />
              </Route>
              <Route path="/*" element={<Searchui />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </NotesProvider>
    </LoadingProvider>
  );
};

export default App;