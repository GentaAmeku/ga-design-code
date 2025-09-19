import type * as React from "react";

interface AdminEmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const AdminEmailTemplate: React.FC<
  Readonly<AdminEmailTemplateProps>
> = ({ fullName, email, message }) => (
  <div>
    <h1>New Inquiry Received</h1>
    <p>Name: {fullName}</p>
    <p>Email: {email}</p>
    <p>Message:</p>
    <p>{message}</p>
  </div>
);

export default AdminEmailTemplate;
