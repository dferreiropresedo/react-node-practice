import { CalendarToday } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

interface DateFieldProps {
  date: string;
}

function DateField({ date }: DateFieldProps) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
    >
      <CalendarToday fontSize="small" />
      <Typography paddingLeft={"6px"} paddingTop={"6px"} variant="subtitle1">
        {date}
      </Typography>
    </Stack>
  );
}

export default DateField;
