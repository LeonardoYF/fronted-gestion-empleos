import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Badge,
} from "@nextui-org/react";
import { NotificationIcon } from "./IU/NotificacionIcon";

export default function App() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
            className="h-14 w-14"
          radius="full"
          isIconOnly
          aria-label="Open notifications dropdown"
          variant="light"
        >
          <Badge content="20" shape="circle" color="danger">
            <NotificationIcon size={30} />
          </Badge>
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="text-neutral-950" variant="faded" aria-label="Notifications menu">
        <DropdownSection title="Notifications" showDivider>
          <DropdownItem>
            {/* Content of your notification item */}
            Notification Content
          </DropdownItem>
          {/* Add more DropdownItems for each notification */}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}