import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const LegalTOSText = () => {
  return (
    <p className="mt-4 flex flex-row px-4 text-center text-xs text-gray-400">
      <Link
        href="/terms-of-service"
        className="flex flex-row items-center text-blue-700"
      >
        Terms of Service
      </Link>{" "}
      &nbsp;and&nbsp;
      <Link
        href={"/privacy-policy"}
        className="flex flex-row items-center text-blue-700"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
};

export default LegalTOSText
