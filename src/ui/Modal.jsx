import { GoX } from "react-icons/go";

function Modal({ isVisible, onClose, title, children }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-auto rounded-lg bg-white p-5 shadow-lg">
        <div className="flex flex-row items-center justify-between gap-20">
          <h2 className="text-center text-lg text-gray-600">{title}</h2>
          <button
            className="flex flex-row items-center rounded-xl border border-red-400 p-2 font-light transition-all duration-300 hover:bg-red-300"
            onClick={onClose}
          >
            Close
            <div className="text-2xl">
              <GoX />
            </div>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
