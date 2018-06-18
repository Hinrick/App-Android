import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import * as theme from '../../theme';

const width = ((Dimensions.get('window').width) / 2) - 30;

const Container = styled.TouchableOpacity`
  width: ${width};
  height: ${width};
  border: 2px solid ${theme.aquamarine};
  border-radius: 5px;
  padding-top: 37;
  padding-right: 40;
  padding-bottom: 25;
  padding-left: 40;
  margin-bottom: 16;
  align-items: center;
`;

const Image = styled.Image`
  margin-bottom: 19;
`;

const Text = styled.Text`
  color: ${theme.aquamarine};
  font-size: 16px;
  font-weight: bold;
`;

export default class Mod extends Component {
  render() {
    const { icon, name, navigate } = this.props;

    return (
      <Container onPress={navigate}>
        <Image source={icon}/>
        <Text>{name}</Text>
      </Container>
    );
  }
}