## react-native-magic-list

简易替换 FlatList，就能给每一个子项添加上 magic 入场动画

## 1. 例子

<p align="center">
  <img src="../res/demo.gif" width=375/>
</p>

## 2. 基础使用

如何使用 react-native-magic-list?:

```bash
npm install react-native-magic-list --save
```

在代码中使用的案例:

```javascript
import React from "react";
import { View } from "react-native";
import { MagicFlatList } from "react-native-magic-list";

const mockedData = Array(10).fill(1);

export class Demo extends React.Component {
  render() {
    return (
      <MagicFlatList
        data={mockedData}
        animateType="floatFromBottom"
        renderItem={() => (
          <View style={{ width: 100, height: 100, backgroundColor: "red" }} />
        )}
      />
    );
  }
}
```

- props：

| 属性               | 描述                       | 类型            | 默认值            |
| ------------------ | -------------------------- | --------------- | ----------------- |
| renderItem         | 渲染每一个子项             | function        | () => void        |
| delay              | 每一个子项的延迟时间       | number          | 200               |
| animateType        | 动画类型                   | array or string | 'floatFromBottom' |
| touchAnimateType   | 手势动画类型               | string          | 'scale'           |
| FlatList.propTypes | 继承 FlatList 的 propTypes | any             | null              |

- 目前支持的动画类型

```javascript
// base
"floatFromBottomBig";
"floatFromBottom";
"floatFromTop";
"floatFromLeft";
"floatFromRight";
"scale";
"opacity";

// mixin
"fadeIn";
"fadeInDown";
"fadeInLeft";
"fadeInRight";
"fadeInUp";
"slideInUp";
"slideInDown";
"slideInLeft";
"slideInRight";
"zoomIn";
"zoomDownIn";
"zoomUpIn";
"zoomInRight";
"zoomInLeft";
```

当你需要使用入口动画时，你可以选择以下两种方法:

```javascript
animateType = "floatFromBottom";
```

```javascript
animateType = ["floatFromBottom", "floatFromLeft"];
```

但如果你使用复合动画，例如使用数组传递动画类型的方式["floatFromLeft", "zoomIn", "zoonInLeft"], 只有首位的 zoonIn 会执行，其余的动画不会执行。
