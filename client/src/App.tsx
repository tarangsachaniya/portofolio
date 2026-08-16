import { Switch, Route } from "wouter";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { dur, ease } from "@/lib/motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    /*
     * reducedMotion="user" makes Framer Motion skip transform/layout animations
     * for users who asked for less motion (opacity and colour still animate).
     * It does NOT cover MotionValues bound straight to `style` — parallax, the
     * timeline beam, tilt and magnetic are gated by useReducedMotion() in
     * their own hooks.
     */
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: dur.base, ease: ease.out }}
    >
      {/*
       * `strict` makes any leftover `motion.*` throw at render, so a missed
       * migration is a loud error instead of a silent bundle regression.
       * domAnimation covers whileInView/hover/tap/exit + variants; only
       * drag/layout/layoutId would need domMax.
       */}
      <LazyMotion features={domAnimation} strict>
        <CustomCursor />
        <Router />
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
