"use client";
import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { storeUserInfo } from "@/services/actions/auth.service";
import { userLogin } from "@/services/actions/userLogin";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(4, "Must be at least 4 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res.data.accessToken });
        toast.success("User logged in successfully");
        router.push("/dashboard");
      } else {
        setError(res.message);
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
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  mt: "15px",
                }}
              >
                User Doesn&apos;t exist
              </Typography>
            </Box>
          )}
          <Box>
            <PHForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={{ md: 6 }}>
                  <PHInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
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
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
