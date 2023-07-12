import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { Button, Modal, Progress } from "antd";

import "./index.scss";
import ReactQuill from "react-quill";

export default function ModalComponent({
  modalTitle,
  modalButtonText,
  modalOpen,
  handleModalClose,
  setStatus,
  status,
  modalAction,
  handlePostImageChange,
  modalCurrentImage,
  modalImageUploadProgress,
}) {
  return (
    <>
      <Modal
        title={modalTitle}
        centered
        open={modalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <hr key="hr-divider" className="hr-divider" />,
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={modalAction}
          >
            {modalButtonText}
          </Button>,
        ]}
      >
        <ReactQuill
          theme="snow"
          className="modal-input"
          placeholder="What do you want to talk about?"
          value={status}
          onChange={setStatus}
        />

        {modalCurrentImage ? (
          <img
            className="post-image"
            src={modalCurrentImage}
            alt="post-image"
          />
        ) : null}

        {modalImageUploadProgress === 0 || modalImageUploadProgress === 100 ? (
          <label
            htmlFor="modal-photo-upload-input"
            className="modal-photo-icon-label"
          >
            <div className="modal-photo-icon">
              <BsCardImage />
            </div>
          </label>
        ) : (
          <div>
            <Progress
              type="circle"
              percent={modalImageUploadProgress}
              size={56}
            />
          </div>
        )}

        <input
          id="modal-photo-upload-input"
          type="file"
          hidden
          onChange={handlePostImageChange}
        />
      </Modal>
    </>
  );
}
