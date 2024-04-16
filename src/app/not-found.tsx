import Button from "@/components/shared/Button";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="flex justify-center h-[60vh] flex-col items-center w-full gap-5">
      <p className="text-7xl font-bold">404</p>
      <p className="text-lg font-semibold">Page Not Found</p>
      <p className="text-lg font-medium">
        The page you are looking for does not exist.
      </p>
      <Link href={"/"} className="max-w-[200px] w-full">
        <Button label={"Go Back Home"} />
      </Link>
    </div>
  );
};

export default NotFound;
