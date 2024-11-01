function SideBarItem({ icon, title, isActive }) {
  return (
    <div
      className={`flex flex-row items-center gap-2 rounded-xl p-2 transition-all duration-300 hover:bg-gray-200 ${isActive ? "text-teal-500" : "text-gray-500"}`}
    >
      <div
        className={`p-auto m-auto text-4xl md:m-0 md:p-0 md:text-lg lg:text-3xl ${isActive ? "text-teal-500" : "text-gray-600"}`}
      >
        {icon}
      </div>
      <h1
        className={`hidden font-light md:block md:text-xl lg:text-2xl ${isActive ? "text-teal-500" : "text-gray-600"}`}
      >
        {title}
      </h1>
    </div>
  );
}

export default SideBarItem;
