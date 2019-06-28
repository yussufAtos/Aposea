export const COSMIC_THEME = {
  name: 'cosmic',
  base: 'default',
  variables: {

    temperature: [
      '#2ec7fe',
      '#31ffad',
      '#7bff24',
      '#fff024',
      '#f7bd59',
    ],

    solar: {
      gradientLeft: '#7bff24',
      gradientRight: '#2ec7fe',
      shadowColor: '#19977E',
      radius: ['70%', '90%'],
    },

    traffic: {
      colorBlack: '#000000',
      tooltipBg: '#00ffaa',
      tooltipBorderColor: '#00d977',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 #00ffaa; border-radius: 10px; padding: 4px 16px;',
      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',

      lineBg: '#f4f5ff',
      lineShadowBlur: '14',
      itemColor: '#f9f6ff',
      itemBorderColor: '#ffffff',
      itemEmphasisBorderColor: '#ffffff',
      shadowLineDarkBg: '#bcb1bd',
      shadowLineShadow: '#4c4a4d',
      gradFrom: '#f8fdff',
      gradTo: '#fef6ff',
    },

    electricity: {
      tooltipBg: '#00ffaa',
      tooltipLineColor: '#ffffff',
      tooltipLineWidth: '1',
      tooltipBorderColor: '#00d977',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 #00ffaa; border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',

      axisLineColor: '#dbd8e5',
      xAxisTextColor: '#e5dee5',
      yAxisSplitLine: '#e1e2e5',

      itemBorderColor: '#ffffff',
      lineStyle: 'dotted',
      lineWidth: '6',
      lineGradFrom: '#00ffaa',
      lineGradTo: '#fff835',
      lineShadow: '#2e2e30',

      areaGradFrom: '#f7f6ff',
      areaGradTo: '#fbf6ff',
      shadowLineDarkBg: '#fffafe',
    },

    bubbleMap: {
      titleColor: '#ffffff',
      areaColor: '#605d61',
      areaHoverColor: '#e1e0e5',
      areaBorderColor: '#d4d0db',
    },

    profitBarAnimationEchart: {
      textColor: '#ffffff',

      firstAnimationBarColor: '#0088ff',
      secondAnimationBarColor: '#f6f1ff',

      splitLineStyleOpacity: '0.06',
      splitLineStyleWidth: '1',
      splitLineStyleColor: '#000000',

      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',
      tooltipFontSize: '16',
      tooltipBg: '#00ffaa',
      tooltipBorderColor: '#00d977',
      tooltipBorderWidth: '3',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 #00ffaa; border-radius: 10px; padding: 4px 16px;',
    },

    trafficBarEchart: {
      gradientFrom: '#fc0',
      gradientTo: '#ffa100',
      shadow: '#ffb600',
      shadowBlur: '5',

      axisTextColor: '#e2dde5',
      axisFontSize: '12',

      tooltipBg: '#00ffaa',
      tooltipBorderColor: '#00d977',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 #00ffaa; border-radius: 10px; padding: 4px 16px;',
      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',
    },

    countryOrders: {
      countryBorderColor: '#b5b0bd',
      countryFillColor: '#a6a0a5',
      countryBorderWidth: '2',
      hoveredCountryBorderColor: '#00f9a6',
      hoveredCountryFillColor: '#377aa7',
      hoveredCountryBorderWidth: '3',

      chartAxisLineColor: '#d8d7e5',
      chartAxisTextColor: '#e5e1e3',
      chartAxisFontSize: '16',
      chartGradientTo: '#00c7c7',
      chartGradientFrom: '#00d977',
      chartAxisSplitLine: '#dfd8e5',
      chartShadowBarColor: '#68666b',

      chartLineBottomShadowColor: '#00977e',

      chartInnerLineColor: '#2f296b',
    },

    echarts: {
      bg: '#807c80',
      textColor: '#ffffff',
      axisLineColor: '#dedce5',
      splitLineColor: '#736e70',
      itemHoverShadowColor: '#000000',
      tooltipBackgroundColor: '#6a7985',
      areaOpacity: '1',
    },

    chartjs: {
      axisLineColor: '#e5dfdf',
      textColor: '#ffffff',
    },

    orders: {
      tooltipBg: '#00ffaa',
      tooltipLineColor: '#ffffff',
      tooltipLineWidth: '1',
      tooltipBorderColor: '#00d977',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 #00ffaa; border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',
      tooltipFontSize: '20',

      axisLineColor: '#d9dbe5',
      axisFontSize: '16',
      axisTextColor: '#e2e1e5',
      yAxisSplitLine: '#dae5e3',

      itemBorderColor: '#ffffff',
      lineStyle: 'solid',
      lineWidth: '4',

      // first line
      firstAreaGradFrom: '#a4a1a4',
      firstAreaGradTo: '#a09ea4',
      firstShadowLineDarkBg: '#018dff',

      // second line
      secondLineGradFrom: '#00bece',
      secondLineGradTo: '#00da78',

      secondAreaGradFrom: '#268b91',
      secondAreaGradTo: '#268b91',
      secondShadowLineDarkBg: '#2c5a85',

      // third line
      thirdLineGradFrom: '#f9f9ff',
      thirdLineGradTo: '#fff7ff',

      thirdAreaGradFrom: '#c7c3d0',
      thirdAreaGradTo: '#fdf8ff',
      thirdShadowLineDarkBg: '#f6fcff',
    },

    profit: {
      bg: '#807e7c',
      textColor: '#ffffff',
      axisLineColor: '#dee0e5',
      splitLineColor: '#736c71',
      areaOpacity: '1',

      axisFontSize: '16',
      axisTextColor: '#e2e1e5',

      // first bar
      firstLineGradFrom: '#00bece',
      firstLineGradTo: '#00da78',
      firstLineShadow: '#302e2f',

      // second bar
      secondLineGradFrom: '#f7f6ff',
      secondLineGradTo: '#fef9ff',
      secondLineShadow: '#2f2f30',

      // third bar
      thirdLineGradFrom: '#a4a0a2',
      thirdLineGradTo: '#a2a3a4',
      thirdLineShadow: '#30302f',
    },

    orderProfitLegend: {
      firstItem: 'linear-gradient(90deg, #00c7c7 0%, #00d977 100%)',
      secondItem: 'linear-gradient(90deg, #a454ff 0%, #7659ff 100%)',
      thirdItem: '#a0a4a3',
    },

    visitors: {
      tooltipBg: '#00ffaa',
      tooltipLineColor: '#ffffff',
      tooltipLineWidth: '1',
      tooltipBorderColor: '#00d977',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 #00ffaa; border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',

      axisLineColor: '#e3e2e5',
      axisFontSize: '16',
      axisTextColor: '#e5e1e3',
      yAxisSplitLine: '#e1dae5',

      itemBorderColor: '#ffffff',
      lineStyle: 'dotted',
      lineWidth: '6',
      lineGradFrom: '#ffffff',
      lineGradTo: '#ffffff',
      lineShadow: '#302d2d',

      areaGradFrom: '#fff7ff',
      areaGradTo: '#f4f3ff',
      shadowLineDarkBg: '#fffbff',

      innerLineStyle: 'solid',
      innerLineWidth: '1',

      innerAreaGradFrom: '#3ba5f3',
      innerAreaGradTo: '#0485f3',
    },

    visitorsLegend: {
      firstIcon: 'linear-gradient(90deg, #0088ff 0%, #3dafff 100%)',
      secondIcon: 'linear-gradient(90deg, #a454ff 0%, #7659ff 100%)',
    },

    visitorsPie: {
      firstPieGradientLeft: '#7bff24',
      firstPieGradientRight: '#2ec7fe',
      firstPieShadowColor: '#19977E',
      firstPieRadius: ['70%', '90%'],

      secondPieGradientLeft: '#ff894a',
      secondPieGradientRight: '#ffcc10',
      secondPieShadowColor: '#cf7c1c',
      secondPieRadius: ['60%', '95%'],
      shadowOffsetX: '0',
      shadowOffsetY: '3',
    },

    visitorsPieLegend: {
      firstSection: 'linear-gradient(90deg, #ffcb17 0%, #ff874c 100%)',
      secondSection: 'linear-gradient(90deg, #00c7c7 0%, #00d977 100%)',
    },

    earningPie: {
      radius: ['65%', '100%'],
      center: ['50%', '50%'],

      fontSize: '22',

      firstPieGradientLeft: '#00d77f',
      firstPieGradientRight: '#00d77f',
      firstPieShadowColor: '#000000',

      secondPieGradientLeft: '#e6e3f7',
      secondPieGradientRight: '#f5f7f5',
      secondPieShadowColor: '#000000',

      thirdPieGradientLeft: '#ffca00',
      thirdPieGradientRight: '#ffca00',
      thirdPieShadowColor: '#000000',
    },

    earningLine: {
      gradFrom: '#f3f6ff',
      gradTo: '#f7f6ff',

      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',
      tooltipFontSize: '16',
      tooltipBg: '#00ffaa',
      tooltipBorderColor: '#00d977',
      tooltipBorderWidth: '3',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 #00ffaa; border-radius: 10px; padding: 4px 16px;',
    },
  },
};
