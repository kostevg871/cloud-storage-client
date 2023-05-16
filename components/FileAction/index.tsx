import React from "react";
import styles from "./FileAction.module.scss";
import { Button, Popconfirm } from "antd";

interface FileActionProps {
  onClickRemove: VoidFunction;
  onClickShare: VoidFunction;
  isActive: boolean;
}

export const FileAction: React.FC<FileActionProps> = ({
  onClickRemove,
  onClickShare,
  isActive,
}) => {
  return (
    <div className={styles.root}>
      <Button onClick={onClickShare} disabled={!isActive}>
        Поделиться
      </Button>
      <Popconfirm
        disabled={!isActive}
        title="Удалить файлы?"
        description="Все файлы будут перемещены в корзину"
        okText="Да"
        cancelText="Нет"
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Удалить
        </Button>
      </Popconfirm>
    </div>
  );
};
