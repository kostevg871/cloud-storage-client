import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, notification } from "antd";
import React from "react";
import styles from "@/styles/Home.module.scss";
import * as Api from "@/api";

export const UploadButton: React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onUploadSuccess = async (options: any) => {
    try {
      const file = await Api.files.uploadFile(options);

      setFileList([]);
    } catch (err) {
      notification.error({
        message: "Ошибка!",
        description: "Не удалось загрузить файл",
        duration: 2,
      });
    }
  };

  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      className={styles.upload}
      onChange={({ fileList }) => setFileList(fileList)}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Загрузить файл
      </Button>
    </Upload>
  );
};
