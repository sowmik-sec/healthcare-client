import {
  getUserInfo,
  isLoggedIn,
  removeUser,
} from "@/services/actions/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const isUserLoggedIn = isLoggedIn();
  const router = useRouter();
  const handleLogOUt = () => {
    removeUser();
    router.refresh();
  };

  return (
    <>
      {!userInfo?.userId ? (
        <Button component={Link} href="/login">
          Login
        </Button>
      ) : (
        <Button onClick={handleLogOUt} color="error">
          Logout
        </Button>
      )}
    </>
  );
};

export default AuthButton;
