import Link from "next/link";

type ConditionalLinkProps = {
  condition?: boolean;
  children: React.ReactNode;
  linkProps: Omit<React.ComponentProps<typeof Link>, "children">;
};

const ConditionalLink = ({
  condition,
  linkProps,
  children,
}: ConditionalLinkProps) => {
  return condition ? <Link {...linkProps}>{children}</Link> : children;
};

export default ConditionalLink;
