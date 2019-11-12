export default {
  floatFromBottomBig: {
    type: 'translateY',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [700, 0],
    },
  },
  floatFromBottom: {
    type: 'translateY',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [50, 0],
    },
  },
  floatFromTopBig: {
    type: 'translateY',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [-1000, 0],
    },
  },
  floatFromTop: {
    type: 'translateY',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [-50, 0],
    },
  },
  floatFromLeftBig: {
    type: 'translateX',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [-1000, 0],
    },
  },
  floatFromLeft: {
    type: 'translateX',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [-50, 0],
    },
  },
  floatFromRightBig: {
    type: 'translateX',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [1000, 0],
    },
  },
  floatFromRight: {
    type: 'translateX',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [50, 0],
    },
  },
  // rotate: {
  //   type: 'skewX',
  //   valueParse: {
  //     inputRange: [0, 0.5, 1],
  //     outputRange: ['0deg', '45deg', '0deg'],
  //   },
  // },
  scale: {
    type: 'scale',
    valueParse: null,
  },
  opacity: {
    type: 'opacity',
    valueParse: null,
  },
};