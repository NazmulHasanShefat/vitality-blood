"use client";

import React from "react";
import { FiUser, FiMail, FiHeart } from "react-icons/fi";
import { Button, Modal, TextField, Label, Input } from "@heroui/react";

export default function DonateNowModal() {
  // Simulated logged-in user context data structure (Can be replaced with Auth hooks)
  const loggedInUser = {
    name: "Asif Rahman",
    email: "asif.donor@gmail.com",
  };

  // Process data extraction dynamically via FormData upon confirming the modal action
  const handleConfirmSubmit = (e) => {
    e.preventDefault();

    const formDataInstance = new FormData(e.currentTarget);
    const donorPayload = Object.fromEntries(formDataInstance.entries());

    // Logging the dynamic form entries exactly as requested
    console.log("Confirmed Donation Inputs Details:", donorPayload);
  };

  return (
    <Modal>
      {/* Premium Trigger Button with smooth hover scale and active micro-interactions */}
      <Button 
        type="button"
        className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold tracking-wide px-7 py-3.5 rounded-2xl transition-all duration-300 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 text-sm"
      >
        <FiHeart className="text-base fill-current text-white animate-pulse mr-2" />
        Donate Now
      </Button>

      {/* HeroUI Structural Modal Subcomponents Tree */}
      <Modal.Backdrop className="bg-slate-900/40 backdrop-blur-md">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[440px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
            <Modal.CloseTrigger className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors" />
            
            {/* Modal Heading Header - Enhanced Card Accent Layout */}
            <Modal.Header className="flex flex-col items-center text-center p-8 pb-5 bg-gradient-to-b from-red-50/50 to-transparent dark:from-red-950/10 dark:to-transparent">
              <Modal.Icon className="bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 p-3.5 rounded-2xl shadow-inner mb-3">
                <FiHeart className="size-6 fill-current animate-pulse" />
              </Modal.Icon>
              <div className="space-y-1">
                <Modal.Heading className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Donate Now
                </Modal.Heading>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-[280px]">
                  Confirm your information below to submit your life-saving blood donation request.
                </p>
              </div>
            </Modal.Header>

            {/* Interactive Data Entry Form */}
            <form onSubmit={handleConfirmSubmit}>
              <Modal.Body className="px-8 py-4 space-y-5">
                
                {/* Input Payload Scope 1: Donor Full Name using HeroUI TextField Structure */}
                <TextField isReadOnly defaultValue={loggedInUser.name} className="w-full text-left space-y-1.5" name="donorName" type="text">
                  <Label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Donor Name
                  </Label>
                  <div className="relative group">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 dark:text-slate-500 dark:group-focus-within:text-red-400 text-lg transition-colors duration-200 z-10" />
                    <Input
                      required
                     
                      placeholder="Enter donor name"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 dark:focus:border-red-500 outline-none transition-all duration-200 text-sm font-medium"
                    />
                  </div>
                </TextField>

                {/* Input Payload Scope 2: Donor Email using HeroUI TextField Structure */}
                <TextField isReadOnly defaultValue={loggedInUser.email} className="w-full text-left space-y-1.5" name="donorEmail" type="email">
                  <Label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Donor Email Address
                  </Label>
                  <div className="relative group">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 dark:text-slate-500 dark:group-focus-within:text-red-400 text-lg transition-colors duration-200 z-10" />
                    <Input
                      placeholder="Enter donor email"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 dark:focus:border-red-500 outline-none transition-all duration-200 text-sm font-medium"
                    />
                  </div>
                </TextField>

              </Modal.Body>

              {/* Action Buttons Interface Layout Footer Group Block */}
              <Modal.Footer className=" py-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/30 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  slot="close"
                  className="px-5 py-2.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl transition-all duration-200"
                >
                  Cancel
                </Button>
                
                {/* Main Submit Action Controller Pinpoint */}
                <Button
                  type="submit"
                  slot="close"
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20"
                >
                  Confirm Donation
                </Button>
              </Modal.Footer>
            </form>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}