import React from "react";
import { AlertCircleIcon } from "lucide-react";
import { AuthError} from "../types";

type Errors = Record<string, AuthError> | AuthError[];
type ErrorDisplayProps = {
  errors: Errors | null;
  className?: string;
  alertIcon?: boolean;
};

const renderError = (error: AuthError, index: number) => (
  <div key={index} className="flex flex-row items-center p-2 text-red-600">
    {AlertCircleIcon && <AlertCircleIcon className="mr-2" size={18} />}
    <p className="text-sm font-medium">{error.longMessage || error.message}</p>
  </div>
);
const ErrorDisplay = ({
  errors,
  className = "",
  alertIcon = true,
}: ErrorDisplayProps) => {
  if (!errors) return null;
  const errorArray = Array.isArray(errors) ? errors : Object.values(errors);

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {errorArray.map((error, index) => renderError(error, index))}
    </div>
  );
};

export default ErrorDisplay;
