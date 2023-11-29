import { Button } from "..";
import { FcGoogle } from "react-icons/fc";

// it makes error unit testing(please do it as me)
// const handleClick = () => {
//   console.log(import.meta.env.MODE)
//   window.open(
//     `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`,
//     "_self"
//   );
// };

const SignUpButton = () => {
  return (
    <Button
      className="text-gray text-sm hover:text-light-gray"
      // onClick={handleClick}
    >
      <FcGoogle className="inline mr-2 w-6 h-6" />
      <span className="mb-0.5">Sign up with Google</span>
    </Button>
  );
};
export default SignUpButton;
