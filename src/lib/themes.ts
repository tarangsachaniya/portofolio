export const THEMES = [
  { id: "paper", label: "Paper", hint: "Editorial", glyph: "¶", key: "1" },
  { id: "vscode", label: "VS Code", hint: "Editor", glyph: "{ }", key: "2" },
  { id: "terminal", label: "Terminal", hint: "CRT shell", glyph: ">_", key: "3" },
  { id: "keyboard", label: "Keyboard", hint: "Mechanical", glyph: "⌨", key: "4" },
  { id: "chat", label: "Chat", hint: "AI assistant", glyph: "✦", key: "5" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export const THEME_IDS = THEMES.map((t) => t.id) as ThemeId[];
export const DEFAULT_THEME: ThemeId = "paper";
export const STORAGE_KEY = "tarang-theme";

/** Runs before first paint (inlined in <head>). Keep it tiny and dependency-free. */
export const themeBootScript = `(function(){try{var d=document.documentElement,u=new URLSearchParams(location.search).get('theme'),s=localStorage.getItem('${STORAGE_KEY}'),ok=${JSON.stringify(
  ["paper", "vscode", "terminal", "keyboard", "chat"],
)};var t=ok.indexOf(u)>-1?u:ok.indexOf(s)>-1?s:'${DEFAULT_THEME}';d.dataset.theme=t;if(u&&ok.indexOf(u)>-1)localStorage.setItem('${STORAGE_KEY}',u);d.dataset.sound=localStorage.getItem('tarang-sound')==='on'?'on':'off'}catch(e){document.documentElement.dataset.theme='${DEFAULT_THEME}'}})();`;
