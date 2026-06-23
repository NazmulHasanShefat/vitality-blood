"use client";

import { deleteDonationRequest } from "@/lib/actions/donationRequest";
import {Button, Modal} from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";

const DeleteConfirmModal = ({requestId}) => {
  const handleDelete = async ()=>{
    const result = await deleteDonationRequest(requestId);
    console.log(result)
    // console.log("hello")
  }
    return (
         <Modal>
          <Button variant="primary" className={`p-0 py-0 my-0 h-max bg-transparent`}> <FiTrash2 color="black" className="text-sm" /></Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.Header>
                  <Modal.Icon className="bg-red-700 text-white text-accent-soft-foreground">
                   <FiTrash2 color="white" size={20} className="text-sm" />
                  </Modal.Icon>
                  <Modal.Heading>{"Are you sore!"}</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                  You are about to permanently delete this item. This action cannot be undone. Please confirm if you wish to proceed.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="secondary" className={`text-gray-400`}>
                    Cancel
                  </Button>
                  <Button onClick={handleDelete} className={`bg-red-700 text-white`}>Confirm</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteConfirmModal;