import type { IApartmentProps } from "~/types";

export const useApartments = () => {
  const { data, pending } = useAsyncData<{ total: number; items: IApartmentProps[] }>(
    "apartments",
    async () => {
      try {
        const response = await $fetch<{ total: number; items: IApartmentProps[] }>('/apartments.json');
        return response;
      } catch (error) {
        console.error('Ошибка загрузки квартир:', error);
        return { total: 0, items: [] };
      }
    }
  );

  const apartmentsTotal = computed(() => data.value?.total || 0);
  const apartments = computed(() => data.value?.items || []);

  return {
    apartments,
    apartmentsTotal,
    pending
  }
}
