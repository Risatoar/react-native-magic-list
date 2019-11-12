import { Easing } from "react-native";

export default {
  slideInUp: {
    type: ["floatFromBottomBig", "scale"],
    typeParse: null,
    animateType: "timing",
    animateConfig: {
      easing: Easing.in
    }
  },
  slideInDown: {
    type: ["floatFromTopBig", "scale"],
    typeParse: null,
    animateType: "timing",
    animateConfig: {
      easing: Easing.in
    }
  },
  slideInLeft: {
    type: ["floatFromLeftBig", "scale"],
    typeParse: null,
    animateType: "timing",
    animateConfig: {
      easing: Easing.in
    }
  },
  slideInRight: {
    type: ["floatFromRightBig", "scale"],
    typeParse: null,
    animateType: "timing",
    animateConfig: {
      easing: Easing.in
    }
  }
};
