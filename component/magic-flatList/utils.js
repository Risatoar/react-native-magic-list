import { animationInterpolationMixin } from '../../animate-type';
import { default as animationInterpolation } from '../../animate-type/base';

/* eslint-disable import/no-extraneous-dependencies */
export const parseAnimate = (animateTypeQueue = []) => {
  const multiAnimateType = Object.keys(animationInterpolationMixin);
  let hasMultiAnimateType = false;
  let defaultAnimateType = '';
  let index = 0;
  let arr = [];
  let animatedType = 'timing';
  const copyAnimateTypeQueue = Array.prototype.slice.call(animateTypeQueue);
  const [{ type, value }] = copyAnimateTypeQueue;
  const itemAnimateTypes = toArray(type);
  for (; index < itemAnimateTypes.length; index++) {
    const _item = itemAnimateTypes[index];
    if (!hasMultiAnimateType) {
      const isMultiAnimateTypeExist = multiAnimateType.includes(_item);
      isMultiAnimateTypeExist && ((hasMultiAnimateType = true), (defaultAnimateType = _item));
      !isMultiAnimateTypeExist && arr.push(_item);
    }
  }
  if (hasMultiAnimateType) {
    const target = animationInterpolationMixin[defaultAnimateType];
    const { type: t, typeParse } = target;
    arr = typeParse ? typeParse(toArray(t)) : toArray(t);
    animatedType = target.animateType;
    copyAnimateTypeQueue.splice(0, 1, { type: arr, value });
  }
  return {
    type: AnimatedType,
    animateStyle: mergeAnimationValue(copyAnimateTypeQueue),
  };
};

export const mergeAnimationValue = (combineQueue = []) =>
  combineQueue.reduce((preQueue, lastQueue = {}) => {
    const { type, value } = lastQueue;
    const animations = toArray(type);
    const currentAnimationStyle = animations.reduce((pre, cur) => {
      const cloneByPre = { ...pre };
      const target = animationInterpolation[cur];
      if (!target) return cloneByPre;
      const { type: animationType, valueParse } = target;
      if (typesNeedTransform.includes(animationType)) {
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
    return mergeTransformStyle(preQueue, currentAnimationStyle);
  }, {});

export const toArray = target => (Array.isArray(target) ? target : [target]);

export const typesNeedTransform = [
  'translateY',
  'translateX',
  'scale',
  'skewX',
  'skewY',
  'rotateX',
  'rotateY',
];

export const mergeTransformStyle = (source, target) => {
  const sourceStyle = { ...source };
  const targetStyle = { ...target };
  let ret = {};
  if (sourceStyle.transform && targetStyle.transform) {
    targetStyle.transform.forEach(e => {
      const [key] = Object.entries(e);
      const isSourceStyleExist = sourceStyle.transform.findIndex(_it => {
        const [sourceKey] = Object.entries(_it);
        return sourceKey === key;
      });
      if (isSourceStyleExist === -1) {
        sourceStyle.transform.push(e);
      } else {
        sourceStyle.transform.splice(isSourceStyleExist, 1, e);
      }
    });
    delete targetStyle.transform;
  }
  ret = { ...sourceStyle, ...targetStyle };
  return ret;
};
