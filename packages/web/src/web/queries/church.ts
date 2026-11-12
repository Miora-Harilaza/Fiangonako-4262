import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../lib/api";
export function useEvents() {
  return useQuery(orpc.church.events.queryOptions());
}
export function useAccess(enabled = true) {
  return useQuery(orpc.church.access.queryOptions({ enabled, retry: false }));
}
export function useMembers(enabled = true) {
  return useQuery(orpc.church.members.queryOptions({ enabled, retry: false }));
}
export function useSaveEvent() {
  const q = useQueryClient();
  return useMutation(
    orpc.church.saveEvent.mutationOptions({
      onSuccess: () => q.invalidateQueries({ queryKey: orpc.church.events.key() }),
    }),
  );
}
export function useDeleteEvent() {
  const q = useQueryClient();
  return useMutation(
    orpc.church.deleteEvent.mutationOptions({
      onSuccess: () => q.invalidateQueries({ queryKey: orpc.church.events.key() }),
    }),
  );
}
export function useSaveMember() {
  const q = useQueryClient();
  return useMutation(
    orpc.church.saveMember.mutationOptions({
      onSuccess: () => q.invalidateQueries({ queryKey: orpc.church.members.key() }),
    }),
  );
}
export function useDeleteMember() {
  const q = useQueryClient();
  return useMutation(
    orpc.church.deleteMember.mutationOptions({
      onSuccess: () => q.invalidateQueries({ queryKey: orpc.church.members.key() }),
    }),
  );
}
export type ChurchEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  location: string;
  description: string;
  demo: boolean;
};
export type ChurchMember = {
  id: number;
  name: string;
  email: string;
  phone: string;
  group: string;
};
