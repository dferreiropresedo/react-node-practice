import { Stack, Typography, styled, Button } from "@mui/material";

const SCColumn = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "rgb(230,230,230,1)",
  minWidth: "400px",
  maxHeight: "98%",
  width: "15%",
  borderRadius: "12px",
  marginLeft: "6px",
  marginTop: "6px",
});

const SCColumnTaskContainer = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "14px",
  width: "100%",
  minHeight: "100%",
  backgroundColor: "rgb(230,230,230,1)",
  borderRadius: "12px",
  paddingTop: "12px",
  paddingBottom: "8px",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "50%",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-track-piece:end": {
    marginBottom: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "14px",
  },
});

const SCColumnTitle = styled(Typography)({
  color: "rgb(0,0,0,1)",
  width: "80%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingRight: "12px",
  fontWeight: "bold",
  paddingTop: "12px",
});

const SCAddTaskButton = styled(Button)({
  color: "rgb(0,0,0,0.5)",
  width: "90%",
  textTransform: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  fontWeight: "600",
  borderRadius: "12px",
});

export { SCColumnTaskContainer, SCColumn, SCColumnTitle, SCAddTaskButton };
