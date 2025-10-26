import NotesClient from "@/app/notes/Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Notes = async () => {
  const queryClient = new QueryClient();

  const initialParams = {
    page: 1,
    perPage: 12,
    search: "",
  };

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialParams.page, initialParams.search],
    queryFn: () => fetchNotes(initialParams),
    retry: false,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialParams={initialParams} />
    </HydrationBoundary>
  );
};

export default Notes;
