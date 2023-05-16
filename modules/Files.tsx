import { FileItem } from "@/api/dto/files.dto";
import { FileAction } from "@/components/FileAction";
import { FileList, FileSelectType } from "@/components/FileList";
import { Empty } from "antd";
import React from "react";
import * as Api from "@/api";

interface FilesProps {
  items: FileItem[];
  withAction?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withAction }) => {
  const [files, setFiles] = React.useState(items || []);
  const [selectIds, setSelectIds] = React.useState<number[]>([]);

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectIds((prev) => [...prev, id]);
    } else {
      setSelectIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  const onClickRemove = () => {
    setSelectIds([]);
    setFiles((prev) => prev.filter((file) => !selectIds.includes(file.id)));
    Api.files.remove(selectIds);
  };
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
              isActive={selectIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  );
};
