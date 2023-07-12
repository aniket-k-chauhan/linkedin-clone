import React, { useMemo, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";

import {
  deletePost,
  getAllStatus,
  getCurrentUserStatus,
  getUserbyMail,
  updatePost as updatePostAPI,
} from "../../../api/FirestoreAPI";

import PostCard from "../PostCard";
import "./index.scss";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";
import {
  uploadImage as uploadImageAPI,
  uploadPostImage,
} from "../../../api/StorageAPI";
import ImageUploadModal from "../ImageUploadModal";
import { DEFAULT_PROFILE_PICTURE } from "../../../constants/constants";
import { isWritable } from "../../../helpers/isWritable";
import ModalComponent from "../Modal";

export default function ProfileCard({ onEdit }) {
  let location = useLocation();
  const currentUser = useCurrentUser();

  const [allPosts, setAllPosts] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [newProfilePic, setNewProfilePic] = useState({});
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [postIdToEdit, setPostIdToEdit] = useState("");
  const [currentNewPostImage, setCurrentNewPostImage] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  useMemo(() => {
    if (location?.state?.email) {
      getCurrentUserStatus(setAllPosts, location?.state?.email);
      getUserbyMail(setCurrentUserProfile, location?.state?.email);
    }
  }, []);

  const handleProfileChange = (event) => {
    setNewProfilePic(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(
      newProfilePic,
      currentUser.userId,
      setProgress,
      handlePopupClose
    );
  };

  const handlePopupClose = () => {
    setOpenModal(false);
    setNewProfilePic({});
  };

  const getCurrentUserImageSrc = () => {
    if (
      Object.values(currentUserProfile).length &&
      currentUserProfile?.imageURL
    ) {
      return currentUserProfile.imageURL;
    } else if (
      !Object.values(currentUserProfile).length &&
      currentUser.imageURL
    ) {
      return currentUser.imageURL;
    } else {
      return DEFAULT_PROFILE_PICTURE;
    }
  };

  const updatePost = async () => {
    let object = { status, postImage: currentNewPostImage };
    await updatePostAPI(postIdToEdit, object);
    handleModalClose();
  };

  const handlePostEdit = (post) => {
    setPostIdToEdit(post.id);
    setStatus(post.status);
    setCurrentNewPostImage(post.postImage);
    setPostModalOpen(true);
  };

  const handlePostDelete = (id) => {
    deletePost(id);
  };

  const handleModalClose = () => {
    setPostIdToEdit("");
    setCurrentNewPostImage("");
    setPostModalOpen(false);
  };

  const handlePostImageChange = (event) => {
    uploadPostImage(
      event.target.files[0],
      setCurrentNewPostImage,
      setImageUploadProgress
    );
  };

  return (
    <>
      <ImageUploadModal
        open={openModal}
        handlePopupClose={handlePopupClose}
        newProfilePic={newProfilePic}
        handleProfileChange={handleProfileChange}
        uploadImage={uploadImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="profile-cover-image"></div>
        {isWritable(
          currentUser.email,
          currentUserProfile?.email || currentUser.email
        ) ? (
          <div className="edit-btn">
            <button onClick={onEdit}>
              <HiOutlinePencil className="edit-icon" />
            </button>
          </div>
        ) : (
          <></>
        )}

        <img
          className="profile-image"
          src={getCurrentUserImageSrc()}
          alt="profile-image"
          onClick={() => setOpenModal(true)}
        />
        <div className="profile-info">
          <div>
            <h1 className="username">
              {Object.values(currentUserProfile).length === 0
                ? currentUser.name
                : currentUserProfile?.name}
            </h1>
            <p className="headline">
              {Object.values(currentUserProfile).length === 0
                ? currentUser.headline
                : currentUserProfile?.headline}
            </p>
            <p className="location">
              {Object.values(currentUserProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country}`
                : `${currentUserProfile?.city}, ${currentUserProfile?.country}`}
            </p>
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentUserProfile).length === 0
                  ? currentUser.website
                  : currentUserProfile?.website
              }
            >
              {Object.values(currentUserProfile).length === 0
                ? currentUser.website
                : currentUserProfile?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="company">
              {Object.values(currentUserProfile).length === 0
                ? currentUser.company
                : currentUserProfile?.company}
            </p>
            <p className="college">
              {Object.values(currentUserProfile).length === 0
                ? currentUser.college
                : currentUserProfile?.college}
            </p>
          </div>
        </div>
        <p className="about">
          {Object.values(currentUserProfile).length === 0
            ? currentUser.about
            : currentUserProfile?.about}
        </p>
        <p className="skills">
          <span className="skills-label">Skills: </span>
          {Object.values(currentUserProfile).length === 0
            ? currentUser.skills
            : currentUserProfile?.skills}
        </p>
      </div>
      <div className="home-component">
        <ModalComponent
          modalTitle="Update Post"
          modalButtonText="Update"
          modalOpen={postModalOpen}
          handleModalClose={handleModalClose}
          setStatus={setStatus}
          status={status}
          modalAction={updatePost}
          handlePostImageChange={handlePostImageChange}
          modalCurrentImage={currentNewPostImage}
          modalImageUploadProgress={imageUploadProgress}
        />
        {allPosts?.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              handlePostEdit={handlePostEdit}
              handlePostDelete={handlePostDelete}
            />
          );
        })}
      </div>
    </>
  );
}
