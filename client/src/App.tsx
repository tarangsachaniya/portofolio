import { useState } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "@/components/Splash";
import CustomCursor from "@/components/CustomCursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <TooltipProvider>
      <CustomCursor />
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
