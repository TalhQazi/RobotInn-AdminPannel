import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import UsersPage from "@/pages/UsersPage";
import OrdersPage from "@/pages/OrdersPage";
import ProductsPage from "@/pages/ProductsPage";
import RevenuePage from "@/pages/RevenuePage";
import BillsPage from "@/pages/BillsPage";
import MessagesPage from "@/pages/MessagesPage";
import LocationsPage from "@/pages/LocationsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound.tsx";


const queryClient = new QueryClient();

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <DashboardLayout />;
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
