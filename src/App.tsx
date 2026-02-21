import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminDataProvider } from "@/context/AdminDataContextSupabase";
import { BackToTop } from "@/components/BackToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Executives from "./pages/Executives";
import Alumni from "./pages/Alumni";
import AlumniProfile from "./pages/AlumniProfile";
import Merch from "./pages/Merch";
import MerchItem from "./pages/MerchItem";
import Feedback from "./pages/Feedback";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <AdminDataProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/executives" element={<Executives />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/alumni/:id" element={<AlumniProfile />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/merch/:id" element={<MerchItem />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsArticle />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    <BackToTop />
  </AdminDataProvider>
);

export default App;
