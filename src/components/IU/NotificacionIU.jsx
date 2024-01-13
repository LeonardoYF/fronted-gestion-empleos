import React from "react";
import {Badge, Button} from "@nextui-org/react";
import {NotificationIcon} from "./NotificacionIcon";

export default function Notification({num}) {
  return (
    <Badge content="99+" shape="circle" color="danger">
      <Button
        radius="full"
        isIconOnly
        aria-label="more than 99 notifications"
        variant="light"
      >
        <NotificationIcon size={2} />
      </Button>
    </Badge>
  );
}