import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Dashboard from "./pages/Dashboard";
import { RegistrationProvider } from "./contexts/RegistrationContext";

function Router() {
  const [currentSchool, setCurrentSchool] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // 解析 URL 查詢參數
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const school = params.get("school");
      const page = params.get("page");
      
      setCurrentSchool(school);
      setCurrentPage(page);
    };

    // 初始化解析
    handleLocationChange();

    // 監聽 popstate 與自訂的 location-change 事件
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("location-change", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("location-change", handleLocationChange);
    };
  }, []);

  // 路由分發
  if (currentPage === "dashboard") {
    return <Dashboard />;
  }

  if (currentSchool === "ling-liang" || currentSchool === "kam-lai") {
    return <Questionnaire schoolType={currentSchool} />;
  }

  return <Home />;
}

// 輔助導航函數，透過 URL 查詢參數進行無整理跳轉
export function navigateTo(path: string) {
  window.history.pushState({}, "", window.location.origin + window.location.pathname + path);
  const event = new Event("location-change");
  window.dispatchEvent(event);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <RegistrationProvider>
          <TooltipProvider>
            <Toaster position="top-center" />
            <Router />
          </TooltipProvider>
        </RegistrationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
