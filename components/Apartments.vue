<script setup lang="ts">
import ApartmentsCard from './ApartmentsCard.vue';
import ApartmentsFilters from './ApartmentsFilters.vue';
import ApartmentsHeaders from './ApartmentsHeaders.vue';

const store = useApartmentsStore();

const visibleCount = ref(5);

const showMore = () => {
  visibleCount.value += 20;
};
</script>

<template>
  <div class="apartments">
    <div class="apartments__layout">
      <div class="apartments__main">
        <h1 class="apartments__title">Квартиры</h1>

        <ApartmentsHeaders class="apartments__headers" />

        <div class="apartments__list">
          <ApartmentsCard 
            v-for="apartment in store.flatListFiltered.slice(0, visibleCount)" 
            :id="apartment.id"
            :key="apartment.id"
            :name="apartment.name"
            :type="apartment.type"
            :number="apartment.number"
            :square="apartment.square"
            :house="apartment.house"
            :floor="apartment.floor"
            :max-floor="apartment.maxFloor"
            :cost="apartment.cost"
            :image="apartment.image"
          />
        </div>

        <button 
          v-if="visibleCount < store.flatListFiltered.length"
          type="button"
          class="apartments__show-more"
          @click="showMore"
        >
          Загрузить еще
        </button>
      </div>

      <ApartmentsFilters class="apartments__filters" />
    </div>
  </div>
</template>

<style lang="scss">
.apartments {
  padding: 80px 96px;

  &__layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 80px;
    align-items: start;
  }

  &__main {
    display: flex;
    flex-direction: column;
  }

  &__title {
    @include setFontStyle1();
    color: $c_text;
    margin-bottom: 30px;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__show-more {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 24px;
    margin-top: 48px;
    gap: 10px;
    @include setFontStyle5;
    color: $c_text;
    border-radius: 25px;
    border: 1px solid #CED1D7;
    background: none;
    width: 156px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #3EB57C;
      transition: all 0.3s ease;
    }
  }

  &__filters {
    width: 100%;
  }
}

@media screen and (max-width: 960px) {
  .apartments {
    padding: 48px 54px;

    &__layout {
      gap: 28px;
    }

    &__list {
      gap: 4px;
    }

    &__show-more {
      margin-top: 24px;
    }

      &__title {
      margin-bottom: 24px;
    }
  }
}
</style>