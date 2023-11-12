import { Button } from "..";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { getUser } from "@/lib/utils";

let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

const GoogleSignUpButton = () => {
  const navigate = useNavigate();
  const { saveUser, setToken } = useContext(UserContext);

  const receiveMessage = async (event: {
    origin: string;
    data: {
      source: string;
      params: { token: string; authenticationMethod: "login" | "signup" };
    };
  }) => {
    if (event.origin !== "http://localhost:5173") {
      return;
    }
    const { data } = event;

    // if we trust the sender and the source is our popup
    if (data.source === "qwitter-auth-redirect") {
      const {
        params: { token, authenticationMethod },
      } = data;
      if (authenticationMethod === "login") {
        console.log("login");
        const user = await getUser(token);
        console.log(user);
        saveUser(user, token);
        navigate("/success");
      } else {
        console.log("signup");
        setToken(token);
        navigate("/i/flow/single-sign", { state: { token } });
      }
    }
  };

  const openSignInWindow = (url: string, name: string) => {
    // remove any existing event listeners
    window.removeEventListener("message", receiveMessage);

    // window features
    const strWindowFeatures = `location=yes,height=570,width=520,scrollbars=yes,status=yes,left=${
      window.innerWidth / 2 - 260
    },top=${window.innerHeight / 2 - 285}},toolbar=no,menubar=no`;

    if (windowObjectReference === null || windowObjectReference.closed) {
      /* if the pointer to the window object in memory does not exist
        or if such pointer exists but the window was closed */
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      /* if the resource to load is different,
        then we load it in the already opened secondary window and then
        we bring such window back on top/in front of its parent window. */
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference?.focus();
    } else {
      /* else the window reference must exist and the window
        is not closed; therefore, we can bring it back on top of any other
        window with the focus() method. There would be no need to re-create
        the window or to reload the referenced resource. */
      windowObjectReference.focus();
    }

    // add the listener for receiving a message from the popup
    window.addEventListener("message", (event) => receiveMessage(event), false);
    // assign the previous URL
    previousUrl = url;
  };

  const handleClick = async () => {
    openSignInWindow(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`,
      "Sign in with Google"
    );
  };

  return (
    <Button
      className="text-gray text-sm hover:text-light-gray max-w-[300px]"
      onClick={handleClick}
      size="full"
    >
      <FcGoogle className="inline mr-2 w-6 h-6" />
      <span className="mb-0.5">Sign up with Google</span>
    </Button>
  );
};
export default GoogleSignUpButton;
