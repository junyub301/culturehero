import { createContext } from "react";

export interface ModalState {
    Component: any;
    props?: any;
}

export interface ModalDispatch {
    open: ({ Component, props }: ModalState) => void;
    close: () => void;
}

export const ModalsDispatchContext = createContext<ModalDispatch>({
    open: () => {},
    close: () => {},
});
export const ModalsStateContext = createContext<ModalState[]>([]);
