import React, { ReactNode } from "react";

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: ReactNode;
}) => {
  return (
    <div className="md:mb-6">
      <h2 className={`scroll-m-20 text-4xl font-serif font-bold tracking-tight transition-colors first:mt-0 md:mt-5 md:pb-1`}>
        {title}
      </h2>
      <h3 className="scroll-m-20 text-lg tracking-tight md:mt-1 md:text-xl">
        {subtitle}
      </h3>
    </div>
  );
};

export default SectionHeader;
