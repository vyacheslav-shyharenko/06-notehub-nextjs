"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useToggle } from "@/hooks/useToggle";
import { fetchNotes } from "@/lib/api";
import {
  DehydratedState,
  HydrationBoundary,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  dehydratedState?: DehydratedState;
}

export default function NotesClient({ dehydratedState }: NotesClientProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Notes />
    </HydrationBoundary>
  );
}

function Notes() {
  const [params, setParams] = useState({ page: 1, perPage: 12, search: "" });
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isOpen, toggle] = useToggle(false);

  useEffect(() => {
    setParams((prev) => ({ ...prev, page: 1, search: debouncedSearch }));
  }, [debouncedSearch]);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", params.page, debouncedSearch],
    queryFn: () => fetchNotes(params),
    placeholderData: keepPreviousData,
  });

  const { notes = [], totalPages = 1 } = data ?? {};

  const handlePageChange = ({ selected }: { selected: number }) => {
    setParams((prev) => ({ ...prev, page: selected + 1 }));
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox setSearch={setSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={params.page}
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
}
