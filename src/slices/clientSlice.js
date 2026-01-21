import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editMode: false,

  personalDetails: null,
  qualification: null,
  occupation: null,
  physicalCondition: null,
  maritalStatus: null,
  fatherGuardian: null,
  grandParent: null,
  bankDetails: null,

  personalDetailsId: null,
  qualificationId: null,
  occupationId: null,
  physicalConditionId: null,
  maritalStatusId: null,
  fatherGuardianId: null,
  grandParentId: null,
  bankDetailsId: null,

  client: null,
  completedSteps: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },

    setClient: (state, action) => {
      state.client = action.payload;
    },

    setPersonalDetails: (state, action) => {
      state.personalDetails = action.payload.data;
      state.personalDetailsId = action.payload.id;
      if (!state.completedSteps.includes("Personal"))
        state.completedSteps.push("Personal");
    },

    setQualification: (state, action) => {
      state.qualification = action.payload.data;
      state.qualificationId = action.payload.id;
      if (!state.completedSteps.includes("Qualification"))
        state.completedSteps.push("Qualification");
    },

    setOccupation: (state, action) => {
      state.occupation = action.payload.data;
      state.occupationId = action.payload.id;
      if (!state.completedSteps.includes("Occupation"))
        state.completedSteps.push("Occupation");
    },

    setPhysicalCondition: (state, action) => {
      state.physicalCondition = action.payload.data;
      state.physicalConditionId = action.payload.id;
      if (!state.completedSteps.includes("Physical"))
        state.completedSteps.push("Physical");
    },

    setMaritalStatus: (state, action) => {
      state.maritalStatus = action.payload.data;
      state.maritalStatusId = action.payload.id;
      if (!state.completedSteps.includes("Marital"))
        state.completedSteps.push("Marital");
    },

    setFatherGuardian: (state, action) => {
      state.fatherGuardian = action.payload.data;
      state.fatherGuardianId = action.payload.id;
      if (!state.completedSteps.includes("Relation"))
        state.completedSteps.push("Relation");
    },

    setGrandParent: (state, action) => {
      state.grandParent = action.payload.data;
      state.grandParentId = action.payload.id;
      if (!state.completedSteps.includes("Grandparent"))
        state.completedSteps.push("Grandparent");
    },

    setBankDetails: (state, action) => {
      state.bankDetails = action.payload.data;
      state.bankDetailsId = action.payload.id;
      if (!state.completedSteps.includes("Bank"))
        state.completedSteps.push("Bank");
    },

    resetClientState: () => initialState,

    addCompletedStep: (state, action) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },

    removeCompletedStep: (state, action) => {
      state.completedSteps = state.completedSteps.filter(
        (step) => step !== action.payload
      );
    },

    resetCompletedSteps: (state) => {
      state.completedSteps = [];
    },
  },
});

export const {
  setEditMode,
  setClient,
  setPersonalDetails,
  setQualification,
  setOccupation,
  setPhysicalCondition,
  setMaritalStatus,
  setFatherGuardian,
  setGrandParent,
  setBankDetails,
  resetClientState,
  addCompletedStep,
  removeCompletedStep,
  resetCompletedSteps,
} = clientSlice.actions;

export default clientSlice.reducer;
