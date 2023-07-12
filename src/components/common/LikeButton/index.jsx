import { useMemo, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";

import "./index.scss";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";
import {
  getComments,
  getLikesByUser,
  likePost,
  postComment,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

export default function LikeButton({ postId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const currentUser = useCurrentUser();

  useMemo(() => {
    getLikesByUser(
      currentUser.userId,
      postId,
      setLikesCount,
      setIsLikedByCurrentUser
    );
    getComments(postId, setAllComments);
  }, [currentUser.userId, postId]);

  const handleLikeClick = () => {
    likePost(currentUser.userId, postId, isLikedByCurrentUser);
  };

  const handleCommentClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handlePostCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = async () => {
    await postComment(
      postId,
      currentUser.name,
      getCurrentTimeStamp("LLL"),
      comment
    );
    setComment("");
  };

  let likesCountContent = "";

  if (likesCount) {
    if (isLikedByCurrentUser && likesCount > 1) {
      likesCountContent = `You and ${likesCount - 1} others`;
    } else if (!isLikedByCurrentUser) {
      likesCountContent = `${likesCount} others`;
    }
  }

  return (
    <div className="post-reaction-container">
      {likesCountContent.length ? (
        <div className="like-count-container">
          <p>{likesCountContent}</p>
        </div>
      ) : (
        <></>
      )}
      <div className="post-reaction-btn-container">
        <div
          className={`reaction-btn ${isLikedByCurrentUser ? "blue" : ""}`}
          onClick={handleLikeClick}
        >
          {isLikedByCurrentUser ? (
            <AiFillLike className="reaction-btn-icon" />
          ) : (
            <AiOutlineLike className="reaction-btn-icon" />
          )}
          <span className="reaction-btn-text">Like</span>
        </div>
        <div className="reaction-btn" onClick={handleCommentClick}>
          <GoCommentDiscussion className="reaction-btn-icon" />
          <span className="reaction-btn-text">Comment</span>
        </div>
      </div>
      {showCommentBox ? (
        <div className="post-comment-container">
          <input
            type="text"
            className="post-comment-input"
            placeholder="Add a Comment..."
            name="post-add-comment"
            value={comment}
            onChange={handlePostCommentChange}
          />
          {comment.length ? (
            <button className="post-comment-btn" onClick={addComment}>
              Post
            </button>
          ) : (
            <></>
          )}
          {allComments.length ? (
            allComments.map((comment) => (
              <div key={comment.id} className="comment-container">
                <div className="comment-name-timestamp">
                  <p className="comment-name">{comment.name}</p>
                  <p className="comment-timestamp">{comment.timeStamp}</p>
                </div>
                <p className="comment">{comment.comment}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
