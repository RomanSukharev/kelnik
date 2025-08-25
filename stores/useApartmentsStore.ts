import type { IApartmentProps, TAny } from "~/types";

export const useApartmentsStore = defineStore("apartments", () => {
  const router = useRouter();
  const { apartments } = useApartments();

  watchEffect(() => {
    if (apartments.value.length) {
      flatList.value = apartments.value;
    }
  });

  const sortField = ref<'square' | 'floor' | 'cost' | null>(null)
  const sortDirection = ref<'asc' | 'desc' | null>(null)

  const setSort = (field: 'square' | 'floor' | 'cost') => {
    if (sortField.value === field) {
      if (sortDirection.value === 'asc') { sortDirection.value = 'desc' }
      else if (sortDirection.value === 'desc') {
        sortField.value = null
        sortDirection.value = null
      } else {
        sortDirection.value = 'asc'
      }
    } else {
      sortField.value = field
      sortDirection.value = 'asc'
    }
  }

  const applySort = (arr: IApartmentProps[]) => {
    if (!sortField.value || !sortDirection.value) return arr
    const key = sortField.value
    return [...arr].sort((a, b) =>
      sortDirection.value === 'asc'
        ? (a as TAny)[key] - (b as TAny)[key]
        : (b as TAny)[key] - (a as TAny)[key]
    )
  }

  const flatList = ref<IApartmentProps[]>([]);
  const flatListFiltered = computed(() => {
    let result: IApartmentProps[] | string[] = flatList.value;

    if (router.currentRoute.value.query.squareMin) {
      result = result.filter((i) => i.square >= +(router.currentRoute.value.query.squareMin as string));
    }

    if (router.currentRoute.value.query.squareMax) {
      result = result.filter((i) => i.square <= +(router.currentRoute.value.query.squareMax as string));
    }

    if (router.currentRoute.value.query.costMin) {
      result = result.filter((i) => i.cost >= +(router.currentRoute.value.query.costMin as string));
    }

    if (router.currentRoute.value.query.costMax) {
      result = result.filter((i) => i.cost <= +(router.currentRoute.value.query.costMax as string));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => typeCurrent.value.includes(i.type));
    }

    return applySort(result)
  });

  const defineType = (val: TAny) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return [val];
  };

  // ------------ TYPE -------------------------------

  const filteredTypes = computed<Set<string>>(() => {
    const result = new Set<string>();

    let filtered = [...flatList.value];

    if (router.currentRoute.value.query.squareMin) {
      filtered = filtered.filter((i) => i.square >= +(router.currentRoute.value.query.squareMin as string));
    }

    if (router.currentRoute.value.query.squareMax) {
      filtered = filtered.filter((i) => i.square <= +(router.currentRoute.value.query.squareMax as string));
    }

    if (router.currentRoute.value.query.costMin) {
      filtered = filtered.filter((i) => i.cost >= +(router.currentRoute.value.query.costMin as string));
    }

    if (router.currentRoute.value.query.costMax) {
      filtered = filtered.filter((i) => i.cost <= +(router.currentRoute.value.query.costMax as string));
    }

    filtered.forEach(item => result.add(item.type));

    return result;
  });

  const typeOptions = computed<string[]>(() => {
    return [...new Set(flatList.value.map((i) => i.type))].sort((a, b) => {
      const aType = isNaN(parseInt(a[0])) ? "letter" : "number";
      const bType = isNaN(parseInt(b[0])) ? "letter" : "number";

      if (aType !== bType) {
        return aType === "letter" ? -1 : 1;
      }

      if (aType === "number") {
        return parseInt(a) - parseInt(b);
      }
      return a.localeCompare(b);
    });
  });

  const availableTypesByOtherFilters = computed<Set<string>>(() => {
    let result = flatList.value;

    if (router.currentRoute.value.query.squareMin) {
      result = result.filter((i) => i.square >= +(router.currentRoute.value.query.squareMin as string));
    }

    if (router.currentRoute.value.query.squareMax) {
      result = result.filter((i) => i.square <= +(router.currentRoute.value.query.squareMax as string));
    }

    if (router.currentRoute.value.query.costMin) {
      result = result.filter((i) => i.cost >= +(router.currentRoute.value.query.costMin as string));
    }

    if (router.currentRoute.value.query.costMax) {
      result = result.filter((i) => i.cost <= +(router.currentRoute.value.query.costMax as string));
    }

    return new Set(result.map((i) => i.type));
  });

  const typeCurrent = computed<string[]>({
    get: () => defineType(router.currentRoute.value.query.types),
    set: (val: string[]) => {
      router.replace({ query: { ...router.currentRoute.value.query, types: val } });
    },
  });

  // ------------ COST --------------------------------------

  const resultForCost = computed<IApartmentProps[]>(() => {
    let result: IApartmentProps[] = flatList.value;

    if (router.currentRoute.value.query.squareMin) {
      result = result.filter((i) => i.square >= +(router.currentRoute.value.query.squareMin as string));
    }

    if (router.currentRoute.value.query.squareMax) {
      result = result.filter((i) => i.square <= +(router.currentRoute.value.query.squareMax as string));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => typeCurrent.value.includes(i.type));
    }

    return result;
  });

  const costMin = computed<string>({
    get: (): string => {
      if (flatList.value.length) {
        const result_costMin =
          +(router.currentRoute.value.query.costMin as string) >=
            Math.min(...resultForCost.value.map((i) => i.cost))
            ? +(router.currentRoute.value.query.costMin as string)
            : Math.min(...resultForCost.value.map((i) => i.cost));

        return (isFinite(result_costMin) ? result_costMin : 0).toLocaleString("ru-RU");
      }

      return "0";
    },
    set: (val: string) => {
      const valConverted = +val.replace(/\s+/g, "");
      const costMaxConverted = +costMax.value.replace(/\s+/g, "");

      const arrayForMinCost = [
        ...new Set(
          resultForCost.value
            .filter((item) => item.cost <= costMaxConverted)
            .map((item) => item.cost)
        ),
      ].sort((a, b) => a - b);

      if (!arrayForMinCost.length) return;

      const lowerOrEqual = [...arrayForMinCost].reverse().find(c => c <= valConverted);
      const fallback = Math.min(...arrayForMinCost);
      const newValue = lowerOrEqual ?? fallback;

      router.replace({
        query: {
          ...router.currentRoute.value.query,
          costMin: newValue === fallback ? undefined : newValue,
        },
      });
    },
  });

  const costMax = computed<string>({
    get: () => {
      if (flatList.value.length) {
        const result_costMax =
          +(router.currentRoute.value.query.costMax as string) <=
            Math.max(...resultForCost.value.map((i) => i.cost))
            ? +(router.currentRoute.value.query.costMax as string)
            : Math.max(...resultForCost.value.map((i) => i.cost));

        return (isFinite(result_costMax) ? result_costMax : 0).toLocaleString("ru-RU");
      }
      return "0";
    },
    set: (val: string) => {
      const valConverted = +val.replace(/\s+/g, "");
      const costMinConverted = +costMin.value.replace(/\s+/g, "");

      const arrayForMaxCost = [
        ...new Set(
          resultForCost.value
            .filter((item) => item.cost >= costMinConverted)
            .map((item) => item.cost)
        ),
      ].sort((a, b) => a - b);

      if (!arrayForMaxCost.length) return;

      const higherOrEqual = arrayForMaxCost.find(c => c >= valConverted);
      const fallback = Math.max(...arrayForMaxCost);
      const newValue = higherOrEqual ?? fallback;

      router.replace({
        query: {
          ...router.currentRoute.value.query,
          costMax: newValue === fallback ? undefined : newValue,
        },
      });
    },
  });

  // ------------ COST end--------------------------------------

  // ------------ SQUARE -------------------------------------

  const resultForSquare = computed<IApartmentProps[]>(() => {
    let result: IApartmentProps[] = flatList.value;

    if (router.currentRoute.value.query.costMin) {
      result = result.filter((i) => i.cost >= +(router.currentRoute.value.query.costMin as string));
    }

    if (router.currentRoute.value.query.costMax) {
      result = result.filter((i) => i.cost <= +(router.currentRoute.value.query.costMax as string));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => typeCurrent.value.includes(i.type));
    }
    return result;
  });

  const squareMin = computed<number>({
    get: () => {
      if (flatList.value.length) {
        const resultSquareMin =
          +(router.currentRoute.value.query.squareMin as string) >=
            Math.min(...resultForSquare.value.map((i) => i.square))
            ? +(router.currentRoute.value.query.squareMin as string)
            : Math.min(...resultForSquare.value.map((i) => i.square));

        return isFinite(resultSquareMin) ? Math.floor(resultSquareMin) : 0;
      }
      return 0;
    },
    set: (val: number) => {

      const arrayForMinSquare = [
        ...new Set(
          resultForSquare.value
            .filter((item) => item.square <= squareMax.value)
            .map((item) => item.square)
        ),
      ].sort((a, b) => a - b);

      if (!arrayForMinSquare.length) return;

      const closestInArr = closest(arrayForMinSquare, val);

      if (val >= Math.floor(Math.min(...arrayForMinSquare)) && val <= squareMax.value) {
        if (+val === Math.floor(Math.min(...arrayForMinSquare))) {
          router.replace({
            query: { ...router.currentRoute.value.query, squareMin: undefined },
          });
          return;
        }

        router.replace({ query: { ...router.currentRoute.value.query, squareMin: val } });
      } else {
        router.replace({
          query: {
            ...router.currentRoute.value.query,
            squareMin: Math.floor(closestInArr),
          },
        });
      }
    },
  });

  const squareMax = computed<number>({
    get: () => {
      if (!flatList.value.length) return 0;

      const maxSquare = Math.max(...resultForSquare.value.map((i) => i.square));
      const querySquare = +(router.currentRoute.value.query.squareMax as string);

      const resultSquareMax = querySquare <= maxSquare ? querySquare : maxSquare;
      return isFinite(resultSquareMax) ? Math.ceil(resultSquareMax) : 0;
    },
    set: (val: number) => {

      const arrayForMaxSquare = [
        ...new Set(
          resultForSquare.value
            .filter((item) => item.square >= squareMin.value)
            .map((item) => item.square)
        ),
      ].sort((a, b) => a - b);

      if (!arrayForMaxSquare.length) return;

      const closestInArr = closest(arrayForMaxSquare, val);

      if (val <= Math.ceil(Math.max(...arrayForMaxSquare)) && val >= squareMin.value) {
        if (+val === Math.ceil(Math.max(...arrayForMaxSquare))) {
          router.replace({
            query: { ...router.currentRoute.value.query, squareMax: undefined },
          });
          return;
        }

        router.replace({ query: { ...router.currentRoute.value.query, squareMax: val } });
      } else {
        router.replace({
          query: { ...router.currentRoute.value.query, squareMax: Math.ceil(closestInArr) },
        });
      }
    },
  });

  // ------------ SQUARE END -------------------------------
  watch(
    () => [costMin.value, costMax.value],
    ([min, max]) => {
      const minNum = min ? Number(min.replace(/\s/g, "")) : undefined;
      const maxNum = max ? Number(max.replace(/\s/g, "")) : undefined;

      if (minNum && maxNum && minNum > maxNum) {
        const correctedMin = Math.min(minNum, maxNum);
        const correctedMax = Math.max(minNum, maxNum);

        router.replace({
          query: {
            ...router.currentRoute.value.query,
            costMin: correctedMin,
            costMax: correctedMax,
          },
        });
      }
    }
  );

  watch(
    () => [squareMin.value, squareMax.value],
    ([min, max]) => {
      if (min && max && min > max) {
        const correctedMin = Math.min(min, max);
        const correctedMax = Math.max(min, max);

        router.replace({
          query: {
            ...router.currentRoute.value.query,
            squareMin: correctedMin,
            squareMax: correctedMax,
          },
        });
      }
    }
  );

  const costAvailableMin = computed(() => {
    if (!resultForCost.value.length) return 0;
    return Math.min(...resultForCost.value.map(i => i.cost));
  });

  const costAvailableMax = computed(() => {
    if (!resultForCost.value.length) return 0;
    return Math.max(...resultForCost.value.map(i => i.cost));
  });

  const squareAvailableMin = computed(() => {
    if (!resultForSquare.value.length) return 0;
    return Math.floor(Math.min(...resultForSquare.value.map(i => i.square)));
  });

  const squareAvailableMax = computed(() => {
    if (!resultForSquare.value.length) return 0;
    return Math.ceil(Math.max(...resultForSquare.value.map(i => i.square)));
  });

  const closest = (a: TAny[], g: number) => {
    if (!a.length) return g;
    return a.reduce((p, c) =>
      (Math.abs(c - g) < Math.abs(p - g) ? c : p)
    );
  };

  const resetAllFilters = () => {
    sortField.value = null;
    sortDirection.value = null;

    router.replace({ query: {} });

    setTimeout(() => {
      flatList.value = [...apartments.value];
    }, 0);
  };

  return {
    flatList,
    flatListFiltered,
    typeOptions,
    typeCurrent,
    costMin,
    costMax,
    resultForCost,
    squareMin,
    squareMax,
    resultForSquare,
    sortField,
    sortDirection,
    setSort,
    resetAllFilters,
    filteredTypes,
    availableTypesByOtherFilters,

    costAvailableMin,
    costAvailableMax,
    squareAvailableMin,
    squareAvailableMax
  };
});