import { Moon, Sun } from "lucide-react";
export function ThemeToggle({ theme, onToggle }: { theme: "dark"|"light"; onToggle: () => void }) {
 return <button type="button" onClick={onToggle} className="icon-btn" aria-label={`Ativar tema ${theme === "dark" ? "claro" : "escuro"}`}>{theme === "dark" ? <Sun size={19}/> : <Moon size={19}/>}</button>
}
