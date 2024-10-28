<template>
  <div ref="elRef" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, onActivated } from 'vue'
import { debounce } from 'quasar'
import ApexCharts from 'apexcharts'
import { useAppStore } from 'stores/app-store'
import { isString } from 'src/utils'

const appStore = useAppStore()

const props = withDefaults(defineProps<{
  options: ApexCharts.ApexOptions // 使用 ApexCharts 的配置类型
  width?: number | string
  height?: number | string
}>(), {
  width: '100%',
  height: '400px'
})

const theme = computed(() => appStore.isDark ? 'dark' : 'light')

const options = computed(() => {
  return Object.assign({}, props.options, {
    theme: {
      mode: theme.value
    }
  })
})

const elRef = ref<HTMLElement | null>(null)

let chartRef: ApexCharts | null = null

const contentEl = ref<Element>()

const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`

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
  setTimeout(() => {
    initChart()
  }, 0)

  window.addEventListener('resize', resizeHandler)

  contentEl.value = document.getElementsByClassName('el-layout-content')[0]
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
