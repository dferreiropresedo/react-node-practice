import React, { ReactNode } from "react";
import {
  SCColumnTaskContainer,
  SCColumn,
  SCColumnTitle,
} from "./columnComponents";

interface ColumnProps {
  columnTitle: string;
  children: ReactNode;
}

function Column({ columnTitle, children }: ColumnProps) {
  return (
    <SCColumn>
      <SCColumnTitle variant="h6">{columnTitle}</SCColumnTitle>
      <SCColumnTaskContainer>{children}</SCColumnTaskContainer>
    </SCColumn>
  );
}

export default Column;
