"use client";
import { Button, Dropdown, toast } from "@heroui/react";
import { FiEdit2, FiEye } from "react-icons/fi";
import { TbTableOptions } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import { updateDonationStatus } from "@/lib/actions/donationRequest";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function UsersOptionsDropDown({ user }) {
  const router = useRouter();

  const setRole = async (userid, role) => {
    const { data, error } = await authClient.admin.setRole({
      userId: userid,
      role: role, // required
    });
    if (error) {
      console.log(error);
      toast.danger(error.message);
    }
    if (data) {
      router.refresh();
      toast.success("user updated successfully");
    }
  };
  const updateCurrentUser = async (userId, status) => {
    const { data, error } = await authClient.admin.updateUser({
      userId: userId, // required
      data: { status: status }, // required
    });
    if (error) {
      console.log(error);
      toast.danger(error.message);
    }
    if (data) {
      router.refresh();
      toast.success("user updated successfully");
    }
  };

  const handleAction = async (actionName) => {
    if (actionName === "volunteer") {
      return setRole(user?.id, "volunteer");
    }
    if (actionName === "donor") {
      return setRole(user?.id, "donor");
    }
    if (actionName === "admin") {
      return setRole(user?.id, "admin");
    }
    if (actionName === "block") {
      return updateCurrentUser(user?.id, "blocked")
    }
    if(actionName === "active"){
      return updateCurrentUser(user?.id, "active")
    }
  };

  return (
    <Dropdown>
      <Button aria-label="Menu" className={`bg-gray-200/50 text-black`}>
        <TbTableOptions />
      </Button>
      <Dropdown.Popover placement="bottom right">
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="view-details" textValue="view-details">
            <FiEye className="text-base" />
            View details
          </Dropdown.Item>
          {user?.status !== "blocked" && (
          <Dropdown.Item
            id="block-user"
            textValue="block-user"
            className="text-red-600"
             onClick={() => handleAction("block")}
          >
            <FiEdit2 className="text-sm" />
            Block user
          </Dropdown.Item>
          )}
          {user?.status !== "active" && (
          <Dropdown.Item
            id="active-user"
            textValue="active-user"
            className="text-green-600"
             onClick={() => handleAction("active")}
          >
            <FiEdit2 className="text-sm" />
            active user
          </Dropdown.Item>
          )}


          {user?.role !== "admin" && (
            <Dropdown.Item
              id="Make-admin"
              textValue="Make-admin"
              className="text-purple-600"
              onClick={() => handleAction("admin")}
            >
              <FiEdit2 className="text-sm" />
              Make admin
            </Dropdown.Item>
          )}
          {user?.role !== "volunteer" && (
            <Dropdown.Item
              id="Make-volunteer"
              textValue="Make-volunteer"
              className="text-blue-600"
              onClick={() => handleAction("volunteer")}
            >
              <FiEdit2 className="text-sm" />
              Make volunteer
            </Dropdown.Item>
          )}
          {user?.role !== "donor" && (
            <Dropdown.Item
              id="Make-donor"
              textValue="Make-donor"
              className="text-blue-600"
              onClick={() => handleAction("donor")}
            >
              <FiEdit2 className="text-sm" />
              Make donor
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
