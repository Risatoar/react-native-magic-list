import { Easing } from "react-native";

export default {
  bounceIn: {
    type: 'scale',
    typeParse: null,
    animateType: 'spring',
    animateConfig: {
      useNativeDriver: true,
      easing: Easing.bezier(0.15, 5, 0.37, 1.2),
    },
  },
};