function Button({ children, onClick, color = "teal", disabled }) {
  const colorClasses = {
    teal: "border-teal-500 bg-teal-300 hover:bg-teal-400",
    gray: "border-gray-500 bg-gray-300 hover:bg-gray-400",
    red: "border-red-500 bg-red-300 hover:bg-red-400",
    orange: "border-orange-500 bg-orange-300 hover:bg-orange-400",
    borderRed: "border-red-400 hover:bg-red-300",
    borderOrange: "border-orange-400 hover:bg-orange-300",
    borderGray: "border-gray-400 hover:bg-gray-300",
    borderTeal: "border-teal-400 hover:bg-teal-300",
  };
  return (
    <button
      className={`rounded-lg border px-4 py-2 font-light transition-all duration-300 ${colorClasses[color]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
