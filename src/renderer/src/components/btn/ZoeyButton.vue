<script setup lang="ts">
import { onMounted, type PropType, ref } from 'vue'

const types = ['primary', 'error', 'success', 'warn', 'info', 'default'] as const
const sizes = ['small', 'default', 'large'] as const
type Types = (typeof types)[number]
type Sizes = (typeof sizes)[number]
const props = defineProps({
  type: {
    type: String as PropType<Types>,
    default: 'primary',
    required: true
  },
  size: {
    type: String as PropType<Sizes>,
    default: 'default',
    required: false
  },
  icon: { type: Boolean, default: false, required: false },
  plain: { type: Boolean, default: false, required: false },
  bgColor: { type: String, default: '#FFFFFF', required: false },
  h: { type: String, default: '3rem', required: false }
})
const classVal = ref<string>('')
onMounted(() => {
  if (props.icon) {
    classVal.value = 'icon-button icon-type-' + props.type + ' btn-icon-' + props.size
  } else if (props.plain) {
    classVal.value = 'zoey-button btn-size-' + props.size + ' btn-plain-' + props.type
  } else {
    classVal.value = 'zoey-button btn-size-' + props.size + ' btn-' + props.type
  }
})
</script>

<template>
  <button :class="classVal">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
/* 文字按钮样式 */
.zoey-button {
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0 1.5rem;
  width: max-content;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.zoey-button {
  width: max-content;
}

.btn-primary {
  background-color: #0099ff;
  color: #ffffff;

  &:hover {
    background-color: #4cb7ff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-success {
  background-color: #73d13d;
  color: #ffffff;

  &:hover {
    background-color: #389e0d;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-error {
  background-color: #ff7875;
  color: #ffffff;

  &:hover {
    background-color: #f5222d;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-warn {
  background-color: #e6a23c;
  color: #ffffff;

  &:hover {
    background-color: #a77730;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-info {
  background-color: #909399;
  color: #ffffff;

  &:hover {
    background-color: #b1b3b8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-default {
  background-color: #fff;
  border: 0.1rem solid #cccccc;
  color: #333333;

  &:hover {
    background-color: #ecf5ff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

/* 浅色主题*/
.btn-plain-primary {
  background-color: #ecf5ff;
  border: 0.1rem solid #5b8ff9;
  color: #5b8ff9;

  &:hover {
    color: #ffffff;
    background-color: #5b8ff9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-plain-success {
  background-color: #f0f9eb;
  border: 0.1rem solid #67c23a;
  color: #67c23a;

  &:hover {
    color: #ffffff;
    background-color: #67c23a;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-plain-error {
  background-color: #fef0f0;
  border: 0.1rem solid #f5222d;
  color: #f5222d;

  &:hover {
    color: #ffffff;
    background-color: #f5222d;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-plain-warn {
  background-color: #fdf6ec;
  border: 0.1rem solid #e6a23c;
  color: #e6a23c;

  &:hover {
    color: #ffffff;
    background-color: #e6a23c;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-plain-info {
  background-color: #f4f4f5;
  color: #909399;
  border: 0.1rem solid #909399;

  &:hover {
    color: #ffffff;
    background-color: #909399;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-plain-default {
  background-color: #fff;
  border: 0.1rem solid #dcdfe6;
  color: #606266;

  &:hover {
    color: #5b8ff9;
    background-color: #ecf5ff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

/*按钮大小*/
.btn-size-small {
  height: 2.2rem;
  font-size: 1.2rem;
}

.btn-size-default {
  height: 3.2rem;
  font-size: 1.4rem;
}

.btn-size-large {
  height: 4rem;
  font-size: 1.4rem;
}

/* 以下为图标样式*/
.icon-button {
  display: flex;
  align-items: center;
  border: none;
  justify-content: space-around;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
}

/*icon样式*/
.icon-type-primary {
  background-color: #5b8ff9;

  &:hover {
    background-color: #3375b9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.icon-type-success {
  background-color: #73d13d;
  color: #ffffff;

  &:hover {
    background-color: #389e0d;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.icon-type-error {
  background-color: #ff7875;
  color: #ffffff;

  &:hover {
    background-color: #f5222d;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.icon-type-warn {
  background-color: #e6a23c;
  color: #ffffff;

  &:hover {
    background-color: #a77730;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.icon-type-info {
  background-color: #909399;
  color: #ffffff;

  &:hover {
    background-color: #b1b3b8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.icon-type-default {
  background-color: #fff;
  border: 0.1rem solid #cccccc;
  color: #333333;

  &:hover {
    background-color: #ecf5ff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

/*图标按钮大小*/
.btn-icon-small {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 1.1rem;
}

.btn-icon-default {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 1.8rem;
}

.btn-icon-large {
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
}
</style>
