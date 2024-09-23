import React from "react";

const Footer = () => {
  return (
    <div className="mt-8 py-24 bg-black border-t border-white/15">
      <style>
        {`
          .dynamic-text {
            font-family: 'JetBrains Mono', monospace;
            display: inline-block;
            animation: blink 1s steps(2, start) infinite;
          }

          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }

          .link {
            position: relative;
            font-family: 'JetBrains Mono', monospace;
            color: #b3b3b3;
            text-decoration: none;
            transition: color 0.2s ease, transform 0.2s ease;
          }

          .link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background: #b3b3b3;
            bottom: -2px;
            left: 0;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
          }

          .link:hover {
            color: #ffffff;
            transform: translateX(5px);
          }

          .link:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
        `}
      </style>

      <div className="flex flex-row px-12 w-full justify-between items-center">
        {/* Left side: Text */}
        <div className="text-start text-xl text-zinc-700 font-sans">
          You Scrolled This Far. What&apos;s Next? <br />
          <span className="font-mono text-zinc-200">
            explore the unknown<span className="dynamic-text">_</span>
          </span>
        </div>

        {/* Right side: Creative Links */}
        <div className="text-white space-x-6">
          <a href="/down-the-rabbit-hole" className="link">
            Down the Rabbit Hole{" "}
          </a>
          <a href="/find-your-path" className="link">
            Unlock a Challenge{" "}
          </a>
          <a href="/unlock-a-challenge" className="link">
            Find Your Path{" "}
          </a>
          <a href="/connect-the-dots" className="link">
            Build a Challenge{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
