<script setup lang="ts">
interface ITabProps {
  title: string
  value: string
  disabled?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const props = withDefaults(
  defineProps<{
    tabs?: ITabProps[]
    modelValue?: string[]
  }>(),
  {
    tabs: () => [],
    modelValue: () => [],
  }
)

const toggleType = (type: string) => {
  const current = [...props.modelValue]
  if (current.includes(type)) {
    emit('update:modelValue', current.filter(t => t !== type))
  } else {
    emit('update:modelValue', [...current, type])
  }
}
</script>

<template>
  <div class="tabs">
    <div class="tabs__header">
      <button
        v-for="tab in props.tabs"
        :key="tab.value"
        type="button"
        class="tabs__button"
        :class="{
          'tabs__button--active': props.modelValue.includes(tab.value),
          'tabs__button--disabled': tab.disabled
        }"
        :disabled="tab.disabled"
        @click="toggleType(tab.value)"
      >
        {{ tab.title }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.tabs {
  display: flex;
  justify-content: start;

  &__header {
    display: flex;
    gap: 16px;
  }

  &__button {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    @include setFontStyle3;
    color: #333;
    transition: all 0.3s ease;
    border-radius: 50%;
    background:#FFF;

    &--active {
      color: white;
      border-radius: 12.5rem;
      @include setFontStyle3;
      background: #3EB57C;
      box-shadow: 0 6px 20px 0 #95D0A1;
    }

    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
      pointer-events: none;
      color: #999;
    }
  }
}
</style>