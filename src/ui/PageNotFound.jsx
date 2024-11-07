import { useNavigate } from "react-router-dom";
import Button from "./Button";

function PageNotFound() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/", { replace: true });
  }
  return (
    <div className="flex h-[90%] flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-light">Page Not Found</h1>
      <Button onClick={handleClick}>Go Home</Button>
    </div>
  );
}

export default PageNotFound;
