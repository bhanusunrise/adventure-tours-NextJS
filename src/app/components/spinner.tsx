import React from "react";

export default function Spinner() {
    return (
        <>
            <div className="relative flex justify-center items-center h-screen">
                <div className="absolute animate-ping rounded-full h-32 w-32 border-8 border-yellow-500"></div>
                <img src="./logo.png" className=" h-28 w-28" />
            </div>
        </>
    );
}
