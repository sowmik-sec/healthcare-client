import PHModal from "@/components/shared/PHModal/PHModal";
import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";

const SpecialtiesPage = () => {
  return (
    <Box>
      <Stack direction="row">
        <Button>Create Specialty</Button>
        <PHModal />
        <TextField size="small" placeholder="Search Specialty" />
      </Stack>
    </Box>
  );
};

export default SpecialtiesPage;
