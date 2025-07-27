"use client";

// React
import { useCallback, useMemo, useState } from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Next
import { useRouter } from "next/navigation";

// Types
import { Subject } from "@/types/subject/types";

// Components
import StudyAppBar from "../layout/AppBar/AppBar";
import { NoSubjectsFound } from "./NoSubjectsFound";
import SubjectCard from "./SubjectCard";

// Dialogs
import CreateSubjectDialog from "../dialogs/CreateSubjectDialog";

// Store
import { useToastStore } from "@/store/toastStore";
import { createSubject, updateSubject } from "@/lib/subjects";

export interface DashboardProps {
  userName: string;
  subjects: Subject[];
  userId: string; // Added userId for createSubject
}

export default function Dashboard({
  userName,
  subjects,
  userId,
}: DashboardProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const [items, setItems] = useState<Subject[]>(subjects);

  const [createOpen, setCreateOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);

  const showToast = useToastStore((state) => state.showToast);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const handleOpenSubject = useCallback(
    (id: string) => {
      router.push(`/subjects/${id}`);
    },
    [router]
  );

  const handleEditSubject = useCallback(
    (id: string) => {
      const subject = items.find((s) => s._id === id);
      if (!subject) return;

      setNewName(subject.name);
      setNewDescription(subject.description ?? "");
      setEditingId(subject._id!);
      setEditMode("edit");
      setCreateOpen(true);
    },
    [items]
  );

  const handleCreate = async () => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    try {
      const newSubject = await createSubject({
        name: trimmedName,
        description: newDescription.trim(),
        userId: userId,
      });

      setItems((prev) => [newSubject, ...prev]);
      showToast({ message: "Subject created", severity: "success" });
      setNewName("");
      setNewDescription("");
      setCreateOpen(false);
    } catch (err: unknown) {
      let message = "Error creating subject";
      if (err instanceof Error) {
        message = err.message;
      }
      showToast({
        message,
        severity: "error",
      });
    }
  };

  const handleUpdate = async () => {
    const trimmedName = newName.trim();
    if (!trimmedName || !editingId) return;

    try {
      await updateSubject({
        _id: editingId,
        name: trimmedName,
        description: newDescription.trim(),
      });

      setItems((prev) =>
        prev.map((s) =>
          s._id === editingId
            ? { ...s, name: trimmedName, description: newDescription.trim() }
            : s
        )
      );

      showToast({ message: "Subject updated", severity: "success" });
      resetForm();
    } catch (err: unknown) {
      let message = "Error updating subject";
      if (err instanceof Error) message = err.message;
      showToast({ message, severity: "error" });
    }
  };

  const resetForm = () => {
    setNewName("");
    setNewDescription("");
    setEditingId(null);
    setEditMode("create");
    setCreateOpen(false);
  };

  return (
    <>
      <StudyAppBar
        userName={userName}
        setCreateOpen={setCreateOpen}
        page="dashboard"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1, minWidth: 200 }}>
            Your Subjects
          </Typography>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            aria-label="Search subjects"
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {filtered.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              handleOpenSubject={handleOpenSubject}
              handleEditSubject={handleEditSubject}
            />
          ))}

          {filtered.length === 0 && (
            <NoSubjectsFound setCreateOpen={setCreateOpen} />
          )}
        </Grid>
      </Container>

      <CreateSubjectDialog
        open={createOpen}
        name={newName}
        setOpen={setCreateOpen}
        setName={setNewName}
        onSubmit={editMode === "edit" ? handleUpdate : handleCreate}
        description={newDescription}
        setDescription={setNewDescription}
        mode={editMode}
      />
    </>
  );
}
