import React, { ReactNode } from "react";
import { SCColumnContainer } from "./columnComponents";

interface ColumnProps {
  children: ReactNode;
}

function Column({ children }: ColumnProps) {
  return <SCColumnContainer>{children}</SCColumnContainer>;
}

export default Column;
