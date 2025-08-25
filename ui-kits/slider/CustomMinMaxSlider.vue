<script setup lang="ts">
interface IProps {
  min?: number;
  max?: number;
  step?: number;
  minValue?: number | string;
  maxValue?: number | string;
  formatCurrency?: boolean;
}

const emit = defineEmits<{
  (e: "update:minValue" | "update:maxValue", value: number | string): void;
}>();

const props = withDefaults(defineProps<IProps>(), {
  min: 0,
  max: 100,
  step: 1,
  minValue: 50,
  maxValue: 80,
  formatCurrency: false
});

const slider = ref<HTMLElement | null>(null);
const sliderMinValue = ref(props.minValue);
const sliderMaxValue = ref(props.maxValue);


watch(() => props.minValue, (newVal) => {
  const parsedNewVal = safeParseFloat(newVal);
  const currentParsed = safeParseFloat(sliderMinValue.value);
  
  if (parsedNewVal !== currentParsed) {
    sliderMinValue.value = newVal;
    previousMinValue.value = parsedNewVal;
  }
});

watch(() => props.maxValue, (newVal) => {
  const parsedNewVal = safeParseFloat(newVal);
  const currentParsed = safeParseFloat(sliderMaxValue.value);
  
  if (parsedNewVal !== currentParsed) {
    sliderMaxValue.value = newVal;
    previousMaxValue.value = parsedNewVal;
  }
});

const safeParseFloat = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const cleaned = value.toString()
    .replace(/\s+/g, '')
    .replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

const previousMinValue = ref(safeParseFloat(props.minValue));
const previousMaxValue = ref(safeParseFloat(props.maxValue));

const safeFormatValue = (value: number | string): string => {
  const numValue = safeParseFloat(value);
  if (props.formatCurrency) {
    return numValue.toLocaleString("ru-RU");
  }
  return numValue.toString();
};

const getPercent = (value: number, minVal: number, maxVal: number): number => {
  if (maxVal === minVal) return 0;
  return ((value - minVal) / (maxVal - minVal)) * 100;
};

const setCSSProps = (left: number, right: number): void => {
  if (slider.value) {
    slider.value.style.setProperty("--progressLeft", `${left}%`);
    slider.value.style.setProperty("--progressRight", `${right}%`);
  }
};

watch([sliderMinValue, sliderMaxValue], () => {
  if (slider.value) {
    const minNum = safeParseFloat(sliderMinValue.value);
    const maxNum = safeParseFloat(sliderMaxValue.value);

    const leftPercent = getPercent(minNum, props.min, props.max);
    const rightPercent = 100 - getPercent(maxNum, props.min, props.max);

    setCSSProps(leftPercent, rightPercent);
  }
}, { immediate: true });

const onLocalInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);
  if (isNaN(value)) return;

  const currentMin = safeParseFloat(sliderMinValue.value);
  const currentMax = safeParseFloat(sliderMaxValue.value);

  if (target.name === 'min') {
    if (value > currentMax) {
      target.value = previousMinValue.value.toString();
    } else {
      sliderMinValue.value = props.formatCurrency ? safeFormatValue(value) : value;
      previousMinValue.value = value;
    }
  } else if (target.name === 'max') {
    if (value < currentMin) {
      target.value = previousMaxValue.value.toString();
    } else {
      sliderMaxValue.value = props.formatCurrency ? safeFormatValue(value) : value;
      previousMaxValue.value = value;
    }
  }
};

const onCommit = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);
  if (isNaN(value)) return;

  const currentMin = safeParseFloat(sliderMinValue.value);
  const currentMax = safeParseFloat(sliderMaxValue.value);

  if (target.name === 'min') {
    if (value > currentMax) {
      emit("update:minValue", props.formatCurrency ? safeFormatValue(previousMinValue.value) : previousMinValue.value);
    } else {
      const finalValue = Math.min(value, currentMax);
      emit("update:minValue", props.formatCurrency ? safeFormatValue(finalValue) : finalValue);
      previousMinValue.value = finalValue;
    }
  } else if (target.name === 'max') {
    if (value < currentMin) {
      emit("update:maxValue", props.formatCurrency ? safeFormatValue(previousMaxValue.value) : previousMaxValue.value);
    } else {
      const finalValue = Math.max(value, currentMin);
      emit("update:maxValue", props.formatCurrency ? safeFormatValue(finalValue) : finalValue);
      previousMaxValue.value = finalValue;
    }
  }
};
</script>

