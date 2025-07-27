import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface SubjectDialogProps {
  open: boolean;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  setOpen: (open: boolean) => void;
  onSubmit: () => void;
  mode: "create" | "edit";
}

const CreateSubjectDialog: React.FC<SubjectDialogProps> = ({
  open,
  name,
  setOpen,
  setName,
  onSubmit,
  mode,
  description,
  setDescription,
}) => (
  <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
    <DialogTitle>
      {mode === "create" ? "Create Subject" : "Edit Subject"}
    </DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Subject name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={onSubmit} variant="contained">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default CreateSubjectDialog;
