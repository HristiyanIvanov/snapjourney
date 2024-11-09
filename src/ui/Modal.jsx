import { GoX } from "react-icons/go";

function Modal({ isVisible, onClose, title, children }) {
  if (!isVisible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleBackdropClick}
    >
      <div className="w-auto rounded-lg bg-white p-5 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:shadow-gray-900/50">
        <div className="flex flex-row items-center justify-between gap-20 pb-2">
          <h2 className="text-center text-lg text-gray-600 dark:text-gray-300">
            {title}
          </h2>
          <button
            className="flex flex-row items-center rounded-xl border border-red-400 p-2 font-light transition-all duration-300 hover:bg-red-300 dark:bg-red-600 dark:hover:bg-red-700"
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
