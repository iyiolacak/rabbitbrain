import Image from "next/image";
import React from "react";

const AuthCompleted = () => {
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="flex flex-row items-center space-x-1">
          <Image
            src={"/completed.png"}
            alt="Authentication completed."
            width={128}
            height={128}
            className="size-24"
          />
          <div className="h-full flex flex-col">
            <h2
              className={`scroll-m-20 text-2xl md:text-4xl font-serif font-bold tracking-tight transition-colors first:mt-0 md:mt-5 md:pb-1`}
            >
              You&apos;re hopping in!
            </h2>
          </div>
        </div>
      </div>
      <p className="absolute bottom-0 right-0 text-gray-400 text-sm mb-4 mr-4">
        Image by&nbsp;
        <a
          href="https://www.freepik.com/free-psd/check-symbol-isolated_44989283.htm#page=2&query=completed%20illustration&position=44&from_view=keyword&track=ais_hybrid&uuid=1ff0111c-3435-44cf-9723-7aea50c4abc6"
          className="text-gray-500"
        >
          Freepik
        </a>
      </p>
    </>
  );
};

export default AuthCompleted;
