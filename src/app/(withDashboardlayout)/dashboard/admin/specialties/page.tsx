"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SpecialistModal from "./components/SpecialistModal";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, isLoading] = useGetAllSpecialtiesQuery({});
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
        <SpecialistModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Specialty" />
      </Stack>
      <Box>
        <h1>Display Specialties</h1>
      </Box>
    </Box>
  );
};

export default SpecialtiesPage;
