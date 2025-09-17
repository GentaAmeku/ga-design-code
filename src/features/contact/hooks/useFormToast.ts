import type { SubmissionResult } from "@conform-to/react";
import { useEffect } from "react";
import { toast } from "sonner";

type useFormToastProps = {
  lastResult?: SubmissionResult<string[] | undefined>;
};

export const useFormToast = ({ lastResult }: useFormToastProps) => {
  useEffect(() => {
    if (lastResult?.status === "success") {
      toast.success("Message sent!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    }
    if (lastResult?.status === "error") {
      toast.error("Failed to send", {
        description: "Please try again later.",
      });
    }
  }, [lastResult]);
};
