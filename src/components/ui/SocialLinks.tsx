import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { personalInfo } from "../../data/personal";
const links = [
 { href: personalInfo.githubUrl, label: "GitHub de Eduarda", icon: Github },
 { href: personalInfo.linkedinUrl, label: "LinkedIn de Eduarda", icon: Linkedin },
 { href: personalInfo.whatsappUrl, label: "WhatsApp de Eduarda", icon: MessageCircle },
 { href: `mailto:${personalInfo.email}`, label: "Enviar e-mail para Eduarda", icon: Mail }
];
export function SocialLinks() { return <div className="flex gap-3">{links.map(({href,label,icon:Icon}) => <a key={label} href={href} {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })} aria-label={label} className="icon-btn"><Icon size={20}/></a>)}</div> }
