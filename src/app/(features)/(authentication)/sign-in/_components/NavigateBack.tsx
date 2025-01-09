import { Button } from "@/components/ui/button";
import { NavArrowLeft } from "iconoir-react";
import React from "react";
interface NavigateBackProps {
    handleBack: () => void;
}
const NavigateBack: React.FC<NavigateBackProps> = (handleBack) => {
  return (
    <Button onClick={() => handleBack} variant="ghost">
      <NavArrowLeft />
    </Button>
  );
};

export default NavigateBack;
