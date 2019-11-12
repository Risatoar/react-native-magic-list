import { animationInterpolationMixin } from '../../animate-type';
import { default as animationInterpolation } from '../../animate-type/base';

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