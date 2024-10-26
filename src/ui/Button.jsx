function Button({ children, onClick }) {
  return (
    <button
      className="rounded-lg border border-teal-500 bg-teal-300 px-4 py-2 font-light transition-all duration-300 hover:bg-teal-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
