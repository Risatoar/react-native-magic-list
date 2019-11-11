import { Easing } from 'react-native';

/* eslint-disable import/no-extraneous-dependencies */
export const parseAnimate = (animteTypeQuene = []) => {
  const mutiAnimateType = Object.keys(animationInterpolationMixin);
  let hasMutiAnimateType = false;
  let defaultAnimateType = '';
  let index = 0;
  let arr = [];
  let animtedType = 'timing';
  const copyAnimteTypeQuene = Array.prototype.slice.call(animteTypeQuene);
  const [{ type, value }] = copyAnimteTypeQuene;
  const itemAnimateTypes = toArray(type);
  for (; index < itemAnimateTypes.length; index++) {
    const _item = itemAnimateTypes[index];
    if (!hasMutiAnimateType) {
      const isMutiAnimateTypeExist = mutiAnimateType.includes(_item);
      isMutiAnimateTypeExist && ((hasMutiAnimateType = true), (defaultAnimateType = _item));
      !isMutiAnimateTypeExist && arr.push(_item);
    }
  }
  if (hasMutiAnimateType) {
    const target = animationInterpolationMixin[defaultAnimateType];
    const { type: t, typeParse } = target;
    arr = typeParse ? typeParse(toArray(t)) : toArray(t);
    animtedType = target.animateType;
    copyAnimteTypeQuene.splice(0, 1, { type: arr, value });
  }
  return {
    type: animtedType,
    animateStyle: mergeAnimationValue(copyAnimteTypeQuene),
  };
};

export const mergeAnimationValue = (combineQuene = []) =>
  combineQuene.reduce((preQuene, lastQuene = {}) => {
    const { type, value } = lastQuene;
    const animations = toArray(type);
    const currentAnimationStyle = animations.reduce((pre, cur) => {
      const cloneByPre = { ...pre };
      const target = animationInterpolation[cur];
      if (!target) return cloneByPre;
      const { type: animationType, valueParse } = target;
      if (typesNeedTransfrom.includes(animationType)) {
        !cloneByPre.transform && (cloneByPre.transform = []);
        cloneByPre.transform &&
          cloneByPre.transform.push({
            [animationType]: valueParse ? value.interpolate(valueParse) : value,
          });
      } else {
        cloneByPre[animationType] = valueParse ? value.interpolate(valueParse) : value;
      }
      return cloneByPre;
    }, {});
    return mergeTransfromStyle(preQuene, currentAnimationStyle);
  }, {});

export const toArray = target => (Array.isArray(target) ? target : [target]);

export const typesNeedTransfrom = [
  'translateY',
  'translateX',
  'scale',
  'skewX',
  'skewY',
  'rotateX',
  'rotateY',
];

export const mergeTransfromStyle = (source, target) => {
  const sourceStyle = { ...source };
  const targetStyle = { ...target };
  let ret = {};
  if (sourceStyle.transform && targetStyle.transform) {
    targetStyle.transform.forEach(e => {
      const [key] = Object.entries(e);
      const isSoruceStyleExist = sourceStyle.transform.findIndex(_it => {
        const [sourceKey] = Object.entries(_it);
        return sourceKey === key;
      });
      if (isSoruceStyleExist === -1) {
        sourceStyle.transform.push(e);
      } else {
        sourceStyle.transform.splice(isSoruceStyleExist, 1, e);
      }
    });
    delete targetStyle.transform;
  }
  ret = { ...sourceStyle, ...targetStyle };
  return ret;
};

export const animationInterpolation = {
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
  floatFromTop: {
    type: 'translateY',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [-50, 0],
    },
  },
  floatFromLeft: {
    type: 'translateX',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [-2000, 0],
    },
  },
  floatFromRight: {
    type: 'translateX',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [2000, 0],
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

export const fadeAnimation = {
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

export const slideAnimation = {
  slideInUp: {
    type: 'floatFromBottom',
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  slideInDown: {
    type: 'floatFromTop',
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  slideInLeft: {
    type: 'floatFromLeft',
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
  slideInRight: {
    type: 'floatFromRight',
    typeParse: null,
    animateType: 'timing',
    animateConfig: {
      easing: Easing.in,
    },
  },
};

export const zoomAnimation = {
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

export const bounceAnimation = {
  bounceIn: {
    type: 'scale',
    typeParse: null,
    animateType: 'spring',
    animateConfig: {
      useNativeDriver: true,
      easing: Easing.bezier(0.15, 0.73, 0.37, 1.2),
    },
  },
};

export const specialAnimation = {
  rollIn: {
    type: ['rotate', 'floatFromLeft'],
    typeParse: null,
    animateType: 'spring',
    animateConfig: {
      easing: Easing.in,
    },
  },
};

export const animationInterpolationMixin = {
  ...fadeAnimation,
  ...slideAnimation,
  ...zoomAnimation,
  // ...bounceAnimation,
  // ...specialAnimation,
};

export const animationTypes = [
  ...Object.keys(animationInterpolation),
  ...Object.keys(animationInterpolationMixin),
];
