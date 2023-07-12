import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { firestore } from "../firebaseConfig";

let postsRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");
let likesRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRequestsRef = collection(firestore, "connectionRequests");
let connectionsRef = collection(firestore, "connections");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then((res) => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllStatus = (setAllPosts) => {
  onSnapshot(postsRef, (response) => {
    setAllPosts(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getCurrentUserStatus = (setAllStatus, email) => {
  const currentUserStatus = query(postsRef, where("userEmail", "==", email));
  onSnapshot(currentUserStatus, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(usersRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getUserbyMail = (setCurrentUserProfile, email) => {
  const user = query(usersRef, where("email", "==", email));
  onSnapshot(user, (response) => {
    setCurrentUserProfile(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object) => {
  addDoc(usersRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  let currUser = localStorage.getItem("userEmail");

  onSnapshot(usersRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), userId: docs.id };
        })
        .filter((item) => {
          return item.email === currUser;
        })[0]
    );
  });
};

export const editProfile = (userId, payload) => {
  let userToEdit = doc(usersRef, userId);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likePost = (userId, postId, isLikedByCurrentUser) => {
  try {
    let docToLike = doc(likesRef, `${userId}_${postId}`);

    if (isLikedByCurrentUser) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (error) {
    console.log(err);
  }
};

export const getLikesByUser = (
  userId,
  postId,
  setLikesCount,
  setIsLikedByCurrentUser
) => {
  const likesQuery = query(likesRef, where("postId", "==", postId));
  onSnapshot(likesQuery, (response) => {
    const likes = response.docs.map((doc) => doc.data());
    const likesCount = likes.length;
    setLikesCount(likesCount);

    const isLikedByCurrentUser = likes.some((like) => like.userId === userId);
    setIsLikedByCurrentUser(isLikedByCurrentUser);
  });
};

export const postComment = (postId, name, timeStamp, comment) => {
  try {
    addDoc(commentsRef, { postId, name, timeStamp, comment });
  } catch (error) {
    console.log(error);
  }
};

export const getComments = (postId, setAllComments) => {
  try {
    const singlePostComments = query(
      commentsRef,
      where("postId", "==", postId)
    );
    onSnapshot(singlePostComments, (response) => {
      const comments = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllComments(comments);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, object) => {
  const docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, object).then(() => {
      toast.success("Post has been updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => {
  const docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete).then(() => {
      toast.success("Post has been deleted successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

export const addConnectionRequest = (requestUser, targetUser) => {
  const addConnectionRequest = doc(
    connectionRequestsRef,
    `${requestUser.userId}_${targetUser.id}`
  );

  try {
    setDoc(addConnectionRequest, {
      requestEmail: requestUser.email,
      targetEmail: targetUser.email,
    }).then(() => {
      toast.success("Connection Request Successfully Sent");
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteConnectionRequest = (requestUserId, targetUserId) => {
  const deleteConnectionRequest = doc(
    connectionRequestsRef,
    `${requestUserId}_${targetUserId}`
  );

  try {
    deleteDoc(deleteConnectionRequest);
  } catch (error) {
    console.log(error);
  }
};

export const getConnectionRequestToUser = (
  userEmail,
  setConnectionRequestToUser
) => {
  const connectionRequestsQuery = query(
    connectionRequestsRef,
    where("targetEmail", "==", userEmail)
  );
  onSnapshot(connectionRequestsQuery, (response) => {
    const connectionRequests = response.docs.map((doc) => doc.data());
    setConnectionRequestToUser(connectionRequests);
  });
};

export const getPendingConnectionRequestsToUser = (
  userEmail,
  connectionEmail,
  setIsRequestPending
) => {
  const pendingRequestQuery = query(
    connectionRequestsRef,
    where("requestEmail", "==", userEmail)
  );

  onSnapshot(pendingRequestQuery, (response) => {
    const pendingRequest = response.docs.map((doc) => doc.data());

    const isLikedByCurrentUser = pendingRequest.some(
      (request) => request.targetEmail === connectionEmail
    );
    setIsRequestPending(isLikedByCurrentUser);
  });
};

export const acceptConnectionRequest = (user, connection) => {
  const addConnectionToUser = doc(
    connectionsRef,
    `${user.userId}_${connection.id}`
  );
  const addConnectionByUser = doc(
    connectionsRef,
    `${connection.id}_${user.userId}`
  );

  try {
    deleteConnectionRequest(connection.id, user.userId);
    setDoc(addConnectionByUser, {
      userEmail: user.email,
      connectionEmail: connection.email,
    });
    setDoc(addConnectionToUser, {
      userEmail: connection.email,
      connectionEmail: user.email,
    });
    toast.success("Connection Added successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getConnectionsOfUser = (userEmail, setUserConnections) => {
  const connectionsQuery = query(
    connectionsRef,
    where("userEmail", "==", userEmail)
  );
  onSnapshot(connectionsQuery, (response) => {
    const connections = response.docs.map((doc) => doc.data().connectionEmail);
    setUserConnections(connections);
  });
};
