import Container from "./Container";
import Sidebar from "../ui/sidebar";

function AppLayout() {
  return (
    <div className="m-auto grid grid-cols-3 gap-4 sm:grid-cols-6">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="col-span-2 col-start-2 pt-14 sm:col-span-4">
        <Container />
      </div>
      <div className="hidden sm:block">{/* <Sidebar /> */}</div>
    </div>
  );
}

export default AppLayout;
