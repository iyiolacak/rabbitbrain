import React from "react";
import { AlertCircleIcon } from "lucide-react";
import { NormalizedAPIError } from "../types";

type ErrorDisplayProps = {
  error: NormalizedAPIError;
  className?: string;
  alertIcon?: boolean;
};

const APIErrorComponent: React.FC<ErrorDisplayProps> = ({
  error,
  className,
  alertIcon = true,
}) => {
  return (
    <div className={`flex items-center space-x-2 text-red-600 ${className}`}>
      {alertIcon && <AlertCircleIcon size={18} className="shrink-0" />}
      <p className="text-sm font-medium">
        {error.longMessage || error.message}
      </p>
    </div>
  );
};

export default APIErrorComponent;
