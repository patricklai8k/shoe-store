import React from 'react';
import { CloseButton } from '../closeButton/CloseButton';
import './style.css';

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({children, onClose}) => {
    return (
        <div className="modal-container">
            <div className="modal">
                <CloseButton onClick={() => {onClose()}} />
                {children}
            </div>
        </div>
    );
};
