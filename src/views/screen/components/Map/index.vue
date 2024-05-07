<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 地图实例
const mapRef = ref<HTMLDivElement>()

// 初始化地图
const initMap = () => {
  var geoCoordMap = {
    黑龙江: [
      127.9688, 45.368, 48209.4, 22321.2, 19598.7, 30213.2, 2521.2, 1343.5,
      6321.6, 1842.1, 832.9, 90129.3,
    ],
    内蒙古: [
      110.3467, 41.4899, 59371.6, 23395.9, 18461.6, 29101.3, 510.5, 779.0,
      688.4, 897.4, 202.6, 101229.1,
    ],
    吉林: [
      125.8154, 44.2584, 459391.2, 24591.4, 16846.6, 28589.4, 2296.9, 228.8,
      1580.4, 259.8, 661.8, 500829.2,
    ],
    北京: [
      116.4551, 40.2539, 64368.7, 25737.1, 25712.1, 28573.9, 791.8, 817.1,
      4888.7, 783.7, 60.2, 0,
    ],
    辽宁: [
      123.1238, 42.1216, 48097.3, 19734.3, 16816.1, 28330.2, 1513.5, 278.1,
      6055.0, 1414.1, 700.9, 84647.7,
    ],
    河北: [
      114.4995, 38.1006, 40866.2, 17336.9, 16846.2, 28320.4, 840.3, 598.8,
      1058.6, 330.5, 814.0, 75049.3,
    ],
    天津: [
      117.4219, 39.4189, 30964.4, 14341.5, 13482.1, 28262.8, 1437.9, 721.5,
      4372.5, 627.2, 767.2, 58788,
    ],
    山西: [
      112.3352, 37.9413, 33211.8, 11435.8, 10818.7, 28256.7, 2109.7, 341.2,
      5955.1, 1321.5, 402.3, 55466.3,
    ],
    陕西: [
      109.1162, 34.2004, 35714.9, 10814.4, 10459.4, 28135.4, 1251.3, 1262.7,
      2871.5, 1334.4, 442.1, 56988.7,
    ],
    甘肃: [
      103.5901, 36.3043, 39459.1, 11358.6, 10410.8, 28123.4, 417.7, 1135.6,
      172.1, 374.3, 415.8, 61228.5,
    ],
    宁夏: [
      106.3586, 38.1775, 41869.0, 11961.8, 10586.4, 28068.3, 1120.6, 1267.5,
      3768.9, 1750.2, 208.1, 76164.1,
    ],
    青海: [
      101.4038, 36.8207, 48412.1, 14671.2, 13080.8, 28015.4, 2310.9, 982.4,
      4577.3, 1709.5, 84.1, 76164.1,
    ],
    新疆: [
      87.9236, 43.5883, 45938.4, 21869.1, 20580.3, 27942.3, 2105.6, 1217.5,
      4485.3, 461.7, 115.6, 88387.8,
    ],
    西藏: [
      91.11, 29.97, 43365.9, 23439.1, 22309.3, 27887.7, 2425.9, 905.6, 2855.7,
      957.8, 410.0, 89114.3,
    ],
    四川: [
      103.9526, 30.7617, 51939.6, 25734.6, 24733.1, 27864.5, 418.7, 775.7,
      969.3, 1533.8, 285.6, 102407.3,
    ],
    重庆: [
      108.3843, 30.4397, 48410.9, 24618.3, 22808.0, 27730.2, 82.3, 1117.8,
      1573.9, 392.3, 122.6, 95837.2,
    ],
    山东: [
      117.1582, 36.8701, 48096.1, 19309.1, 18306.3, 27592.8, 1044.9, 849.7,
      2270.3, 918.8, 424.5, 85711.5,
    ],
    河南: [
      113.4668, 34.6234, 45736.9, 19315.6, 17309.8, 27580.5, 1605.4, 136.6,
      4704.7, 247.6, 142.2, 82362.3,
    ],
    江苏: [
      118.8062, 31.9208, 53080.8, 22185.9, 21830.8, 27357.2, 628.1, 192.0,
      5492.4, 1012.8, 728.3, 97097.5,
    ],
    安徽: [
      117.29, 32.0581, 43080.6, 19308.0, 19081.0, 27230.3, 209.6, 968.5, 2151.5,
      442.8, 60.1, 81469.6,
    ],
    湖北: [
      114.3896, 30.6628, 48094.1, 21808.1, 20308.0, 26754.7, 355.6, 1318.8,
      3087.1, 1167.9, 288.2, 90210.2,
    ],
    浙江: [
      119.5313, 29.8773, 55821.3, 23698.1, 22337.0, 26471.4, 1955.7, 324.7,
      2323.9, 592.2, 538.0, 2,
    ],
    福建: [
      119.4543, 25.9222, 53644.6, 24933.1, 23093.6, 26322.2, 1302.6, 863.1,
      2475.2, 1585.8, 472.9, 101671.3,
    ],
    江西: [
      116.0046, 28.6633, 49616.3, 21843.9, 20803.4, 25755.4, 640.8, 1038.6,
      4206.9, 227.6, 212.2, 92263.6,
    ],
    湖南: [
      113.0823, 28.2568, 51893.9, 21415.9, 20280.9, 25617.6, 2336.6, 543.0,
      2940.5, 1412.1, 233.5, 93590.7,
    ],
    贵州: [
      106.6992, 26.7682, 45866.2, 23435.6, 22308.1, 25416.8, 1755.2, 1307.7,
      1401.5, 31.2, 251.7, 91609.9,
    ],
    云南: [
      102.9199, 25.4663, 48099.1, 18664.1, 16130.8, 25255.3, 1796.4, 694.9,
      3368.8, 1199.3, 402.2, 82894,
    ],
    广东: [
      113.1224, 23.0095, 62143.3, 25593.9, 24893.4, 25249.2, 1840.5, 347.1,
      237.2, 1490.7, 530.4, 112630.6,
    ],
    广西: [
      108.479, 23.1152, 44618.5, 18684.3, 17808.1, 24761.5, 808.0, 374.1,
      2422.5, 165.5, 500.7, 81110.9,
    ],
    海南: [
      110.3893, 19.8516, 55823.9, 25583.7, 24686.8, 24559.2, 1614.0, 1208.0,
      784.1, 1337.4, 25.0, 95458.1,
    ],
    上海: [
      121.4648, 31.2891, 64643.5, 28096.4, 2718.3, 24524.4, 720.9, 1236.0,
      4808.8, 393.2, 143.8, 106094.4,
    ],
    台湾: [
      121.5651, 25.0377, 24643.5, 147348.6, 13080.8, 24419.3, 667.2, 1100.0,
      4976.4, 820.2, 210.2, 185072.9,
    ],
    香港: [
      114.1466, 22.2701, 46147.4, 24614.3, 24590.5, 24395.4, 406.2, 171.1,
      5021.7, 1793.3, 580.2, 95352.2,
    ],
    澳门: [
      113.5495, 22.1918, 43464.3, 24935.8, 22812.1, 23987.3, 2519.4, 1110.3,
      2692.8, 889.1, 704.1, 91212.2,
    ],
  }

  var BJData = [
    [
      {
        name: '北京',
      },
      {
        name: '北京',
        value: 0,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '上海',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '重庆',
        value: 5,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '黑龙江',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '内蒙古',
        value: 3,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '吉林',
        value: 4,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '陕西',
        value: 3,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '宁夏',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '辽宁',
        value: 1,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '山西',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '青海',
        value: 4,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '新疆',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '西藏',
        value: 3,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '四川',
        value: 1,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '山东',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '河南',
        value: 3,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '江苏',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '安徽',
        value: 4,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '湖北',
        value: 3,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '浙江',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '福建',
        value: 4,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '江西',
        value: 5,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '湖南',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '贵州',
        value: 1,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '云南',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '广东',
        value: 3,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '广西',
        value: 4,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '海南',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '台湾',
        value: 1,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '香港',
        value: 3,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '澳门',
        value: 2,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '天津',
        value: 4,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '河北',
        value: 4,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '甘肃',
        value: 1,
      },
    ],
  ]

  var planePath =
    'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

  var convertData2 = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i]
      var fromCoord = geoCoordMap[dataItem[0].name]
      var toCoord = geoCoordMap[dataItem[1].name]
      if (fromCoord && toCoord) {
        res.push([
          {
            coord: fromCoord,
            value: dataItem[1].value,
          },
          {
            coord: toCoord,
          },
        ])
      }
    }
    return res
  }

  var color = ['#a6c84c']
  var series = []
  ;[['北京', BJData]].forEach(function (item, i) {
    series.push(
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 10,
        },
        lineStyle: {
          normal: {
            width: 1,
            opacity: 0.3,
            curveness: 0.3,
          },
        },
        data: convertData2(item[1]),
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          period: 5, //动画时间，值越小速度越快
          brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 3, //波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: 'right', //显示位置
            offset: [5, 0], //偏移设置
            formatter: function (params) {
              //圆环显示文字
              return params.data.name
            },
            fontSize: 13,
          },
        },
        symbol: 'circle',
        symbolSize: function (val) {
          return 10
        },
        itemStyle: {
          normal: {
            show: true,
            color: color[i],
          },
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
          }
        }),
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4,
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            //offset:[5, 0],
            color: '#0f0',
            formatter: '{b}',
            textStyle: {
              color: '#0f0',
            },
          },
          emphasis: {
            show: true,
            color: '#f60',
          },
        },
        symbol: 'pin',
        symbolSize: 50,
        data: [
          {
            name: item[0],
            value: geoCoordMap[item[0]].concat([83]),
          },
        ],
      },
    )
  })

  let option = {
    backgroundColor: '#ffffff',
    title: {
      text: '当日国内航线成本分摊-起飞地',
      left: '1%',
      top: '6%',
      textStyle: {
        color: '#000000',
      },
    },
    tooltip: {
      // trigger: 'item'
      trigger: 'item',
      backgroundColor: 'rgba(166, 200, 76, 0.82)',
      borderColor: '#FFFFCC',
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: 'z-index:100',
      formatter: function (params, ticket, callback) {
        //根据业务自己拓展要显示的内容
        if (params.seriesType == 'effectScatter') {
          return (
            '地点：' +
            params.data.name +
            '，航班数：' +
            params.data.value[12] +
            '<br/>' +
            '<br/>机型：A380' +
            '<br/>' +
            '<br/>总成本：' +
            params.data.value[11] +
            '<br/>' +
            '<br/>变动成本:' +
            params.data.value[2] +
            '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp航油成本:' +
            params.data.value[5] +
            '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分摊机务成本:' +
            params.data.value[6] +
            '<br/>' +
            '<br/>固定成本:' +
            params.data.value[3] +
            '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分摊折旧费用:' +
            params.data.value[7] +
            '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分摊租赁费用:' +
            params.data.value[8] +
            '<br/>' +
            '<br/>期间成本:' +
            params.data.value[4] +
            '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分摊财务费用:' +
            params.data.value[9] +
            '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分摊管理费用:' +
            params.data.value[10]
          )
        } else if (params.seriesType == 'lines') {
          return '当前航线飞机数量：' + params.data.value
        }
        var res = ''
        var name = params.name
        var value = params.value[params.seriesIndex + 1]
        res =
          "<span style='color:#fff;'> 目的地:" +
          name +
          '</span><br/>飞出的航班数:' +
          params.data.value[12]
        return res
      },
    },
    legend: {
      orient: 'vertical',
      top: 'bottom',
      left: 'right',
      textStyle: {
        color: '#fff',
      },
      selectedMode: 'single',
    },
    visualMap: {
      //图例值控制
      min: 0,
      max: 10,
      calculable: true,
      show: true,
      color: ['#f44336', '#fc9700', '#ffde00', '#3cfc01', '#00eaff'],
      textStyle: {
        color: '#000000',
      },
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false,
        },
      },
      roam: false, //是否允许缩放
      itemStyle: {
        normal: {
          color: 'rgba(46, 63, 81, 127)', //地图背景色
          borderColor: '#445973', //省市边界线00fcff 516a89
          borderWidth: 1,
        },
        emphasis: {
          color: 'rgba(35, 41, 58, 127)', //悬浮背景
        },
      },
    },
    series: series,
  }

  const mapChart = echarts.init(mapRef.value)
  mapChart.setOption(option)
}

// 组件挂载后执行
onMounted(() => {
  // 初始化地图
  initMap()
})
</script>

<template>
  <div class="cn-map" ref="mapRef" />
</template>

<style scoped lang="scss"></style>
