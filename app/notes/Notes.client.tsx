"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useToggle } from "@/hooks/useToggle";
import { apiParams, fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./NotePage.module.css";

interface NotesClientProps {
  initialParams: apiParams;
}

const NotesClient = ({ initialParams }: NotesClientProps) => {
  const [params, setParams] = useState(initialParams);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isOpen, toggle] = useToggle(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", params.page, debouncedSearch],
    queryFn: () => fetchNotes(params),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  const { notes = [], totalPages = 1 } = data ?? {};

  const handlePageChange = ({ selected }: { selected: number }) => {
    setParams((prev) => ({
      ...prev,
      page: selected + 1,
    }));
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox setSearch={setSearch} />

        {totalPages > 1 && (
          <Pagination
            currentPage={params.page ?? 1}
            totalPages={totalPages}
            onChangePage={handlePageChange}
          />
        )}

        <button onClick={toggle} className={css.button}>
          Create note +
        </button>
      </header>

      {isSuccess && <NoteList notes={notes} />}

      {isOpen && (
        <Modal onClose={toggle}>
          <NoteForm onCancel={toggle} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
