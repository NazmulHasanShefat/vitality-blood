"use client";
import { Button, Dropdown, Label } from "@heroui/react";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { TbTableOptions } from "react-icons/tb";
import DeleteConfirmModal from "./DeleteConfirmModal";


export function OptionsDrop({ requestId }) {
  return (
    <Dropdown>
      <Button aria-label="Menu" className={`bg-gray-200/50 text-black`}>
        <TbTableOptions />
      </Button>
      <Dropdown.Popover placement="bottom right">
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item
            href={`/dashboard/donor/my-requests/${requestId}`}
            id="new-file"
            textValue="New file"
          >
            <FiEye className="text-base" />
            View details
          </Dropdown.Item>
          <Dropdown.Item href={`/dashboard/donor/my-requests/edit-request/${requestId}`} id="copy-link" textValue="Copy link">
            <FiEdit2 className="text-sm" />
            Edit Details
          </Dropdown.Item>
        
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
