import { Switch, Route } from "wouter";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Boot from "@/components/Boot";
import SmoothScroll from "@/components/SmoothScroll";
import { dur, ease } from "@/lib/motion";

export default function App() {
  return (
    // reducedMotion="user": Framer skips transforms for users who asked for
    // less motion. Scroll-bound values are gated in their own components.
    <MotionConfig reducedMotion="user" transition={{ duration: dur.base, ease: ease.out }}>
      <LazyMotion features={domAnimation} strict>
        <SmoothScroll />
        <Boot />
        {/* Relative-base builds (static previews) can't know their path: always Home. */}
        {import.meta.env.BASE_URL === "/" ? (
          <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <Home />
        )}
      </LazyMotion>
    </MotionConfig>
  );
}
