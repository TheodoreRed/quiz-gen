import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Subject } from "@/app/types/subject/types";

interface SubjectCardProps {
  subject: Subject;
  handleOpenSubject: (id: string) => void;
  handleEditSubject: (id: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  handleOpenSubject,
  handleEditSubject,
}) => (
  <Grid key={subject._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        onClick={() => subject._id && handleOpenSubject(subject._id)}
        sx={{ flexGrow: 1 }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" component="h3" noWrap>
              {subject.name}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minHeight: 40 }}
            >
              {subject.description || " "}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton
          aria-label="Edit subject"
          onClick={() => subject._id && handleEditSubject(subject._id)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  </Grid>
);

export default SubjectCard;
