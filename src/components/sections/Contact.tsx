import { FormEvent, useState } from "react";
import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { personalInfo } from "../../data/personal";
import { SectionTitle } from "../ui/SectionTitle";
import { ScrollReveal } from "../ui/ScrollReveal";

const contacts = [
  { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: MessageCircle, label: personalInfo.phone, href: personalInfo.whatsappUrl },
  { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedinUrl },
  { icon: Github, label: "GitHub", href: personalInfo.githubUrl }
];

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
const hasFormspreeEndpoint = Boolean(formspreeEndpoint && /^https:\/\/formspree\.io\/f\/[\w-]+$/.test(formspreeEndpoint));

type FormStatus = "idle" | "sending" | "success" | "error" | "unconfigured";

async function sendMessage(event: FormEvent<HTMLFormElement>, setStatus: (status: FormStatus) => void) {
  event.preventDefault();
  const form = event.currentTarget;

  if (!hasFormspreeEndpoint || !formspreeEndpoint) {
    setStatus("unconfigured");
    return;
  }

  setStatus("sending");
  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Form submission failed");
    form.reset();
    setStatus("success");
  } catch {
    setStatus("error");
  }
}

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const statusMessages: Record<Exclude<FormStatus, "idle">, string> = {
    sending: "Enviando sua mensagem…",
    success: "Mensagem enviada. Obrigada pelo contato!",
    error: "Não consegui enviar agora. Tente novamente ou fale comigo pelo WhatsApp.",
    unconfigured: "O envio direto ainda está sendo configurado. Você pode falar comigo pelo WhatsApp enquanto isso."
  };
  const statusMessage = status === "idle" ? undefined : statusMessages[status];

  return (
    <section id="contato">
      <div className="container">
        <SectionTitle eyebrow="Contato" title="Vamos conversar sobre tecnologia?" text="Estou aberta a oportunidades de estágio, vagas júnior, desenvolvimento e suporte de TI." />
        <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
          <ScrollReveal direction="left">
            <div className="card animated-panel p-6">
              <div className="space-y-4">
                {contacts.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })} className="contact-link">
                    <Icon size={20} aria-hidden="true" /><span>{label}</span>
                  </a>
                ))}
                <p className="contact-link"><MapPin size={20} aria-hidden="true" /><span>{personalInfo.location}</span></p>
              </div>
              <a className="btn-primary mt-7 w-full justify-center" href={personalInfo.whatsappMessageUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />Falar pelo WhatsApp</a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <form className="card animated-panel grid gap-4 p-6" onSubmit={(event) => void sendMessage(event, setStatus)}>
              <p className="form-intro">Envie uma mensagem diretamente por este formulário.</p>
              <label className="form-honeypot" aria-hidden="true">Não preencher<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
              <label>Nome<input required name="name" minLength={2} autoComplete="name" /></label>
              <label>E-mail<input required name="email" type="email" autoComplete="email" /></label>
              <label>Assunto<input required name="_subject" minLength={3} /></label>
              <label>Mensagem<textarea required name="message" minLength={10} rows={5} /></label>
              <button className="btn-primary justify-center" type="submit" disabled={status === "sending"}>
                <Mail size={18} aria-hidden="true" />{status === "sending" ? "Enviando…" : "Enviar mensagem"}
              </button>
              {statusMessage && <p role="status" aria-live="polite" className={`form-status ${status === "success" ? "is-success" : ""}`}>{statusMessage}</p>}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
