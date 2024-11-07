import Container from "./Container";
import Sidebar from "../ui/Sidebar";
import MobileNavbar from "../ui/MobileNavbar";
function AppLayout() {
  return (
    <div className="m-auto grid grid-cols-3 gap-4 sm:grid-cols-6">
      <div className="sticky top-0 hidden h-screen md:block">
        <Sidebar />
      </div>
      <div className="col-span-3 pt-14 sm:col-span-4 sm:col-start-2">
        <Container />
      </div>
      <MobileNavbar />
      <div className="hidden sm:block">{/* <Sidebar /> */}</div>
    </div>
  );
}

export default AppLayout;
