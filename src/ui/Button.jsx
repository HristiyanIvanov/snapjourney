function Button({ children, onClick, color = "teal", disabled }) {
  const colorClasses = {
    teal: "border-teal-500 bg-teal-300 hover:bg-teal-400 dark:bg-teal-600 dark:hover:bg-teal-700",
    gray: "border-gray-500 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700",
    red: "border-red-500 bg-red-300 hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-700",
    orange:
      "border-orange-500 bg-orange-300 hover:bg-orange-400 dark:bg-orange-600 dark:hover:bg-orange-700",
    borderRed:
      "border-red-400 hover:bg-red-300 dark:bg-red-600 dark:hover:bg-red-700",
    borderOrange:
      "border-orange-400 hover:bg-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700",
    borderGray:
      "border-gray-400 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700",
    borderTeal:
      "border-teal-400 hover:bg-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700",
  };
  return (
    <button
      className={`rounded-lg border px-4 py-2 font-light transition-all duration-300 ${colorClasses[color]} disabled:cursor-not-allowed disabled:border-0 disabled:bg-gray-500 disabled:opacity-50 dark:text-gray-300`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
