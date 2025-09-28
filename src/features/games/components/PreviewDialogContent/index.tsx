"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DialogContent } from "@/components/ui/dialog";

type PreviewDialogContentProps = {
  children: React.ReactNode;
};

const PreviewDialogContent = ({ children }: PreviewDialogContentProps) => {
  const router = useRouter();
  const handleOnPointerDownOutside = () => router.back();
  const handleOnClickCloseButton = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    router.back();
  };
  return (
    <DialogContent
      className="sm:max-w-2xl"
      onPointerDownOutside={handleOnPointerDownOutside}
      showCloseButton={false}
    >
      {children}
      <DialogPrimitive.Close
        data-slot="dialog-close"
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        onClick={handleOnClickCloseButton}
      >
        <XIcon />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogContent>
  );
};

export default PreviewDialogContent;
