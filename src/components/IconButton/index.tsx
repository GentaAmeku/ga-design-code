import { Button } from "@/components/ui/button";

const IconButton = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <Button variant="ghost" size="icon">
      {icon}
    </Button>
  );
};

export default IconButton;
