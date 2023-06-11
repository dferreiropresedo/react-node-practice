import { IconButton, Stack, Typography } from "@mui/material";
import { SCTaskContainer } from "./taskComponents";
import { Delete } from "@mui/icons-material";
import DateField from "../common/DateField";

interface TaskProps {
  title: string;
  timestamp: number;
  timesPostponed: number;
}

function Task({ title, timestamp, timesPostponed }: TaskProps) {
  const taskCreationDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp * 1000);

  return (
    <SCTaskContainer>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography paddingTop={"3px"} variant="h6" color={"black"}>
          {title}
        </Typography>
        <IconButton aria-label="task delete" color="inherit">
          <Delete />
        </IconButton>
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <DateField date={taskCreationDate} />
        {timesPostponed > 0 && (
          <Typography paddingTop={"6px"} variant="subtitle1">
            {timesPostponed} times postponed
          </Typography>
        )}
      </Stack>
    </SCTaskContainer>
  );
}

export default Task;
