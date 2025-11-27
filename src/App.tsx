import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ExplorarBlocos from "./pages/ExplorarBlocos";
import BlocosLiquidez from "./pages/BlocosLiquidez";
import Relatorios from "./pages/Relatorios";
import PainelGestora from "./pages/PainelGestora";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explorar" element={<ExplorarBlocos />} />
            <Route path="/blocos" element={<BlocosLiquidez />} />
            <Route path="/blocos/:blockId" element={<BlocosLiquidez />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/gestora" element={<PainelGestora />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
