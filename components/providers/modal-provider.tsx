"use client";

import { useEffect } from "react";
import { CreateServerModal } from "@/components/models/create-server-modal";
import { useModal } from "@/hooks/use-modal-store";
import { InviteModal } from "@/components/models/invite-modal";

export const ModalProvider = () => {
  const { type, isOpen, mounted, setMounted } = useModal();

  useEffect(() => {
    setMounted();
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  const isCreateServerModalOpen = isOpen && type === "createServer";
  const isInviteModalOpen = isOpen && type === "invite";

  return (
    <>
      {isCreateServerModalOpen && <CreateServerModal />}
      {isInviteModalOpen && <InviteModal />}
    </>
  );
};
