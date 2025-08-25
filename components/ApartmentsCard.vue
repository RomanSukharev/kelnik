<script setup lang="ts">
import { formatNumber } from '~/helpers/formatNumber';

const props = defineProps<{
  id: number;
  type: string;
  name: string;
  number: string;
  square: number;
  floor: number;
  maxFloor: number;
  cost: number;
  image: string;
}>();
</script>

<template>
  <div class="apartment-card">
    <img 
      :src="props.image" 
      :alt="`Квартира ${props.number}`" 
      class="apartment-card__image" 
    />

    <div class="apartment-card__type">
      <span class="apartment-card__name">{{ props.name }} №{{ props.number }}</span>
    </div>

    <div class="apartment-card__details">
      <div class="apartment-card__square">
        <span class="apartment-card__square-value">{{ props.square }}</span>
      </div>

      <div class="apartment-card__floor">
        <span class="apartment-card__floor-current">{{ props.floor }}</span>

        <span class="apartment-card__floor-max"> из {{ props.maxFloor }}</span>
      </div>

      <div class="apartment-card__cost">
        {{ formatNumber(props.cost) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.apartment-card {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr 2fr;
  align-items: start;
  padding: 16px 0 24px 0;
  border-bottom: 1px solid #e5e5e5;
  gap: 20px;

  &__image {
    width: 66px;
    height: 63px;
    object-fit: contain;
    aspect-ratio: 1/1;
    margin: 8px 7px 9px 7px;
  }

  &__type {
    font-weight: 500;
    color: #1a1a1a;
  }

  &__name {
    @include setFontStyle7;
    color: $c_text;
  }

  &__details {
    display: contents;
  }

  &__square {

    &-value {
      @include setFontStyle4;
      color: $c_text;
    }
  }

  &__floor {

    &-current {
      @include setFontStyle4;
      color: $c_text;
    }

    &-max {
      @include setFontStyle4;
      color: $c_text_second;
    }
  }

  &__cost {
    @include setFontStyle4;
    color: $c_text;
  }
}

@media screen and (max-width: 960px) {
  .apartment-card {
    grid-template-columns: 1fr 66px;
    grid-template-rows: auto auto;
    gap: 16px 20px;
    padding: 16px 24px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    align-items: start;

    &__image {
      grid-row: 1 / span 2;
      grid-column: 2;
      object-fit: cover;
      align-self: center;
    }

    &__type {
      grid-row: 1;
      grid-column: 1;
      align-self: start;
    }

    &__details {
      display: flex;
      align-items: center;
      gap: 20px;
      grid-row: 2;
      grid-column: 1;
    }

    &__square,
    &__floor,
    &__cost {
      display: flex;
      min-width: 0;
      align-items: center;
      gap: 4px;
    }

    &__square-value,
    &__floor-current,
    &__floor-max,
    &__cost {
      @include setFontStyle4;
      color: $c_text;
      white-space: nowrap;
    }

    &__floor-max {
      color: $c_text_second;

    }
  }

  .apartment-list {
    gap: 4px;
  }
}
</style>