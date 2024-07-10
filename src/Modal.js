import React from 'react';

const Modal = ({ open, onClose, children }) => {
  return (
    // backdrop
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}>
        <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded w-96">
            {children}
        </div>
    </div>
  );
};

export default Modal;
