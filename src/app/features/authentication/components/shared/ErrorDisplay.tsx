import React from "react";
import { AlertCircleIcon } from "lucide-react";
import { ClerkAPIError } from "@clerk/types";

interface ErrorDisplayProps {
  errors: ClerkAPIError[] | string | undefined;
  className?: string;
  alertIcon?: boolean;
}

const ErrorDisplay = ({
  errors,
  className,
  alertIcon = true,
}: ErrorDisplayProps) => {
  if (!errors) return null;

  const renderError = (error: ClerkAPIError | string, index: number) => (
    <div
      key={index}
      className="flex flex-row items-center p-2 text-red-600"
    >
      {alertIcon && <AlertCircleIcon className="mr-2" size={18} />}
      <p className="text-sm font-medium">
        {typeof error === 'string' ? error : error.longMessage || error.message}
      </p>
    </div>
  );

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {Array.isArray(errors)
        ? errors.map((error, index) => renderError(error, index))
        : renderError(errors, 0)}
    </div>
  );
};

export default ErrorDisplay;
