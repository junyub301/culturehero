"use client";
import { ModalsDispatchContext, ModalsStateContext } from "@/lib/context/modalContext";
import Router from "next/router";

import { useContext, useEffect } from "react";

const Modals = () => {
    const openModals = useContext(ModalsStateContext);
    const { close } = useContext(ModalsDispatchContext);

    return (
        <>
            {openModals.map((modal, index) => {
                const { Component, props } = modal;
                return <Component key={index} {...props} onClose={() => close()} />;
            })}
        </>
    );
};
export default Modals;
