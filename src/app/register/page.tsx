"use client";
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
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IPatientData {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

interface IPatientRegisterFormData {
  password: string;
  patient: IPatientData;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPatientRegisterFormData>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IPatientRegisterFormData> = async (values) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        toast.success(res?.message);
        router.push("/login");
      }
      console.log(res);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
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
                Patient Register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid size={{ md: 12 }}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.name")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.email")}
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
                <Grid size={{ md: 6 }}>
                  <TextField
                    id="outlined-basic"
                    label="Contact Number"
                    type="tel"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.contactNumber")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    type="text"
                    size="small"
                    fullWidth={true}
                    {...register("patient.address")}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth sx={{ my: 2 }}>
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
