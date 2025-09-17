import type * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  message,
}) => (
  <div>
    <h1>Hello.{fullName}</h1>
    <h2>Thank you for your inquiry.</h2>
    <p>We have received your message with the following content:</p>
    <p>{message}</p>
  </div>
);

export default EmailTemplate;
