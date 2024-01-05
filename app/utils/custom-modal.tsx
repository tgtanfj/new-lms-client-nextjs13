"use client";

import { Box, Modal } from "@mui/material";
import Login from "../components/Auth/login";

interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any
}

const CustomModal = ({
  open,
  setOpen,
  activeItem,
  component: Component,
  setRoute,
  refetch
}: CustomModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      arial-labellebdy="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch}/>
      </Box>
    </Modal>
  );
};

export default CustomModal;
