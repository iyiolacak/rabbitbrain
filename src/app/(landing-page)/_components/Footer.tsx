import React from "react";
import Link from "next/link";

const links = [
  { href: "/about", label: "Down the Rabbit Hole" },
  { href: "/explore", label: "Unlock a Challenge" },
  { href: "/browse-categories", label: "Find Your Path" },
  { href: "/build", label: "Build a Challenge" },
];

const Footer = () => {
  return (
    <div className="w-full flex-grow h-full justify-center flex-col py-24 bg-zinc-300">
      <style jsx>{`
        .dynamic-text {
          font-family: "JetBrains Mono", monospace;
          display: inline-block;
          animation: blink 1s steps(2, start) infinite;
        }

        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .link {
          position: relative;
          font-family: "JetBrains Mono", monospace;
          color: #555;
          text-decoration: none;
          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }

        .link::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background: #000;
          bottom: -2px;
          left: 0;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .link:hover {
          color: #000;
          transform: translateX(5px);
        }

        .link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 pb-10 md:pb-0">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-start items-center ">
          {/* Left side: Text */}
          <div className="text-center md:text-start text-xl text-zinc-500 font-sans mb-6 md:mb-0">
            You Scrolled This Far. What&apos;s Next? <br />
            <span className="font-mono text-black">
              explore the unknown<span className="dynamic-text">_</span>
            </span>
          </div>

          {/* Right side: Creative Links */}
          <div className="">
            <div className=" flex flex-col space-y-3 md:space-y-4 items-center md:items-end">
              {links.map(({ href, label }) => (
                <Link key={href} href={href} aria-disabled>
                  <p className="link">{label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
