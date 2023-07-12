import React, { useEffect, useMemo, useState } from "react";

import {
  deletePost,
  getAllStatus,
  getConnectionsOfUser,
  postStatus,
  updatePost as updatePostAPI,
} from "../../../api/FirestoreAPI";
import ModalComponent from "../Modal";
import PostCard from "../PostCard";

import "./index.scss";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueId } from "../../../helpers/getUniqueId";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";
import { getCurrentUserImage } from "../../../helpers/getCurrentUserImage";
import { uploadPostImage } from "../../../api/StorageAPI";

export default function PostStatus() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [postIdToEdit, setPostIdToEdit] = useState("");
  const [userConnections, setUserConnections] = useState([]);
  const [currentNewPostImage, setCurrentNewPostImage] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const currentUser = useCurrentUser();

  useMemo(() => {
    getAllStatus(setAllPosts);
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      getConnectionsOfUser(currentUser.email, setUserConnections);
    }
  }, [currentUser.email]);

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postId: getUniqueId(),
      postImage: currentNewPostImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
    await setCurrentNewPostImage("");
  };

  const updatePost = async () => {
    let object = { status, postImage: currentNewPostImage };
    await updatePostAPI(postIdToEdit, object);
    handleModalClose();
  };

  const handleNewPost = () => {
    setStatus("");
    setModalOpen(true);
  };

  const handlePostEdit = (post) => {
    setIsEdit(true);
    setPostIdToEdit(post.id);
    setStatus(post.status);
    setCurrentNewPostImage(post.postImage);
    setModalOpen(true);
  };

  const handlePostDelete = (id) => {
    deletePost(id);
  };

  const handleModalClose = () => {
    setIsEdit(false);
    setPostIdToEdit("");
    setCurrentNewPostImage("");
    setModalOpen(false);
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
      <div className="user-info-card-container">
        <div className="profile-cover-image"></div>
        <div className="user-info-card">
          <img
            className="home-user-info-card-image"
            src={getCurrentUserImage(currentUser)}
            alt="profile-image"
          />
          <p className="home-user-info-card-name">{currentUser.name}</p>
          {currentUser?.headline ? (
            <p className="home-user-info-card-headline">
              {currentUser.headline}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="post-status">
        <img
          className="home-post-status-image"
          src={getCurrentUserImage(currentUser)}
          alt="profile-image"
        />
        <button className="open-post-modal" onClick={handleNewPost}>
          Start a post
        </button>
      </div>
      <ModalComponent
        modalTitle={isEdit ? "Update Post" : "Create a Post"}
        modalButtonText={isEdit ? "Update" : "Post"}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        setStatus={setStatus}
        status={status}
        modalAction={isEdit ? updatePost : sendStatus}
        handlePostImageChange={handlePostImageChange}
        modalCurrentImage={currentNewPostImage}
        modalImageUploadProgress={imageUploadProgress}
      />
      {allPosts.map((post) => {
        return userConnections.includes(post.userEmail) ? (
          <PostCard
            key={post.id}
            post={post}
            handlePostEdit={handlePostEdit}
            handlePostDelete={handlePostDelete}
          />
        ) : null;
      })}
    </>
  );
}
