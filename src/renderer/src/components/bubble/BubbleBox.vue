<script lang="ts" setup>
import { onUpdated, ref } from 'vue'

let props = defineProps({
  id: { type: String, default: 'bubble-box' },//id
  clickX: { type: Number, default: 0 },//点击横坐标
  clickY: { type: Number, default: 0 },//点击竖坐标
  mask: { type: Boolean, default: true },//遮罩层(默认开启)
  width: { type: Number, default: 700 },//宽度
  height: { type: Number, default: 300 },//高度
  maskColor: { type: String, default: 'rgba(0, 0, 0, .4)' },//遮罩层颜色
  show: { type: Boolean, default: false },//弹框是否显示
  dialogColor: { type: String, default: 'rgb(255,255,255)' }//背景色
})
//弹框显示与隐藏
let visible = props.show
const emit = defineEmits<{ (event: 'update:modelValue', visible: Boolean): void }>()
const closeDialog = () => emit('update:modelValue', false)

// content position
const boxWidth = ref()
const boxHeight = ref()
const boxTop = ref()
const boxLeft = ref()
onUpdated(() => {
  console.log(props.clickX, props.clickY)
  boxLeft.value = props.clickX - (props.width / 2) + 20 + 'px'
  boxTop.value = props.clickY - props.height - 10 + 'px'
  boxWidth.value = props.width + 'px'
  boxHeight.value = props.height + 'px'
  console.log(boxHeight.value, boxWidth.value)
  console.log(boxTop.value, boxLeft.value)
})
</script>

<template>
  <div class="modal" v-show="show">
    <div class="modal-mask" v-if="mask" @click="closeDialog"></div>
    <div ref="contentRef" class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 100;

  .modal-mask {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    z-index: -99;
  }

  .modal-content {
    filter: drop-shadow(1rem 1rem 1rem #ccc);
    border-radius: 1rem;
    position: fixed;
    top: v-bind(boxTop);
    left: v-bind(boxLeft);
    width: v-bind(boxWidth);
    height: v-bind(boxHeight);
    overflow-y: auto;
    margin: 0 auto;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
