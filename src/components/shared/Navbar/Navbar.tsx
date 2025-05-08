"use client";
import {
  getUserInfo,
  isLoggedIn,
  removeUser,
} from "@/services/actions/auth.service";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const userInfo = getUserInfo();
  const isUserLoggedIn = isLoggedIn();
  const router = useRouter();
  const handleLogOUt = () => {
    removeUser();
    router.refresh();
  };

  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          P
          <Box component="span" color="primary.main">
            H
          </Box>{" "}
          Health Care
        </Typography>
        <Stack direction="row" gap={4} justifyContent="space-between">
          <Typography component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography>Health Plans</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagnostics</Typography>
          <Typography>NGOs</Typography>
        </Stack>
        {!isUserLoggedIn ? (
          <Button component={Link} href="/login">
            Login
          </Button>
        ) : (
          <Button onClick={handleLogOUt} color="error">
            Logout
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