<template>
  <div class="slider-container">
    <div class="slider-header">
      <div class="slider-values">
        <span class="value-from">
          <span class="value-prefix">от</span>

          <span class="value-number">{{ sliderMinValue }}</span> 
        </span>

        <span class="value-to">
          <span class="value-prefix">до</span>

          <span class="value-number">{{ sliderMaxValue }}</span>
        </span>
      </div>
    </div>

    <div ref="slider" class="custom-slider minmax">
      <div class="minmax-indicator"></div>

      <input
        id="min"
        type="range"
        name="min"
        :min="min"
        :max="max"
        :value="safeParseFloat(sliderMinValue)"
        :step="step"
        @input="onLocalInput"
        @change="onCommit"
      />

      <input
        id="max"
        type="range"
        name="max"
        :min="min"
        :max="max"
        :value="safeParseFloat(sliderMaxValue)"
        :step="step"
        @input="onLocalInput"
        @change="onCommit"
      />
    </div>
  </div>
</template>

<style lang="scss">
.slider-container {
  width: 100%;
  display: flex;
  gap: 6px;
  flex-direction: column;
}
.value-prefix {
  color: $c_text_second;
  @include setFontStyle4;
}

.value-number {
  color: $c_text;
  @include setFontStyle5;
  display: flex;
  min-width: 72px;
  justify-content: flex-start;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.slider-values {
  display: flex;
  gap: 3.5rem;
  font-size: 14px;
  font-weight: 500;
}

.value-from,
.value-to {
  text-align: center;
  display: flex;
  gap: 8px;
}

.custom-slider {
  --trackHeight: 3px;
  --thumbRadius: 14px;

  input[type="range"] {
    position: relative;
    appearance: none;
    background: none;
    border-radius: 999px;
    z-index: 0;
    height: 100%;
    pointer-events: none;
    width: 100%;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: var(--ProgressPercent, 100%);
      height: 100%;
      background: #3EB57C;
      border-radius: 999px;
    }
  }

  input[type="range"]::-webkit-slider-runnable-track {
    appearance: none;
    background: #CCDDD4;
    height: var(--trackHeight);
    border-radius: 999px;
  }

  input[type="range"]::-webkit-slider-thumb {
    position: relative;
    width: var(--thumbRadius);
    height: var(--thumbRadius);
    margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
    background: #3EB57C;
    border: 1px solid #3EB57C;
    border-radius: 999px;
    pointer-events: all;
    appearance: none;
    z-index: 1;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-track {
    appearance: none;
    background: #CCDDD4;
    height: var(--trackHeight);
    border-radius: 999px;
    border: none;
  }

  input[type="range"]::-moz-range-thumb {
    position: relative;
    box-sizing: border-box;
    width: var(--thumbRadius);
    height: var(--thumbRadius);
    background: #3EB57C;
    border: 1px solid #3EB57C;
    border-radius: 999px;
    pointer-events: all;
    appearance: none;
    z-index: 1;
    cursor: pointer;
  }
}

.custom-slider.minmax {
  position: relative;
  height: var(--trackHeight);
  background: #CCDDD4;
  border-radius: 999px;
  --progressLeft: 0%;
  --progressRight: 0%;

  .minmax-indicator {
    position: absolute;
    height: 100%;
    pointer-events: none;
    left: 10px;
    right: 0;

    &::before {
      content: "";
      position: absolute;
      background: #3EB57C;
      height: 100%;
      left: var(--progressLeft);
      right: var(--progressRight);
      border-radius: 999px;
    }
  }

  input[type="range"] {
    position: absolute;
    width: 100%;
    left: 0; 

    &[name="max"] {
      left: calc(var(--thumbRadius) / 2);
    }

    &::-webkit-slider-runnable-track {
      background: none;
    }

    &::-moz-range-track {
      background: none;
    }

    &::before {
      display: none;
    }
  }
}

.custom-slider input[type="range"]::-ms-track {
  background: #CCDDD4;
  height: var(--trackHeight);
  border-radius: 999px;
  border: none;
}

.custom-slider input[type="range"]::-ms-thumb {
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  background: #CCDDD4;
  border: 1px solid #3EB57C;
  border-radius: 999px;
  pointer-events: all;
  cursor: pointer;
}
</style>