"use server";

import { parseWithZod } from "@conform-to/zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import EmailTemplate from "@/features/contact/components/EmailTemplate";
import { contactSchema } from "@/features/contact/schema";
import { ratelimit } from "@/lib/radis";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function submitContactForm(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: contactSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return { status: "error" as const };
  }

  const { fullName, message, email } = submission.value;

  const from = process.env.RESEND_DOMAIN
    ? `${process.env.RESEND_FROM_NAME} <noreply@${process.env.RESEND_DOMAIN}>`
    : "onboarding@resend.dev";

  const { error } = await resend.emails.send({
    from: from,
    replyTo: email,
    to: ["genta.ameku.work@gmail.com"],
    subject: "Thank you for your inquiry.",
    react: <EmailTemplate fullName={fullName} message={message} />,
  });

  if (error) return { status: "error" as const };

  return { status: "success" as const };
}
