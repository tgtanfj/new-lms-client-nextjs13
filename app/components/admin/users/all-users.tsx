import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import Loader from "../../loader/loader";
import { styles } from "@/app/styles/style";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AllUsersProps {
  isTeam?: boolean;
}

const AllUsers = ({ isTeam }: AllUsersProps) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [updateUserRole, { isSuccess, error: updateUserRoleError }] =
    useUpdateUserRoleMutation();
  const { data, isLoading, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteUserSuccess, error: deleteUserError }] =
    useDeleteUserMutation({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="dark:text-white text-black m-auto"
                size={20}
                onClick={() => {
                  setOpen(!open);
                  setUserId(params.row.id);
                }}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailTo:${params.row.email}`}>
              <AiOutlineMail
                className="dark:text-white text-black m-auto"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleChangeRole = (e: any) => {
    setRole(e.target.value);
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  useEffect(() => {
    if (updateUserRoleError) {
      if ("data" in updateUserRoleError) {
        const errorMessage = updateUserRoleError as any;
        toast.error(errorMessage.data.message);
        setActive(false);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (deleteUserError) {
      if ("data" in deleteUserError) {
        const errorMessage = deleteUserError as any;
        toast.error(errorMessage.data.message);
        setOpen(false);
      }
    }
    if (deleteUserSuccess) {
      refetch();
      toast.success("Deleted user successfully");
      setOpen(false);
    }
  }, [isSuccess, updateUserRoleError, deleteUserSuccess, deleteUserError]);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                onClick={() => setActive(!active)}
                className={`${styles.button} !h-[35px] !w-[250px] !bg-[#3e4396]`}
              >
                Add New Member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTabelPagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
            ></DataGrid>
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none ">
                <h1 className={`${styles.title}`}>Add New Member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className={`${styles.input}`}
                  />
                  <select
                    name=""
                    id=""
                    onChange={(e) => handleChangeRole(e)}
                    className={`${styles.input} !mt-6 dark:text-white text-black`}
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                  <br />
                  <div
                    onClick={handleSubmit}
                    className={`${styles.button} my-6 !h-[30px]`}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none ">
                <h1 className={`${styles.title}`}>
                  Are your sure you wanna delete this user?
                </h1>
                <div className="flex w-full items-center justify-end gap-3 mb-3 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    onClick={handleDelete}
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
