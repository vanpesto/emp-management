import { createSlice } from "@reduxjs/toolkit";
import empData from "../../employees.json";

const initialState = {
  data: empData.employees,
  modalVisibility: false,
};

export const employeeSlice = createSlice({
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  name: "employee",
  initialState,
  reducers: {
    changeSuperAdminState: (state, action) => {
      const { id, superAdmin } = action.payload;
      // finding the employee
      const employee = state.data.find((employee) => employee.id === id);
      employee.superAdmin = superAdmin === "active" ? "inactive" : "active";
    },
    changePermissionGroupStatus: (state, action) => {
      const { id, groupName } = action.payload;
      // finding the employee
      const employee = state.data.find((employee) => employee.id === id);
      if (employee) {
        // finding the current employee group
        const group = employee?.permissionGroups.find(
          (group) => group.name === groupName
        );
        if (group) {
          group.state = group.state === "active" ? "inactive" : "active";
        }
      }
    },
    editEmployee: (state, action) => {
      state.data.forEach((employee) => {
        if (employee.id === action.payload.id) {
          employee = action.payload;
          return;
        }
      });
    },
    changeStatus: (state, action) => {
      const { id, status } = action.payload;
      const employee = state.data.find((employee) => employee.id === id);
      if (employee) {
        employee.status = status;
      }
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
    changePermissionStatus: (state, action) => {
      const { id, groupName, permission } = action.payload;
      // finding the employee
      const employee = state.data.find((employee) => employee.id === id);
      if (employee) {
        // finding the current employee group
        const group = employee?.permissionGroups.find(
          (group) => group.name === groupName
        );
        if (group) {
          // finding the current permission to change
          const perm = group.permissions.find(
            (per) => per.name === permission.name
          );
          if (perm) {
            perm.state = perm.state === "active" ? "inactive" : "active";
          }
        }
      }
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
