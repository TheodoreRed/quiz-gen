"use client";

// MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Icons
import AddIcon from "@mui/icons-material/Add";

export const NoSubjectsFound = ({
  setCreateOpen,
}: {
  setCreateOpen: (open: boolean) => void;
}) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          No subjects found
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Try a different search or create a new subject.
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
        >
          Create Subject
        </Button>
      </Box>
    </Grid>
  );
};
