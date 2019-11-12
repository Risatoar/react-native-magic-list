import { default as animationInterpolation } from './base'
import { default as fadeAnimation } from './fade'
import { default as slideAnimation } from './slide'
import { default as zoomAnimation } from './zoom';
import { default as bounceAnimation } from './bounce';

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

export default {
  animationTypes,
  animationInterpolation
}