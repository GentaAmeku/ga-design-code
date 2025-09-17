type TextWithIconProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

const TextWithIcon = ({ icon, children }: TextWithIconProps) => {
  return (
    <div className="flex gap-1.5 items-center">
      {icon}
      <p className="text-lg">{children}</p>
    </div>
  );
};

export default TextWithIcon;
