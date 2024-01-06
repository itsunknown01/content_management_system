"use client"

import { useEffect } from "react";

import { useModalStore } from "@/hooks/store/use-modal-store"

export default function Home() {
  const { onOpen, isOpen } = useModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
