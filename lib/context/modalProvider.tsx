"use client";
import React, { ReactComponentElement, useMemo, useState } from "react";
import {
    ModalDispatch,
    ModalsDispatchContext,
    ModalsStateContext,
    ModalState,
} from "./modalContext";
import Modals from "@/components/Modals";

interface ModalsProviderProps {
    children: React.ReactNode;
}

const ModalsProvider = ({ children }: ModalsProviderProps) => {
    const [openModals, setOpenModals] = useState<ModalState[]>([]);
    const open = ({ Component, props }: ModalState) => {
        setOpenModals((modals) => [...modals, { Component, props }]);
    };

    const close = () => {
        setOpenModals((modals) => modals.slice(0, modals.length - 1));
    };

    const dispatch = useMemo<ModalDispatch>(() => ({ open, close }), []);
    return (
        <ModalsStateContext.Provider value={openModals}>
            <ModalsDispatchContext.Provider value={dispatch}>
                {children}
                <Modals />
            </ModalsDispatchContext.Provider>
        </ModalsStateContext.Provider>
    );
};
export default ModalsProvider;
