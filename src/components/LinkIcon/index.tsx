import Link from "next/link";
import { Button } from "@/components/ui/button";

type LinkIconProps = {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
};

const LinkIcon = ({ children, href, isExternal }: LinkIconProps) => {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    </Button>
  );
};

export default LinkIcon;
