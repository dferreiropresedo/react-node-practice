import { Stack, styled } from "@mui/material";

const SCBoardColumns = styled(Stack)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "16px",
  maxHeight: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "14px",
  },
});

export { SCBoardColumns };
