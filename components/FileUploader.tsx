import React from "react";

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
}
const FileUploader: React.FC<FileUploaderProps> = ({ ownerId, accountId }) => {
  return <div>FileUploader</div>;
};

export default FileUploader;
