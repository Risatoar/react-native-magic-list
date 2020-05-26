import { Easing } from 'react-native';

export default {
  fadeIn: {
    type: 'opacity',
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  fadeInDown: {
    type: ['opacity', 'floatFromTop'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  fadeInLeft: {
    type: ['opacity', 'floatFromLeft'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  fadeInRight: {
    type: ['opacity', 'floatFromRight'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  fadeInUp: {
    type: ['opacity', 'floatFromBottom'],
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
};
