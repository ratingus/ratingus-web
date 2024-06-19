import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export const INFO_ABOUT_ORGANIZATION_MODAL = "infoAboutOrganizationModal";
export const APPLICATION_SEND_MODAL = "applicationSendModal";
export const PROFILE_EDIT_MODAL = "profileEditModal";
export const ENTER_CODE_MODAL = "enterCodeModal";
export const MAKE_USER_CODE_MODAL = "makeUserCodeModal";
export type ModalName =
  | typeof INFO_ABOUT_ORGANIZATION_MODAL
  | typeof APPLICATION_SEND_MODAL
  | typeof PROFILE_EDIT_MODAL
  | typeof ENTER_CODE_MODAL
  | typeof MAKE_USER_CODE_MODAL;

interface ModalState {
  activeModals: ModalName[];
}

const initialState = { activeModals: [] } satisfies ModalState as ModalState;

export const modalSlice = createSlice({
  name: "modal",
  initialState,

  selectors: {
    selectActiveModals: (state) => state.activeModals,
  },

  reducers: {
    actionShowModal(state, action: PayloadAction<ModalName>) {
      state.activeModals.push(action.payload);
    },
    actionShowModalCloseOther(state, action: PayloadAction<ModalName>) {
      state.activeModals = [action.payload];
    },
    actionHideModalByName(state, action: PayloadAction<ModalName>) {
      state.activeModals = state.activeModals.filter(
        (modal) => modal !== action.payload,
      );
    },
    actionHideModal(state) {
      state.activeModals.pop();
    },
    actionHideAll(state) {
      state.activeModals = [];
    },
  },
});

export const {
  actionShowModal,
  actionShowModalCloseOther,
  actionHideModalByName,
  actionHideModal,
  actionHideAll,
} = modalSlice.actions;

export const { selectActiveModals } = modalSlice.selectors;

export const selectIsModalActive = (modalName: ModalName) =>
  createDraftSafeSelector([selectActiveModals], (activeModals) =>
    activeModals.includes(modalName),
  );

export default modalSlice.reducer;
