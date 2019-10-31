/* eslint-disable import/no-extraneous-dependencies */
export const mergeAnimationValue = (combineQuene = []) =>
  combineQuene.reduce((preQuene, lastQuene = {}) => {
    const { type, value } = lastQuene;
    const animations = Array.isArray(type) ? type : [type];
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
      }
      return cloneByPre;
    }, {});
    return mergeTransfromStyle(preQuene, currentAnimationStyle);
  }, {});

export const typesNeedTransfrom = ['translateY', 'translateX', 'scale'];

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
  floatFromBottom: {
    type: 'translateY',
    valueParse: {
      inputRange: [0, 1],
      outputRange: [700, 0],
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
  scale: {
    type: 'scale',
    valueParse: null,
  },
};

export const animationTypes = Object.keys(animationInterpolation);
