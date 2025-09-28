import parse from "html-react-parser";
import { DialogDescription } from "@/components/ui/dialog";

type PreviewDialogDescriptionProps = {
  description: string;
};

const PreviewDialogDescription = async ({
  description,
}: PreviewDialogDescriptionProps) => {
  return (
    <DialogDescription
      asChild
      className="text-sm text-foreground leading-relaxed"
    >
      <article className="prose">{parse(description)}</article>
    </DialogDescription>
  );
};

export default PreviewDialogDescription;
