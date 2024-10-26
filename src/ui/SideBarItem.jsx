function SideBarItem({icon, title}) {
  return (
    <div className="flex flex-row gap-2 items-center hover:bg-gray-200 transition-all duration-300 p-2 rounded-xl text-gray-500 ">
    <div className="text-4xl m-auto p-auto md:p-0 md:m-0 md:text-lg lg:text-3xl">{icon}</div>
    <h1 className="font-light hidden md:block md:text-xl lg:text-2xl">{title}</h1>
  </div>
  )
}

export default SideBarItem
