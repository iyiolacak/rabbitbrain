import React from "react";

const Divider = () => {
  return (
    <div className="my-3 flex w-full items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-2 text-xs font-medium tracking-wide text-slate-500">
        or
      </span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;
