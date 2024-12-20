import React from "react";

// Sign In/Up with OAuth *"OR" divider component* 

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
