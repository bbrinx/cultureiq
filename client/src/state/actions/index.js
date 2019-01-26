import { APPEND_TRANSLATION } from "../actionTypes";

export const appendTranslation = translation => ({
  type: APPEND_TRANSLATION,
  payload: {
    translation
  }
});