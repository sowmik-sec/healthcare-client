"use client";
import assets from "@/assets";
import { storeUserInfo } from "@/services/actions/auth.service";
import { userLogin } from "@/services/actions/userLogin";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res.data.accessToken });
        console.log(res);
        router.push("/");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            maxWidth: 600,
            width: "100%",
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login PH Healthcare
              </Typography>
            </Box>
          </Stack>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid size={{ md: 6 }}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("email")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                    {...register("password")}
                  />
                </Grid>
              </Grid>
              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                Forgot Password?
              </Typography>
              <Button type="submit" fullWidth sx={{ my: 2 }}>
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Dont&apos;t have an account?{" "}
                <Link href="/register">Create an account</Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
