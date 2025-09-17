type ErrorMessageProps = {
  errorId: string;
  error?: string[] | undefined;
};

const ErrorMessage = ({ errorId, error }: ErrorMessageProps) => {
  if (!error) return null;
  return (
    <div id={errorId} className="mt-1.5 text-sm">
      <p className="text-error">{error}</p>
    </div>
  );
};

export default ErrorMessage;
