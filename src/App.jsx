import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/Register.jsx";
import LoginForm from "./pages/Login.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import ForgotPasswordForm from "./pages/ForgotPassword.jsx";
import ResetPasswordForm from "./pages/ResetPassword.jsx";
import PageNotFound from "./ui/PageNotFound.jsx";
import Profile from "./pages/Profile.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="/" />} />
          <Route path="/" element={<AppLayout />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<RegisterForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
