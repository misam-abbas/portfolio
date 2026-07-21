"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { SITE, SOCIAL_LINKS } from "@/constants/data";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(
          typeof json.error === "string" ? json.error : "Failed to send message."
        );
      }
      setStatus("sent");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project in mind, or just want to say hi? My inbox is open."
        />

        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-5">
          <div className="glass rounded-3xl p-8 lg:col-span-2">
            <h3 className="font-display text-lg font-semibold text-white">
              Get in touch
            </h3>
            <p className="mt-2 text-sm text-white/60">
              {SITE.availability}. Typically responds within 24 hours.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                data-cursor-hover
                className="flex items-center gap-3 text-white/70 hover:text-white"
              >
                <Mail className="h-4 w-4 text-[var(--color-cyan)]" /> {SITE.email}
              </a>
              <p className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4 text-[var(--color-cyan)]" /> {SITE.location}
              </p>
            </div>

            <div className="mt-8 flex gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/60 hover:border-white/30 hover:text-white"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass glow-border relative overflow-hidden rounded-3xl p-8 lg:col-span-3"
          >
            {/* Honeypot — hidden from real users, catches simple bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px]"
              aria-hidden="true"
              {...register("honeypot")}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-white/50">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none transition-colors focus:border-[var(--color-cyan)] sm:text-sm"
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs text-white/50">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none transition-colors focus:border-[var(--color-cyan)] sm:text-sm"
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="subject" className="mb-1.5 block text-xs text-white/50">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none transition-colors focus:border-[var(--color-cyan)] sm:text-sm"
                placeholder="Project inquiry"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-xs text-white/50">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none transition-colors focus:border-[var(--color-cyan)] sm:text-sm"
                placeholder="Tell me about your project…"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor-hover
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : status === "sent" ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Message sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send message
                </>
              )}
            </button>

            {status === "error" && (
              <p className="mt-3 text-center text-xs text-red-400">{errorMsg}</p>
            )}
            {status === "sent" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-center text-xs text-emerald-400"
              >
                Thanks — I&apos;ll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
