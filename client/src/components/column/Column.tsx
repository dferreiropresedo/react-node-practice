import React, { ReactNode } from "react";
import {
  SCColumnTaskContainer,
  SCColumn,
  SCColumnTitle,
  SCAddTaskButton,
} from "./columnComponents";
import AddIcon from "@mui/icons-material/Add";

interface ColumnProps {
  columnTitle: string;
  children: ReactNode;
}

function Column({ columnTitle, children }: ColumnProps) {
  return (
    <SCColumn>
      <SCColumnTitle variant="h6">{columnTitle}</SCColumnTitle>
      <SCColumnTaskContainer>
        {children}
        <SCAddTaskButton size="large" startIcon={<AddIcon />}>
          Add a card
        </SCAddTaskButton>
      </SCColumnTaskContainer>
    </SCColumn>
  );
}

export default Column;
