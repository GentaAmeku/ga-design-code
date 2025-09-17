"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { submitContactForm } from "@/features/contact/actions";
import {
  type ContactFormFieldSchema,
  contactSchema,
} from "@/features/contact/schema";

export const useContactForm = () => {
  const [lastResult, action, isPending] = useActionState(
    submitContactForm,
    undefined,
  );

  const [form, fields] = useForm<ContactFormFieldSchema>({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
  });

  return {
    form,
    fields,
    isPending,
    lastResult,
    action,
  };
};
