"use client";
import { Button, Dropdown } from "@heroui/react";
import { FiEdit2, FiEye } from "react-icons/fi";
import { TbTableOptions } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import { updateDonationStatus } from "@/lib/actions/donationRequest";
import { authClient } from "@/lib/auth-client";

export function OptionsDrop({ requestId, request }) {
  const {data} = authClient.useSession();
  const handleAction = async (actionName) => {
    if (actionName === "done") {
      const result = await updateDonationStatus({ status: "done" }, requestId);
      console.log(result);
    }
    if (actionName === "reject") {
      const result = await updateDonationStatus(
        { status: "rejected" },
        requestId,
      );
      console.log(result);
    }
  };
  return (
    <Dropdown>
      <Button aria-label="Menu" className={`bg-gray-200/50 text-black`}>
        <TbTableOptions />
      </Button>
      <Dropdown.Popover placement="bottom right">
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item
            href={`/dashboard/${data?.user?.role}/my-requests/${requestId}`}
            id="new-file"
            textValue="New file"
          >
            <FiEye className="text-base" />
            View details
          </Dropdown.Item>
          <Dropdown.Item
            href={`/dashboard/${data?.user?.role}/my-requests/edit-request/${requestId}`}
            id="copy-link"
            textValue="Copy link"
          >
            <FiEdit2 className="text-sm" />
            Edit Details
          </Dropdown.Item>
          {request.donationStatus === "inprogress" ? (
            <>
             <Dropdown.Item
                  id="done-request"
                  className="text-green-500"
                  onClick={() => handleAction("done")}
                  textValue="done-request"
                >
                  <FaRegCircleCheck className="text-sm" />
                  Done
                </Dropdown.Item>
                  <Dropdown.Item
                  id="reject-request"
                  onClick={() => handleAction("reject")}
                  className="text-red-500"
                  textValue="reject-request"
                >
                  <FaRegCircleCheck className="text-sm" />
                  Reject request
                </Dropdown.Item>
            
            </>
          ) : (
            <>
              {request.donationStatus === "done" && (
                <Dropdown.Item
                  id="reject-request"
                  onClick={() => handleAction("reject")}
                  className="text-red-500"
                  textValue="reject-request"
                >
                  <FaRegCircleCheck className="text-sm" />
                  Reject request
                </Dropdown.Item>
              )}
              {request.donationStatus === "rejected" && (
                <Dropdown.Item
                  id="done-request"
                  className="text-green-500"
                  onClick={() => handleAction("done")}
                  textValue="done-request"
                >
                  <FaRegCircleCheck className="text-sm" />
                  Done
                </Dropdown.Item>
              )}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
