import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import I18n from '../../locales';
import Button from '../../components/Button/Button';
import iconCheck from '../../images/icon/iconCheck.png';
import iconCheckActive from '../../images/icon/iconCheckActive.png';
import { scheduleCardTypeColor } from '../../theme/index';

const Container = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;

  ${
    p => (p.mode === 'game' && p.completed) ? `
      background-color: #0b425e;
    ` : `
      border: 1px solid ${scheduleCardTypeColor};
    `
  }
`;

const CheckIcon = styled.Image`
  width: 20px;
  height: 16px;
  margin-right: 30px;
`;

const StageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const StageText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const RewardTip = styled.Text`
  font-size: 18px;
  color: #878787;
  margin-top: 10px;
`;

const GameBlock = (props) => {
  const { mode, name, name_e, point, pass, onOpenModalReward, navigation, uid } = props;
  const lang = I18n.locale;

  return (
    <Container
      mode={mode}
      completed={pass}
      disabled={mode === 'reward'}
      onPress={() => navigation.navigate('GameDetail', { uid })}
    >
      <CheckIcon source={pass ? iconCheckActive : iconCheck} />
      {
        mode === 'game' && (
          <StageContainer>
            <StageText>{lang === 'zh' ? name : name_e}</StageText>
            <StageText>{point}分</StageText>
          </StageContainer>
        )
      }
      {
        mode === 'reward' && (
          <StageContainer>
            <View>
              <StageText>領取獎勵</StageText>
              <RewardTip>需完成所有任務</RewardTip>
            </View>
            <Button disabled={!pass} color="primary" onClick={onOpenModalReward} text="領取獎勵" margin={[0, 0, 0, 0]} />
          </StageContainer>
        )
      }
    </Container>
  );
}

export default GameBlock;
