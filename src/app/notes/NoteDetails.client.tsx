"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";

type NoteDetailsClientProps = {
  id: string;
};

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    data && (
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    )
  );
}
