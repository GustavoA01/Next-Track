"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const GoBack = () => {
  const { back } = useRouter();

  return (
    <Button variant="ghost" onClick={() => back()}>
      <ArrowLeft data-testid="arrow-left-icon" className="text-primary" />
    </Button>
  );
};
