"use server";

import { parseWithZod } from "@conform-to/zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import AdminEmailTemplate from "@/features/contact/components/AdminEmailTemplate";
import CustomerEmailTemplate from "@/features/contact/components/CustomerEmailTemplate";
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

  const { error: errorA } = await resend.emails.send({
    from: from,
    to: [email],
    subject: "Thank you for your inquiry.",
    react: <CustomerEmailTemplate fullName={fullName} message={message} />,
  });

  const { error: errorB } = await resend.emails.send({
    from: from,
    replyTo: email,
    to: ["genta.ameku.work@gmail.com"],
    subject: "Thank you for your inquiry.",
    react: (
      <AdminEmailTemplate fullName={fullName} message={message} email={email} />
    ),
  });

  if (errorA || errorB) return { status: "error" as const };

  return { status: "success" as const };
}
