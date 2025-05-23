<template>
  <div ref="elRef" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, onActivated } from 'vue'
import { useQuasar, debounce, is } from 'quasar'
import ApexCharts from 'apexcharts'


const $q = useQuasar()

const props = withDefaults(defineProps<{
  options: ApexCharts.ApexOptions
  width?: number | string
  height?: number | string
}>(), {
  width: '100%',
  height: '400px'
})

const options = computed(() => {
  return Object.assign({}, props.options, {
    theme: {
      mode: $q.dark.isActive ? 'dark' : 'light'
    }
  })
})

const elRef = ref<HTMLElement | null>(null)

let chartRef: ApexCharts | null = null

const contentEl = ref<Element>()

const styles = computed(() => {
  const width = is.number(props.width) ? `${props.width}px` : props.width
  const height = is.number(props.height) ? `${props.height}px` : props.height

  return {
    width,
    height
  }
})

const initChart = () => {
  if (elRef.value && props.options) {
    // 销毁旧图表，防止重复渲染
    if (chartRef) {
      chartRef.destroy()
    }
    chartRef = new ApexCharts(elRef.value, options.value)
    chartRef?.render()
  }
}

watch(
  () => options.value,
  (options) => {
    if (chartRef) {
      chartRef?.updateOptions(options, true, false) // 第二个参数 true 表示对图表强制更新
    }
  },
  {
    deep: true
  }
)

const resizeHandler = debounce(() => {
  if (chartRef) {
    chartRef?.destroy() // 销毁旧图表
    initChart() // 重新初始化图表
  }
}, 100)

const contentResizeHandler = async (e: TransitionEvent) => {
  if (e.propertyName === 'width') {
    resizeHandler()
  }
}

const handleContentResize = (e: TransitionEvent): void => {
  if (e.propertyName === 'width') {
    contentResizeHandler(e)
  }
}

onMounted(() => {
  initChart()

  window.addEventListener('resize', resizeHandler)

  contentEl.value = document.getElementsByClassName('q-page-container')[0]
  if (contentEl.value) {
    (contentEl.value as Element).addEventListener('transitionend', handleContentResize as (event: Event) => void)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  if (contentEl.value) {
    (contentEl.value as Element).removeEventListener('transitionend', handleContentResize as (event: Event) => void)
  }

  if (chartRef) {
    chartRef.destroy() // 组件卸载时销毁图表
  }
})

onActivated(() => {
  if (chartRef) {
    resizeHandler() // 图表重新激活时重新渲染
  }
})
</script>
