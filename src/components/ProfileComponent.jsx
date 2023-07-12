import React, { useState } from "react";

import ProfileCard from "./common/ProfileCard";
import ProfileEdit from "./common/ProfileEdit";

export default function ProfileComponent() {
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <ProfileEdit onEdit={onEdit} />
      ) : (
        <ProfileCard onEdit={onEdit} />
      )}
    </div>
  );
}
