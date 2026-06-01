import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import SolicitarOrcamento from "./pages/SolicitarOrcamento";
import Pedidos from "./pages/Pedidos";
import Feedback from "./pages/Feedback";
import Layout from "./components/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalogo" component={Catalogo} />
      <Route path="/solicitar-orcamento" component={SolicitarOrcamento} />
      <Route path="/solicitar-orcamento/:prestadorId" component={SolicitarOrcamento} />
      <Route path="/pedidos" component={Pedidos} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Layout>
            <Router />
          </Layout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
