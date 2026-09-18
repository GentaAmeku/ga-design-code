type OpenCodeIconProps = {
  width?: number;
  height?: number;
  className?: string;
};

const OpenCodeIcon = ({
  width = 24,
  height = 24,
  className = "",
}: OpenCodeIconProps) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 42"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
    >
      <title>OpenCode</title>
      <path d="M18 30H6V18H18V30Z" fill="#CFCECD" />
      <path d="M18 12H6V30H18V12ZM24 36H0V6H24V36Z" fill="#656363" />
    </svg>
  );
};

export default OpenCodeIcon;
