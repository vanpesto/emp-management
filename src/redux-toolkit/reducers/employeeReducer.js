import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import empData from "../../employees.json";

const initialState = {
  data: empData.employees,
  modalVisibility: false,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    changeSuperAdminState: (state, action) => {
      state.data.forEach((employee) => {
        if (employee.id === action.payload.id) {
          if (action.payload.superAdmin === "active") {
            employee.superAdmin = "inactive";
          } else {
            employee.superAdmin = "active";
          }
        }
      });
    },
    changePermissionGroupStatus: (state, action) => {
      state.data.forEach((employee) => {
        if (employee.id === action.payload.id) {
          employee.permissionGroups.forEach((group) => {
            if (group.name === action.payload.groupName) {
              if (group.state === "active") {
                group.state = "inactive";
              } else {
                group.state = "active";
              }
            }
          });
        }
      });
    },
    changePermissionStatus: (state, action) => {
      state.data.forEach((employee) => {
        if (employee.id === action.payload.id) {
          employee.permissionGroups.forEach((group) => {
            if (group.name === action.payload.groupName) {
              group.permissions.forEach((permission) => {
                if (permission.name === action.payload.permission.name) {
                  if (action.payload.permission.state === "active") {
                    permission.state = "inactive";
                  } else {
                    permission.state = "active";
                  }
                }
              });
            }
          });
        }
      });
    },
    editEmployee: (state, action) => {
      state.data.forEach((employee) => {
        if (employee.id === action.payload.id) {
          employee.firstName = action.payload.firstName;
          employee.lastName = action.payload.lastName;
          employee.role = action.payload.role;
          return;
        }
      });
    },
    changeStatus: (state, action) => {
      console.log(action.payload);
      state.data.forEach((employee) => {
        if (employee.id === action.payload.id) {
          employee.status = action.payload.status;
          return;
        }
      });
    },
    changeModalVisibility: (state, action) => {
      state.modalVisibility = action.payload;
    },
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    deleteUser: (state, action) => {
      const filteredData = state.data.filter(
        (employee) => employee.id !== action.payload.id
      );
      state.data = [...filteredData];
    },
    sortByName: (state) => {
      const sortedData = state.data.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
      state.data = [...sortedData];
    },
    sortByRole: (state) => {
      const sortedData = state.data.sort((a, b) =>
        a.role.localeCompare(b.role)
      );
      state.data = [...sortedData];
    },
    sortByStatus: (state) => {
      const sortedData = state.data.sort((a, b) => {
        if (a.status === "active" && b.status !== "active") {
          return -1; // 'a' comes before 'b'
        } else if (a.status !== "active" && b.status === "active") {
          return 1; // 'b' comes before 'a'
        } else {
          return 0; // no change in order
        }
      });
      state.data = [...sortedData];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUser,
  sortByName,
  sortByRole,
  sortByStatus,
  deleteUser,
  changeModalVisibility,
  changeStatus,
  editEmployee,
  changePermissionGroupStatus,
  changeSuperAdminState,
  changePermissionStatus,
} = employeeSlice.actions;

export default employeeSlice.reducer;
