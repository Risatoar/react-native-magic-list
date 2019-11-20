/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Animated } from 'react-native';
import AnimatedItem from './animate-list-item';
import { animationTypes } from '../../animate-type';
// compatible with versions not currently Animated.FlatList
const FlatListBase = Animated.createAnimatedComponent(FlatList);

export default class MagicFlatList extends PureComponent {
	static propTypes = {
		renderItem: PropTypes.func,
		initialNumToRender: PropTypes.number,
		delay: PropTypes.number,
		animateType: PropTypes.oneOfType(
			PropTypes.oneOf(animationTypes),
			PropTypes.arrayOf(animationTypes)
		),
		touchAnimateType: PropTypes.oneOf('scale', 'none'),
		onComplete: PropTypes.func
	};

	static defaultProps = {
		renderItem: () => {},
		initialNumToRender: FlatList.defaultProps.initialNumToRender,
		delay: 300,
		animateType: 'floatFromBottom',
		touchAnimateType: 'scale',
		onComplete: null
	};

	_renderItem = ({ item, index, separators }) => {
		const {
			renderItem,
			initialNumToRender,
			animateType,
			delay,
			data,
			touchAnimateType,
			onComplete
		} = this.props;
		const Item = renderItem({ item, index, separators });
		const totalLength = data.length;
		return (
			<AnimatedItem
				animateType={animateType}
				delay={delay}
				index={index}
				total={totalLength}
				touchAnimateType={touchAnimateType}
				initialNumToRender={initialNumToRender}
				onComplete={onComplete}>
				{Item}
			</AnimatedItem>
		);
	};

	render() {
		return <FlatListBase {...this.props} renderItem={this._renderItem} />;
	}
}
