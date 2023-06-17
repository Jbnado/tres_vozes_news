import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AdminNewsPage,
  HomePage,
  NewsPage,
  NotFoundPage,
  ReadNewsPage,
  SignIn,
  SignUp,
  TopicPage,
} from "./ui";
import "./index.css";
import { HeaderComponent } from "./ui/components";
import { AuthProvider, PrivateRoute } from "./context";

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
          <HeaderComponent />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:newsId" element={<ReadNewsPage />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="topics" element={<TopicPage />} />
              <Route path="adm-news" element={<AdminNewsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
