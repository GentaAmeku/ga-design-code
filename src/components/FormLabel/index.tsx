import type * as LabelPrimitive from "@radix-ui/react-label";
import { Label } from "@/components/ui/label";

type FormLabelProps = {
  children: React.ReactNode;
  required?: boolean;
} & React.ComponentProps<typeof LabelPrimitive.Root>;

const FormLabel = ({ children, required, ...rest }: FormLabelProps) => {
  return (
    <Label className="text-base mb-3" {...rest}>
      {children}
      {required && <span className="text-error">*</span>}
    </Label>
  );
};

export default FormLabel;
