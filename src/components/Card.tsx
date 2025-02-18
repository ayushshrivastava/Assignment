import React from "react";

export default function Card ({children}){
    return (
          <div className=" border-2 border-gray-300
          rounded-2xl shadow-blue-200 p-4 w-80 ease-in-out mt-4 ">
            {children}
          </div>
    )
}