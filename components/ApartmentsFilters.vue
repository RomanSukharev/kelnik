<script setup lang="ts">
import CustomMinMaxSlider from '~/ui-kits/slider/CustomMinMaxSlider.vue';
import CustomTabs from '~/ui-kits/tabs/CustomTabs.vue';

const store = useApartmentsStore();

const tabs = computed(() => {
  return store.typeOptions.map(type => ({
    title: type,
    value: type,
    disabled: !store.flatList.some(flat => flat.type === type),
  }));
});

const router = useRouter();

const resetFilters = () => {
  router.replace({ query: {} });
  store.resetAllFilters();
};
</script>

<template>
  <div class="apartments-filters">
    <CustomTabs 
      v-model="store.typeCurrent"
      :tabs="tabs"
      class="apartments-filters__tabs"
    />

    <div class="apartments-filters__group">
      <span class="apartments-filters__title">Стоимость квартиры, ₽</span>

      <CustomMinMaxSlider 
        v-model:min-value="store.costMin"
        v-model:max-value="store.costMax"
        :min="store.costAvailableMin"
        :max="store.costAvailableMax"
        format-currency
        class="apartments-filters__slider"
      />
    </div>

    <div class="apartments-filters__group">
      <span class="apartments-filters__title">Площадь, м²</span>

      <CustomMinMaxSlider 
        v-model:min-value="store.squareMin"
        v-model:max-value="store.squareMax"
        :min="store.squareAvailableMin"
        :max="store.squareAvailableMax"
        class="apartments-filters__slider"
      />
    </div>

    <div class="apartments-filters__reset">
      <button 
        type="button" 
        class="apartments-filters__reset-btn" 
        @click="resetFilters"
      >
        Сбросить параметры
      </button>

      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="8" 
        height="8" 
        viewBox="0 0 8 8" 
        fill="none" 
        class="apartments-filters__reset-icon"
      >
        <path d="M6.62305 0.155212C6.87819 -0.0999281 7.35879 -0.0338357 7.69629 0.30365C8.03379 0.641154 8.09987 1.12175 7.84473 1.37689L5.22168 3.99994L7.84473 6.62299C8.09986 6.87812 8.03374 7.35873 7.69629 7.69623C7.35878 8.03373 6.87819 8.09981 6.62305 7.84467L4 5.22162L1.37695 7.84467C1.1218 8.09978 0.641202 8.03372 0.303711 7.69623C-0.0337612 7.35874 -0.099831 6.87813 0.155273 6.62299L2.77832 3.99994L0.155273 1.37689C-0.0996841 1.12184 -0.0333908 0.642079 0.303711 0.304626C0.641185 -0.0328477 1.12179 -0.0998533 1.37695 0.155212L4 2.77826L6.62305 0.155212Z" fill="#FF0000"/>

        <path d="M6.62305 0.155212C6.87819 -0.0999281 7.35879 -0.0338357 7.69629 0.30365C8.03379 0.641154 8.09987 1.12175 7.84473 1.37689L5.22168 3.99994L7.84473 6.62299C8.09986 6.87812 8.03374 7.35873 7.69629 7.69623C7.35878 8.03373 6.87819 8.09981 6.62305 7.84467L4 5.22162L1.37695 7.84467C1.1218 8.09978 0.641202 8.03372 0.303711 7.69623C-0.0337612 7.35874 -0.099831 6.87813 0.155273 6.62299L2.77832 3.99994L0.155273 1.37689C-0.0996841 1.12184 -0.0333908 0.642079 0.303711 0.304626C0.641185 -0.0328477 1.12179 -0.0998533 1.37695 0.155212L4 2.77826L6.62305 0.155212Z" fill="#0B1739"/>
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.apartments-filters {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  background: #E2F3E5;
  border-radius: 8px;

  &__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    @include setFontStyle2;
    color: $c_text;
  }

  &__reset {
    display: flex;
    justify-content: flex-start;
    padding: 5px 16px 7px 16px;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  &__reset-btn {
    @include setFontStyle2;
    color: $c_text;
    border: none;
    background: none;
    cursor: pointer;
  }

}

@media screen and (max-width: 960px) {
  .apartments-filters {
    padding: 20px;
  }
}
</style>