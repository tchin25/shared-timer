import React from "react";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const DefaultFooter = () => {
  return (
    <footer className="text-gray-700 body-font md:h-24 h-48">
      <div className="absolute bottom-0 left-0 w-screen">
        <div className="container pt-5 pb-2 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img
              className="w-10 h-10 text-white p-px bg-white shadow-inner object-cover rounded-full"
              src="./santathomas.png"
            ></img>
            <span className="ml-3 text-md">
              A side project created by{" "}
              <a href="https://thomasch.in/" className="underline">
                Thomas Chin
              </a>
            </span>
          </div>
          <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2020
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://github.com/tchin25/shared-timer" className="underline">
            See the code on GitHub:
              <Icon className="ml-2 inline-block" path={mdiGithub} size={1}></Icon>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;
