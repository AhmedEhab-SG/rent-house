"use client";

import EmptyState from "@/components/shared/EmptyState";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Ops" subtitle="Something went Wrong!" />;
};

export default ErrorState;
