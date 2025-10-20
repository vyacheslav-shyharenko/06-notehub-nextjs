import { TypeTag } from "@/type/tag";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: TypeTag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  tag: TypeTag;
}
