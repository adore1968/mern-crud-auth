import { FaSpinner } from "react-icons/fa";

function Loader() {
  return (
    <div className="flex justify-center mt-10">
      <FaSpinner className="animate-spin w-24 h-full" />
    </div>
  );
}

export default Loader;
