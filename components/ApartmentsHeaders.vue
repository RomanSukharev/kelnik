<script setup lang="ts">
import { useApartmentsStore } from '~/stores/useApartmentsStore'
const store = useApartmentsStore()

const sort = (field: 'square' | 'floor' | 'cost') => store.setSort(field)

const getSortIconColor = (field: 'square' | 'floor' | 'cost', isUpArrow: boolean) => {
  if (store.sortField !== field) return '#0B1739'
  if (store.sortDirection === 'asc' && isUpArrow) return '#3EB57C'
  if (store.sortDirection === 'desc' && !isUpArrow) return '#3EB57C'
  return '#0B1739'
}

const getTextColor = (field: 'square' | 'floor' | 'cost') =>
  store.sortField === field ? '#3EB57C' : '#0B1739'
</script>

<template>
  <div class="apartments-headers">
    <span class="apartments-headers__item">Планировка</span>

    <span class="apartments-headers__item">Квартира</span>

    <span 
      class="apartments-headers__sortable" 
      :style="{ color: getTextColor('square') }"
      @click="sort('square')"
    >
      S, м²
      <div class="apartments-headers__sort-icons">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="7" 
          height="4" 
          viewBox="0 0 7 4" 
          fill="none"
        >
          <g :opacity="store.sortField === 'square' && store.sortDirection === 'asc' ? '1' : '0.4'">
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd"
              d="M4.03447 0.253496C3.8722 0.0898395 3.65794 2.7968e-07 3.42826 2.9976e-07C3.19914 3.1979e-07 2.98374 0.0898396 2.82262 0.253496L0.167524 3.01277C-0.0558768 3.2388 -0.0558768 3.60445 0.167524 3.83048C0.390353 4.05651 0.752023 4.05651 0.975423 3.83048L3.42826 1.27549L5.88167 3.83048C6.10507 4.05651 6.46617 4.05651 6.68957 3.83048C6.91297 3.60445 6.91297 3.2388 6.68957 3.01277L4.03447 0.253496Z"
              :fill="getSortIconColor('square', true)"
            />
          </g>
        </svg>

        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="7" 
          height="4" 
          viewBox="0 0 7 4" 
          fill="none"
        >
          <g :opacity="store.sortField === 'square' && store.sortDirection === 'desc' ? '1' : '0.4'">
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd"
              d="M2.82332 3.7465C2.98558 3.91016 3.19984 4 3.42953 4C3.65864 4 3.87404 3.91016 4.03517 3.7465L6.69026 0.987232C6.91366 0.761203 6.91366 0.395551 6.69026 0.169522C6.46743 -0.0565073 6.10577 -0.0565073 5.88236 0.169522L3.42953 2.72451L0.976121 0.169522C0.75272 -0.0565073 0.391623 -0.0565073 0.168222 0.169522C-0.0551788 0.395551 -0.0551788 0.761203 0.168222 0.987232L2.82332 3.7465Z"
              :fill="getSortIconColor('square', false)"
            />
          </g>
        </svg>
      </div>
    </span>

    <span 
      class="apartments-headers__sortable" 
      :style="{ color: getTextColor('floor') }"
      @click="sort('floor')"
    >
      Этаж
      <div class="apartments-headers__sort-icons">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="7" 
          height="4" 
          viewBox="0 0 7 4" 
          fill="none"
        >
          <g :opacity="store.sortField === 'floor' && store.sortDirection === 'asc' ? '1' : '0.4'">
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd"
              d="M4.03447 0.253496C3.8722 0.0898395 3.65794 2.7968e-07 3.42826 2.9976e-07C3.19914 3.1979e-07 2.98374 0.0898396 2.82262 0.253496L0.167524 3.01277C-0.0558768 3.2388 -0.0558768 3.60445 0.167524 3.83048C0.390353 4.05651 0.752023 4.05651 0.975423 3.83048L3.42826 1.27549L5.88167 3.83048C6.10507 4.05651 6.46617 4.05651 6.68957 3.83048C6.91297 3.60445 6.91297 3.2388 6.68957 3.01277L4.03447 0.253496Z"
              :fill="getSortIconColor('floor', true)"
            />
          </g>
        </svg>

        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="7" 
          height="4" 
          viewBox="0 0 7 4" 
          fill="none"
        >
          <g :opacity="store.sortField === 'floor' && store.sortDirection === 'desc' ? '1' : '0.4'">
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd"
              d="M2.82332 3.7465C2.98558 3.91016 3.19984 4 3.42953 4C3.65864 4 3.87404 3.91016 4.03517 3.7465L6.69026 0.987232C6.91366 0.761203 6.91366 0.395551 6.69026 0.169522C6.46743 -0.0565073 6.10577 -0.0565073 5.88236 0.169522L3.42953 2.72451L0.976121 0.169522C0.75272 -0.0565073 0.391623 -0.0565073 0.168222 0.169522C-0.0551788 0.395551 -0.0551788 0.761203 0.168222 0.987232L2.82332 3.7465Z"
              :fill="getSortIconColor('floor', false)"
            />
          </g>
        </svg>
      </div>
    </span>

    <span 
      class="apartments-headers__sortable" 
      :style="{ color: getTextColor('cost') }"
      @click="sort('cost')"
    >
      Цена, ₽
      <div class="apartments-headers__sort-icons">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="7" 
          height="4" 
          viewBox="0 0 7 4" 
          fill="none"
        >
          <g :opacity="store.sortField === 'cost' && store.sortDirection === 'asc' ? '1' : '0.4'">
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd"
              d="M4.03447 0.253496C3.8722 0.0898395 3.65794 2.7968e-07 3.42826 2.9976e-07C3.19914 3.1979e-07 2.98374 0.0898396 2.82262 0.253496L0.167524 3.01277C-0.0558768 3.2388 -0.0558768 3.60445 0.167524 3.83048C0.390353 4.05651 0.752023 4.05651 0.975423 3.83048L3.42826 1.27549L5.88167 3.83048C6.10507 4.05651 6.46617 4.05651 6.68957 3.83048C6.91297 3.60445 6.91297 3.2388 6.68957 3.01277L4.03447 0.253496Z"
              :fill="getSortIconColor('cost', true)"
            />
          </g>
        </svg>

        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="7" 
          height="4" 
          viewBox="0 0 7 4" 
          fill="none"
        >
          <g :opacity="store.sortField === 'cost' && store.sortDirection === 'desc' ? '1' : '0.4'">
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd"
              d="M2.82332 3.7465C2.98558 3.91016 3.19984 4 3.42953 4C3.65864 4 3.87404 3.91016 4.03517 3.7465L6.69026 0.987232C6.91366 0.761203 6.91366 0.395551 6.69026 0.169522C6.46743 -0.0565073 6.10577 -0.0565073 5.88236 0.169522L3.42953 2.72451L0.976121 0.169522C0.75272 -0.0565073 0.391623 -0.0565073 0.168222 0.169522C-0.0551788 0.395551 -0.0551788 0.761203 0.168222 0.987232L2.82332 3.7465Z"
              :fill="getSortIconColor('cost', false)"
            />
          </g>
        </svg>
      </div>
    </span>
  </div>
</template>

<style lang="scss">
.apartments-headers {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr 2fr;
  gap: 20px;
  font-size: 14px;
  color: #333;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;

  &__item {
    @include setFontStyle6;
    color: $c_text;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__sortable {
    @include setFontStyle6;
    color: $c_text;
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #3EB57C;
    }
  }

  &__sort-icons {
    display: flex;
    gap: 2px;
    flex-direction: column;
  }
}

@media screen and (max-width: 960px) {

  .apartments-headers {
    display: flex;
    padding: 8px 0;
  }
  .apartments-headers__item {
    display: none;
  }

  .apartments-headers {
    border-bottom: none;
  }
}
</style>