"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";

interface StudyAppBarProps {
  userName: string;
  setCreateOpen: (open: boolean) => void;
  page: "dashboard" | "subject";
}

const StudyAppBar: React.FC<StudyAppBarProps> = ({
  userName,
  setCreateOpen,
  page,
}) => (
  <AppBar position="static" elevation={0}>
    <Toolbar>
      <SchoolIcon sx={{ mr: 1 }} />
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Study Dashboard
      </Typography>
      <Typography variant="body2" sx={{ mr: 2 }}>
        {userName}
      </Typography>
      {page === "dashboard" && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
        >
          New Subject
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default StudyAppBar;
