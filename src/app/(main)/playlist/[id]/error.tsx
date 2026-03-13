"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const PlaylistErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <p>Ocorreu um erro ao carregar a playlist</p>
      <div className="flex gap-4">
        <Button onClick={reset}>Tentar novamente</Button>
        <Link href="/">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    </div>
  );
};

export default PlaylistErrorPage;
