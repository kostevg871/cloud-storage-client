import { FileItem } from "@/api/dto/files.dto";
import { FileAction } from "@/components/FileAction";
import { FileList } from "@/components/FileList";
import { Empty } from "antd";
import React from "react";

interface FilesProps {
  items: FileItem[];
  withAction?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withAction }) => {
  const [files, setFiles] = React.useState(items || []);

  const onClickRemove = () => {};
  const onClickShare = () => {
    alert("share");
  };

  return (
    <div>
      {files.length ? (
        <>
          {withAction && (
            <FileAction
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={false}
            />
          )}
          <FileList items={files} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  );
};
