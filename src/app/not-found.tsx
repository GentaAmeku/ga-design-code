import Link from "next/link";
import Section from "@/components/Section";

const NotFoundPage = () => {
  return (
    <Section className="-mt-[var(--custom-header-height)]">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center gap-5">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl">Page not found</p>
        </div>
        <Link href="/" className="no-underline hover:underline">
          <p className="text-lg tracking-wider">Go Back Home</p>
        </Link>
      </div>
    </Section>
  );
};

export default NotFoundPage;
