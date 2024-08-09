<script lang="ts" setup>
import { onMounted, ref } from 'vue'

let props = defineProps({
  id: { type: String, default: 'bubble-box' },//id
  clickX: { type: Number, default: 0 },//点击横坐标
  clickY: { type: Number, default: 0 },//点击竖坐标
  mask: { type: Boolean, default: true },//遮罩层(默认开启)
  width: { type: String, default: '500' },//宽度
  height: { type: String, default: '300' },//高度
  maskColor: { type: String, default: 'rgba(0, 0, 0, .4)' },//遮罩层颜色
  show: { type: Boolean, default: false },//弹框是否显示
  dialogColor: { type: String, default: 'rgb(255,255,255)' }//背景色
})
//弹框显示与隐藏
let visible = props.show
const emit = defineEmits<{ (event: 'update:modelValue', visible: Boolean): void }>()
const closeDialog = () => emit('update:modelValue', visible)

// content position
const contentRef: HTMLElement = ref(null)
const boxWidth = ref('500px')
const boxHeight = ref('300px')
const boxTop = ref('0')
const boxLeft = ref('0')
onMounted(() => {
  console.log(props.clickX, props.clickY)
  boxLeft.value = props.clickX - (props.width / 2) + 'px'
  boxTop.value = props.clickY + props.height + 10 + 'px'
  boxWidth.value = props.width + 'px'
  boxHeight.value = props.height + 'px'
})

</script>

<template>
  <div class="modal" v-show="show">
    <div class="modal-mask" v-if="mask" @click="closeDialog">
      <div :id="id" ref="contentRef" class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 100;

  .modal-mask {
    position: fixed;
    top: v-bind(boxTop);
    left: v-bind(boxLeft);
    height: 100%;

    .modal-content {
      position: fixed;
      top: 0;
      left: 0;
      width: v-bind(boxWidth);
      height: v-bind(boxHeight);
      overflow-y: auto;
      margin: 0 auto;
      background: #ffffff;
    }
  }
}
</style>
