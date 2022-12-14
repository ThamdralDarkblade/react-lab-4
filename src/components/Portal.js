import { createPortal } from "react-dom";

const modalRootEl = document.querySelector('#modal');

export function Portal(props) {
    const { open, onClose } = props;
    return open ? createPortal(
        <div className="modal-background" onClick={onClose}>
            {props.children}
        </div>,
        modalRootEl
    ) : null;
}
