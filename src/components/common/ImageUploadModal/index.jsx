import { Button, Modal, Progress } from "antd";
import "./index.scss";

export default function ImageUploadModal({
  open,
  handlePopupClose,
  newProfilePic,
  handleProfileChange,
  uploadImage,
  progress,
}) {
  return (
    <Modal
      open={open}
      title="Update Profile Photo"
      onOk={() => handlePopupClose(false)}
      onCancel={() => handlePopupClose(false)}
      footer={[
        <Button
          key="update-image"
          type="primary"
          loading={progress > 0 ? true : false}
          disabled={newProfilePic.name ? false : true}
          onClick={uploadImage}
        >
          Update Photo
        </Button>,
      ]}
    >
      <div className="upload-image-container">
        {newProfilePic.name ? <p>{newProfilePic.name}</p> : <></>}
        <label htmlFor="upload-image" className="upload-image">
          Upload Photo
        </label>
        <input
          hidden
          id="upload-image"
          type="file"
          onChange={handleProfileChange}
        />
        {progress === 0 ? (
          <></>
        ) : (
          <div className="upload-progress">
            <Progress type="circle" percent={progress} size={50} />
          </div>
        )}
      </div>
    </Modal>
  );
}
