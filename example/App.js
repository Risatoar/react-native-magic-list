import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Modal,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MagicFlatList} from 'react-native-magic-list';
import types from './animateTypes';

console.disableYellowBox = true;
const mockedData = Array(10).fill(1);

const Item = ({text}) => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: 'red',
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{backgroundColor: 'transparent', color: '#fff'}}>{text}</Text>
  </View>
);

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, type: 'zoomIn'};
  }

  render() {
    return (
      <SafeAreaView style={styles}>
        <StatusBar />
        <Button
          title="change animate type"
          onPress={() => this.setState({visible: true})}
        />
        {!this.state.visible && (
          <MagicFlatList
            data={mockedData}
            animateType={this.state.type}
            renderItem={() => <Item text={this.state.type} />}
            numColumns={2}
            touchAnimateType="scale"
          />
        )}
        <Modal transparent={false} visible={this.state.visible}>
          <TouchableOpacity
            style={styles.modal}
            onPress={() => this.setState({visible: false})}>
            <View onStartShouldSetResponder={() => true}>
              {
                <MagicFlatList
                  data={types}
                  animateType="zoomIn"
                  renderItem={({item}) => (
                    <Button
                      title={item}
                      onPress={() =>
                        this.setState({type: item, visible: false})
                      }
                    />
                  )}
                  numColumns={2}
                  delay={50}
                />
              }
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    paddingTop: 40,
  },
});
