import { useContext } from "react";
import { ModalState, ModalsDispatchContext } from "./context/modalContext";

export default function useModal() {
    const { open, close } = useContext(ModalsDispatchContext);
    const openModal = ({ Component, props }: ModalState) => {
        open({ Component, props });
    };

    const closeModal = () => close();

    return { openModal, closeModal };
}
