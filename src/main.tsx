import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage, LoginPage, TopicPage } from "./ui";
import { AuthProvider } from "./context/auth-context";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/topics" Component={TopicPage} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
