import { FileItem } from "@/api/dto/files.dto";
import React from "react";
import styles from "./FileList.module.scss";
import { FileCard } from "../FileCard";
import Selecto from "react-selecto";
import Document from "next/document";

export type FileSelectType = "select" | "unselect";

interface FileListProps {
  items: FileItem[];
  onFileSelect: (id: number, type: FileSelectType) => void;
}

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div data-id={item.id} key={item.id} className="file">
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}
      <Selecto
        container={document.body}
        selectableTargets={[".file"]}
        selectByClick
        hitRate={35}
        selectFromInside
        toggleContinueSelect={["shift"]}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("active");
            onFileSelect(Number(el.dataset["id"]), "select");
          });
          e.removed.forEach((el) => {
            el.classList.remove("active");
            onFileSelect(Number(el.dataset["id"]), "unselect");
          });
        }}
      />
    </div>
  );
};
