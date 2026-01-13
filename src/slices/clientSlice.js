import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 🧩 Full form data for preview
  personalDetails: null,
  qualification: null,
  occupation: null,
  physicalCondition: null,
  maritalStatus: null,
  fatherGuardian: null,
  grandParent: null,
  bankDetails: null,

  // 🆔 Individual IDs
  personalDetailsId: null,
  qualificationId: null,
  occupationId: null,
  physicalConditionId: null,
  maritalStatusId: null,
  fatherGuardianId: null,
  grandParentId: null,
  bankDetailsId: null,

  // 🔥 FINAL CREATED CLIENT (IMPORTANT)
  client: null,

  // ✅ Track completed sections
  completedSteps: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    // ================= FINAL CLIENT =================
    setClient: (state, action) => {
      state.client = action.payload;
    },

    // ========== PERSONAL DETAILS ==========
    setPersonalDetails: (state, action) => {
      state.personalDetails = action.payload.data;
      state.personalDetailsId = action.payload.id;
      if (!state.completedSteps.includes("Personal"))
        state.completedSteps.push("Personal");
    },
    setPersonalDetailsId: (state, action) => {
      state.personalDetailsId = action.payload;
      if (!state.completedSteps.includes("Personal"))
        state.completedSteps.push("Personal");
    },

    // ========== QUALIFICATION ==========
    setQualification: (state, action) => {
      state.qualification = action.payload.data;
      state.qualificationId = action.payload.id;
      if (!state.completedSteps.includes("Qualification"))
        state.completedSteps.push("Qualification");
    },
    setQualificationId: (state, action) => {
      state.qualificationId = action.payload;
      if (!state.completedSteps.includes("Qualification"))
        state.completedSteps.push("Qualification");
    },

    // ========== OCCUPATION ==========
    setOccupation: (state, action) => {
      state.occupation = action.payload.data;
      state.occupationId = action.payload.id;
      if (!state.completedSteps.includes("Occupation"))
        state.completedSteps.push("Occupation");
    },
    setOccupationId: (state, action) => {
      state.occupationId = action.payload;
      if (!state.completedSteps.includes("Occupation"))
        state.completedSteps.push("Occupation");
    },

    // ========== PHYSICAL CONDITION ==========
    setPhysicalCondition: (state, action) => {
      state.physicalCondition = action.payload.data;
      state.physicalConditionId = action.payload.id;
      if (!state.completedSteps.includes("Physical"))
        state.completedSteps.push("Physical");
    },
    setPhysicalConditionId: (state, action) => {
      state.physicalConditionId = action.payload;
      if (!state.completedSteps.includes("Physical"))
        state.completedSteps.push("Physical");
    },

    // ========== MARITAL STATUS ==========
    setMaritalStatus: (state, action) => {
      state.maritalStatus = action.payload.data;
      state.maritalStatusId = action.payload.id;
      if (!state.completedSteps.includes("Marital"))
        state.completedSteps.push("Marital");
    },
    setMaritalStatusId: (state, action) => {
      state.maritalStatusId = action.payload;
      if (!state.completedSteps.includes("Marital"))
        state.completedSteps.push("Marital");
    },

    // ========== FATHER / GUARDIAN ==========
    setFatherGuardian: (state, action) => {
      state.fatherGuardian = action.payload.data;
      state.fatherGuardianId = action.payload.id;
      if (!state.completedSteps.includes("Relation"))
        state.completedSteps.push("Relation");
    },
    setFatherGuardianId: (state, action) => {
      state.fatherGuardianId = action.payload;
      if (!state.completedSteps.includes("Relation"))
        state.completedSteps.push("Relation");
    },

    // ========== GRAND PARENT ==========
    setGrandParent: (state, action) => {
      state.grandParent = action.payload.data;
      state.grandParentId = action.payload.id;
      if (!state.completedSteps.includes("Grandparent"))
        state.completedSteps.push("Grandparent");
    },
    setGrandParentId: (state, action) => {
      state.grandParentId = action.payload;
      if (!state.completedSteps.includes("Grandparent"))
        state.completedSteps.push("Grandparent");
    },

    // ========== BANK DETAILS ==========
    setBankDetails: (state, action) => {
      state.bankDetails = action.payload.data;
      state.bankDetailsId = action.payload.id;
      if (!state.completedSteps.includes("Bank"))
        state.completedSteps.push("Bank");
    },
    setBankDetailsId: (state, action) => {
      state.bankDetailsId = action.payload;
      if (!state.completedSteps.includes("Bank"))
        state.completedSteps.push("Bank");
    },

    // ========== HELPERS ==========
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

// ✅ Export actions (🔥 setClient ADDED)
export const {
  setClient,
  setPersonalDetails,
  setPersonalDetailsId,
  setQualification,
  setQualificationId,
  setOccupation,
  setOccupationId,
  setPhysicalCondition,
  setPhysicalConditionId,
  setMaritalStatus,
  setMaritalStatusId,
  setFatherGuardian,
  setFatherGuardianId,
  setGrandParent,
  setGrandParentId,
  setBankDetails,
  setBankDetailsId,
  resetClientState,
  addCompletedStep,
  removeCompletedStep,
  resetCompletedSteps,
} = clientSlice.actions;

export default clientSlice.reducer;
