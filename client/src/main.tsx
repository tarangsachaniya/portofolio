import { createRoot } from "react-dom/client";
import App from "./App";
// Self-hosted, latin-only subsets so there is no third-party font request on first paint.
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
