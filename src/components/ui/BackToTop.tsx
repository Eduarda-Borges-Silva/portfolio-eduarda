import { ArrowUp } from "lucide-react";
export function BackToTop() { return <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})} className="icon-btn" aria-label="Voltar ao topo"><ArrowUp size={20}/></button> }
