"use client";

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
} from "@conform-to/react";

import FormLabel from "@/components/FormLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/features/contact/hooks/useContactForm";
import { useFormToast } from "@/features/contact/hooks/useFormToast";
import ErrorMessage from "./components/ErrorMessage";
import FormItemRow from "./components/FormItemRow";

const ContactForm = () => {
  const { form, fields, lastResult, action, isPending } = useContactForm();
  useFormToast({ lastResult });
  return (
    <form action={action} {...getFormProps(form)}>
      <div className="space-y-6 w-full flex flex-col items-center mt-20">
        <FormItemRow>
          <FormLabel htmlFor="fullName" aria-required required>
            Full Name
          </FormLabel>
          <Input {...getInputProps(fields.fullName, { type: "text" })} />
          <ErrorMessage
            errorId={fields.fullName.errorId}
            error={fields.fullName.errors}
          />
        </FormItemRow>
        <FormItemRow>
          <FormLabel htmlFor="email" aria-required required>
            Email Address
          </FormLabel>
          <Input {...getInputProps(fields.email, { type: "email" })} />
          <ErrorMessage
            errorId={fields.email.errorId}
            error={fields.email.errors}
          />
        </FormItemRow>
        <FormItemRow>
          <FormLabel htmlFor="email" aria-required required>
            Message
          </FormLabel>
          <Textarea
            rows={6}
            placeholder="Your message here..."
            {...getTextareaProps(fields.message)}
          />
          <ErrorMessage
            errorId={fields.message.errorId}
            error={fields.message.errors}
          />
        </FormItemRow>
      </div>
      <Button
        type="submit"
        className="mt-10 w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
};

export default ContactForm;
