import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useModal } from "@/context/ModalContex";

export default function App({ contentComponent, title, ...props }) {
  const { isOpen, onClose } = useModal();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  return (
    <div className="flex flex-col gap-2">
      <Modal size={'xl'} isOpen={isOpen} scrollBehavior={scrollBehavior} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-slate-700">
                {title}
              </ModalHeader>
              <ModalBody>{contentComponent}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
