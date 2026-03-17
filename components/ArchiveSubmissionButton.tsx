"use client";

import { useState } from "react";
import ArchiveSubmissionModal from "@/components/ArchiveSubmissionModal";

type Props = {
  mode: "missing" | "correction";
  buttonLabel: string;
  className?: string;
};

export default function ArchiveSubmissionButton({
  mode,
  buttonLabel,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
      >
        {buttonLabel}
      </button>

      <ArchiveSubmissionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode={mode}
      />
    </>
  );
}