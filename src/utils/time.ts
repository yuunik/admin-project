import {
  Moon,
  MoonNight,
  Sunny,
  Sunrise,
  Sunset,
} from '@element-plus/icons-vue'

// 时间提示工具类
const getTime = () => {
  const hour = new Date().getHours()

  if (hour > 6 && hour <= 8) {
    return {
      greeting: '早上好',
      timeIcon: Sunrise,
    }
  } else if (hour > 8 && hour <= 11) {
    return {
      greeting: '上午好',
      timeIcon: Sunny,
    }
  } else if (hour > 11 && hour <= 13) {
    return {
      greeting: '中午好',
      timeIcon: Sunny,
    }
  } else if (hour > 13 && hour <= 18) {
    return {
      greeting: '下午好',
      timeIcon: Sunset,
    }
  } else if (hour > 18 && hour <= 22) {
    return {
      greeting: '晚上好',
      timeIcon: Moon,
    }
  } else if (hour > 22 || hour <= 1) {
    return {
      greeting: '不早了, 早点儿睡吧',
      timeIcon: MoonNight,
    }
  } else {
    return {
      greeting: '夜深了, 洗洗睡吧',
      timeIcon: MoonNight,
    }
  }
}

export default getTime
