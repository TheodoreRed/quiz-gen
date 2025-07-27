import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface CreateSubjectDialogProps {
  open: boolean;
  newName: string;
  setNewName: (name: string) => void;
  newDescription: string;
  setNewDescription: (description: string) => void;
  setOpen: (open: boolean) => void;
  onCreate: () => void;
}

const CreateSubjectDialog: React.FC<CreateSubjectDialogProps> = ({
  open,
  newName,
  setOpen,
  setNewName,
  onCreate,
  newDescription,
  setNewDescription,
}) => (
  <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
    <DialogTitle>Create subject</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Subject name"
        fullWidth
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={onCreate} variant="contained">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default CreateSubjectDialog;
