"use client";

import { signIn } from "next-auth/react";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function LoginPage() {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            m: 2,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Sign in to Quiz Generator
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={handleSignIn}
              fullWidth
            >
              Sign in with GitHub
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
