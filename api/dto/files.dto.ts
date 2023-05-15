import { User } from "./auth.dto";

export interface FileItem {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  user: User;
  deleteAt: string | null;
  id: number;
}
