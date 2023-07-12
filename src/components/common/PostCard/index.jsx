import React, { useMemo, useState } from "react";
import { HiOutlinePencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import LikeButton from "../LikeButton";
import { getAllUsers } from "../../../api/FirestoreAPI";
import { DEFAULT_PROFILE_PICTURE } from "../../../constants/constants";
import { isWritable } from "../../../helpers/isWritable";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";

export default function PostCard({ post, handlePostEdit, handlePostDelete }) {
  let navigate = useNavigate();
  const currentUser = useCurrentUser();

  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getAllUsers(setAllUsers);
  }, []);

  const getImageSrc = () => {
    const imageSrc = allUsers
      .filter((user) => user.email === post.userEmail)
      .map((user) => user.imageURL)[0];
    return imageSrc ? imageSrc : DEFAULT_PROFILE_PICTURE;
  };

  return (
    <div className="post-card">
      <div className="post-user-info-contaniner">
        <div
          className="post-user-info"
          onClick={() =>
            navigate("/profile", { state: { email: post.userEmail } })
          }
        >
          <img
            className="post-profile-image"
            src={getImageSrc()}
            alt="profile-image"
          />
          <div className="post-name-timestamp">
            <p className="name">
              {
                allUsers.filter((user) => user.email === post.userEmail)[0]
                  ?.name
              }
            </p>
            <p className="timestamp">
              {
                allUsers.filter((user) => user.email === post.userEmail)[0]
                  ?.headline
              }
            </p>
            <p className="timestamp">{post.timeStamp}</p>
          </div>
        </div>

        {isWritable(currentUser.email, post.userEmail) ? (
          <div className="post-action">
            <button
              className="post-action-btn"
              onClick={() => handlePostEdit(post)}
            >
              <HiOutlinePencil />
            </button>
            <button
              className="post-action-btn"
              onClick={() => handlePostDelete(post.id)}
            >
              <HiTrash />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className="status"
        dangerouslySetInnerHTML={{ __html: post.status }}
      ></div>
      {post.postImage ? (
        <img className="post-image" src={post.postImage} alt="post-image" />
      ) : null}
      <LikeButton postId={post.id} />
    </div>
  );
}
