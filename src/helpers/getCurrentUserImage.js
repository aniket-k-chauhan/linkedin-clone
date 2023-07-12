import { DEFAULT_PROFILE_PICTURE } from "../constants/constants";

export const getCurrentUserImage = (currentUser) => {
  return currentUser?.imageURL ? currentUser.imageURL : DEFAULT_PROFILE_PICTURE;
};
