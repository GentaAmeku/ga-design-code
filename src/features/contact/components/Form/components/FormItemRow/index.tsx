type FormItemRowProps = {
  children: React.ReactNode;
};

const FormItemRow = ({ children }: FormItemRowProps) => {
  return <div className="flex flex-col w-full max-w-md">{children}</div>;
};

export default FormItemRow;
