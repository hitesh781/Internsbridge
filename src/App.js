import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import Signup from "./Signup";
import CompanyPage from "./CompanyPage";
import Profile from "./Profile";
import Internships from "./Internships";
import StudentDashboard from "./StudentDashboard";
import ResumeBuilder from "./ResumeBuilder";
import "./App.css";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RoleRoute({ user, role, userRole, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (userRole !== role) {
    return (
      <div className="auth card-box">
        <h2>Access denied</h2>
        <p>This page is available only for {role} accounts.</p>
      </div>
    );
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole("");
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserRole(userSnap.data().role || "student");
      } else {
        // Fallback for old accounts created before role support.
        setUserRole("company");
      }
    };
    fetchUserRole();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-left brand-wrap">
          <Link to="/" className="logo">
            InternsBridge
          </Link>
          <div className="nav-menu">
            <Link to="/">Home</Link>
            <Link to="/internships">Internships</Link>
            <Link to="/resume">Resume</Link>
            {user && <Link to="/dashboard">Dashboard</Link>}
            {user && <Link to="/profile">Profile</Link>}
          </div>
        </div>
        <div className="nav-right">
          {!user ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/signup" className="register-btn">
                Register
              </Link>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/internships" element={<Internships />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              {userRole === "company" ? <Navigate to="/admin" replace /> : <Navigate to="/student" replace />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleRoute user={user} userRole={userRole} role="company">
              <Admin />
            </RoleRoute>
          }
        />
        <Route
          path="/student"
          element={
            <RoleRoute user={user} userRole={userRole} role="student">
              <StudentDashboard />
            </RoleRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/company/:name" element={<CompanyPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;