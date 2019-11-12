/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { parseAnimate } from './utils';
import { animationTypes } from '../../animate-type';

export default class AnimatedItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    delay: PropTypes.number,
    animateType: PropTypes.oneOf(
      PropTypes.oneOf(animationTypes),
      PropTypes.arrayOf(animationTypes)
    ),
    touchAnimateType: PropTypes.oneOf('scale', 'none'),
    children: PropTypes.element,
    isViewable: PropTypes.bool,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    index: 0,
    delay: 300,
    animateType: 'floatFromBottom',
    touchAnimateType: 'scale',
    children: null,
    isViewable: true,
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      animateInit: false,
      animateValue: new Animated.Value(0),
      responseValue: new Animated.Value(1),
    };
  }

  componentDidMount() {
    const { isViewable } = this.props;
    isViewable && this.layoutAnimateOn();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isViewable !== nextProps.isViewable && nextProps.isViewable) {
      this.layoutAnimateOn();
    }
  }

  buildConfig = () => {
    const { animateValue, responseValue } = this.state;
    const { touchAnimateType, animateType } = this.props;
    const combineAnimation = [{ type: animateType, value: animateValue }];
    const shouldResponseTouchEvent =
      touchAnimateType !== 'none' && Array.isArray(animateType)
        ? !animateType.includes('scale')
        : 'scale' !== touchAnimateType;
    shouldResponseTouchEvent &&
      combineAnimation.push({ type: touchAnimateType, value: responseValue });
    return {
      ...parseAnimate(combineAnimation),
      shouldResponseTouchEvent,
    };
  };

  layoutAnimateOn = () => {
    const { type } = this.buildConfig();
    const { index, delay } = this.props;
    const { animateInit } = this.state;
    if (animateInit) return;
    Animated[type](this.state.animateValue, {
      duration: 500,
      delay: index * delay,
      toValue: 1,
    }).start(({ finished }) => {
      finished && this.setState({ animateInit: true });
    });
  };

  _onResponderGrant = () => {
    this._onAnimatedPanResponder(0.9);
  };

  _onResponderRelease = () => {
    this._onAnimatedPanResponder(1);
  };

  _onAnimatedPanResponder = value => {
    Animated.timing(this.state.responseValue, {
      toValue: value,
      duration: 200,
    }).start();
  };

  render() {
    const { style } = this.props;
    const { animateStyle } = this.buildConfig();
    return (
      <Animated.View
        style={{
          ...animateStyle,
          ...style,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
