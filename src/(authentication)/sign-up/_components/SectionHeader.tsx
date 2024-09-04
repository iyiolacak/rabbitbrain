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
      <h2 className={`mt-5 scroll-m-20 text-2xl font-bold tracking-tight transition-colors first:mt-0 md:mt-10 md:pb-2 md:text-5xl`}>
        {title}
      </h2>
      <h3 className="scroll-m-20 text-lg font-normal tracking-tight md:mt-4 md:text-xl">
        {subtitle}
      </h3>
    </div>
  );
};

export default SectionHeader;
