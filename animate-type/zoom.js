import { Easing } from 'react-native';

export default {
  zoomIn: {
    type: 'scale',
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  zoomDownIn: {
    type: ['scale', 'floatFromBottom'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  zoomUpIn: {
    type: ['scale', 'floatFromTop'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  zoomInRight: {
    type: ['scale', 'floatFromRight'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  zoomInLeft: {
    type: ['scale', 'floatFromLeft'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
};
