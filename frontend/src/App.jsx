/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Inputs from "./pages/Inputs";
import Guide from "./pages/Guide";
import LoadingSpinner from "./components/LoadingSpinner";
import AboutUs from "./pages/AboutUs";
import UserProfile from "./pages/UserProfile";
import Anyalytics from "./pages/Anyalytics";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Workflows from "./pages/admin/Workflows";
import GoogleGroups from "./pages/admin/GoogleGroups";
import AdminProfile from "./pages/admin/AdminProfile";

// Protect user routes (only for normal users)
const UserRoute = ({ children }) => {
  const { userAuth } = useContext(UserContext);

  if (!userAuth.isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (userAuth.user?.role === "admin") {
    return <Navigate to='/admin/dashboard' replace />;
  }

  return children;
};

// Protect admin routes (only for admins)
const AdminRoute = ({ children }) => {
  const { userAuth } = useContext(UserContext);

  if (!userAuth.isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (userAuth.user?.role !== "admin") {
    return <Navigate to='/' replace />;
  }

  return children;
};

// Redirect authenticated users to proper dashboards
const RedirectAuthenticatedUser = ({ children }) => {
  const { userAuth } = useContext(UserContext);

  if (userAuth.isAuthenticated) {
    if (userAuth.user?.role === "admin") {
      return <Navigate to='/admin/dashboard' replace />;
    }
    return <Navigate to='/' replace />;
  }

  return children;
};

function App() {
  const { userAuth, checkAuth } = useContext(UserContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (userAuth.isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        {/* User Routes */}
        <Route
          path='/'
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route
          path='/aboutus'
          element={
            <UserRoute>
              <AboutUs />
            </UserRoute>
          }
        />
        <Route
          path='/inputs'
          element={
            <UserRoute>
              <Inputs />
            </UserRoute>
          }
        />
        <Route
          path='/guide'
          element={
            <UserRoute>
              <Guide />
            </UserRoute>
          }
        />
        <Route
          path='/userprofile'
          element={
            <UserRoute>
              <UserProfile />
            </UserRoute>
          }
        />
        <Route
          path='/analytics'
          element={
            <UserRoute>
              <Anyalytics />
            </UserRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path='/admin'
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='workflows' element={<Workflows />} />
          <Route path='googlegroup' element={<GoogleGroups />} />
          <Route path='adminprofile' element={<AdminProfile />} />
        </Route>

        {/* Catch all */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
