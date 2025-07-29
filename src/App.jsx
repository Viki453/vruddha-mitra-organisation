import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Vruddha from "./pages/Vruddha";
import Vruddhas from "./pages/Vruddhas";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import Users from "./pages/Users";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "var(--color-base-300)",
              color: "var(--color-base-content)",
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="booking/:id" element={<Booking />} />
              <Route path="checkout/:id" element={<Checkout />} />
              <Route path="users" element={<Users />} />
              <Route path="signup" element={<Signup />} />
              <Route path="vruddhas/:id" element={<Vruddha />} />
              <Route path="vruddhas" element={<Vruddhas />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
