"use client";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { copy } from "@/features/content/copy";
import { contactEmail } from "@/features/content/data";
import type { Locale } from "@/lib/locale";
export default function ContactSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const address = contactEmail ?? "hello@example.com";
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };
  return (
    <Section id="contact">
      <SectionHeading title="Contact" lead={t.contactLead} />
      <div className="contact-content">
        <div className="contact-address">
          <span>{address}</span>
          <button
            type="button"
            className="icon-link"
            onClick={copyAddress}
            aria-label={t.copyEmail}
          >
            {status === "copied" ? <Check size={20} /> : <Copy size={20} />}
          </button>
          {contactEmail ? (
            <a
              className="icon-link"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.gmail}
            >
              <Mail size={22} />
            </a>
          ) : (
            <button
              type="button"
              className="icon-link"
              disabled
              aria-label={t.gmail}
              title={t.emailPending}
            >
              <Mail size={22} />
            </button>
          )}
        </div>
        {!contactEmail && <p className="sample-note mt-4">{t.sampleEmail}</p>}
        <p role="status" className="text-sm min-h-10 mt-3">
          {status === "copied"
            ? t.copied
            : status === "error"
              ? t.copyFailed
              : ""}
        </p>
      </div>
    </Section>
  );
}
