import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.js";
import AuthLayout from "./features/auth/components/form/AuthLayout.js";
import "./index.css";
import DashboardPage from "./pages/DashboardPage.js";
import GoogleSuccess from "./pages/GoogleSuccess.js";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import { ProtectedRoute } from "./routeHandler/ProtectedRoute.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />

          <Route path="/auth" element={<AuthLayout />}>
            <Route
              path="login"
              element={
                  <LoginPage />
              }
            />
            <Route
              path="signup"
              element={
                  <SignupPage />
              }
            />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="/auth/google/success" element={<GoogleSuccess />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>,
);
