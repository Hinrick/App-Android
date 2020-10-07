import React from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { Consumer } from '../../store';
import I18n from '../../locales';
import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import ModalReward from '../../components/ModalReward/ModalReward';
import Button from '../../components/Button/Button';
import GameBlock from './GameBlock';
import gameServices from '../../api/gameServices';
import avatarUser from '../../images/avatar/avatarUser.png';
import * as Style from './style';
import { useNavigation } from "@react-navigation/native";

import Puzzle1Lock from '../../images/puzzle/locked/Puzzle1Lock.jpg';
import Puzzle2Lock from '../../images/puzzle/locked/Puzzle2Lock.jpg';
import Puzzle3Lock from '../../images/puzzle/locked/Puzzle3Lock.jpg';
import Puzzle4Lock from '../../images/puzzle/locked/Puzzle4Lock.jpg';
import Puzzle5Lock from '../../images/puzzle/locked/Puzzle5Lock.jpg';
import Puzzle6Lock from '../../images/puzzle/locked/Puzzle6Lock.jpg';
import Puzzle7Lock from '../../images/puzzle/locked/Puzzle7Lock.jpg';
import Puzzle8Lock from '../../images/puzzle/locked/Puzzle8Lock.jpg';
import Puzzle9Lock from '../../images/puzzle/locked/Puzzle9Lock.jpg';
import Puzzle10Lock from '../../images/puzzle/locked/Puzzle10Lock.jpg';
import Puzzle11Lock from '../../images/puzzle/locked/Puzzle11Lock.jpg';
import Puzzle12Lock from '../../images/puzzle/locked/Puzzle12Lock.jpg';

import inActiveIcon from '../../images/iconGiftActive.png';
import activeIcon from '../../images/iconGiftActive.png';

const Game = ({ navigation, context }) => {

  const [ state, setState ] = React.useState({
      modalWelcomeVisible: false,
      modalRewardVisible: false,
      intro: {},
      reward: {},
      isLoading: true,
    }
  )
  React.useEffect(() => {
    const firstPlayInitial = async () => {
      const { loadGameList } = context.gameStore;

      const [
        hasPlayed,
        { data: intro },
      ] = await Promise.all([
        AsyncStorage.getItem('hasPlayed'),
        gameServices.get('/intro'),
        loadGameList()
      ]);

      // 第一次進入遊戲才會出現
      setState({
        ...state,
        modalWelcomeVisible: hasPlayed !== 'true',
        intro,
        isLoading: false,
      });
    }

    firstPlayInitial();
  }, [])

  const onCloseModalWelcome = () => {
    setState({ ...state, modalWelcomeVisible: false });
  }

  const onOpenModalReward = (reward) => {
    setState({ ...state, modalRewardVisible: true, reward });
  }

  const onCloseModalReward = () => {
    const { loadGameList } = context.gameStore;
    loadGameList();
    setState({ ...state, modalRewardVisible: false });
  }

  const goReward = () => {
    navigation.navigate('Reward');
  }

  const {
    modalWelcomeVisible, modalRewardVisible, intro, reward,
    isLoading
  } = state;


  // const { score, missionList, isLoaded, lastPassIndex } = context.gameStore;
  const puzzleList =  [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      img: Puzzle1Lock
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      img: Puzzle2Lock
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      img: Puzzle3Lock
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      img: Puzzle4Lock
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      img: Puzzle5Lock
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      img: Puzzle6Lock
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      img: Puzzle7Lock
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      img: Puzzle8Lock
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      img: Puzzle9Lock
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      img: Puzzle10Lock
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      img: Puzzle11Lock
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      img: Puzzle12Lock
    },
  ];
  
  return (
    <Style.ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
      <Style.GameContainer>
        {
          !isLoading
            ? (
              <LoadingIcon size="large" color="#ffffff" />
            )
            : (
              <View>
                {/** 上方頭像、分數 */}
                <Style.ProfileContainer>
                  <Style.UserIcon source={avatarUser} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Style.TotalText>{I18n.t('game.total_score')}</Style.TotalText>
                    <Style.ScoreText>{12}/12</Style.ScoreText>
                  </View>
                  {/** 進度條 */}
                  <Style.ProgressContainer>
                    <Style.ProgressBar>
                      <View style={{width:'50%', height: 4, backgroundColor:'#fff'}}></View>
                      <View style={{width:'50%', height: 4, backgroundColor:'#ffcc00'}}></View>
                    </Style.ProgressBar>
                    <View style={{width:'10%'}}>
                      <Style.ProgressGift source={inActiveIcon}/>
                    </View>
                    <Style.ProgressBar>
                      <View style={{width:'50%', height: 4, backgroundColor:'#fff'}}></View>
                      <View style={{width:'50%', height: 4, backgroundColor:'#ffcc00'}}></View>
                    </Style.ProgressBar>
                    <View style={{width:'10%'}}>
                      <Style.ProgressGift source={inActiveIcon}/>
                    </View>
                  </Style.ProgressContainer>
                </Style.ProfileContainer>
                {/** 關卡 */}
                <Style.PuzzleContainer 
                  data={puzzleList}
                  renderItem={(props)=>{
                    return <Style.PuzzleBlock onPress={()=>{alert("Test")}} ><Style.PuzzlePng source={props.item.img} resizeMode="cover"/></Style.PuzzleBlock>
                  }}
                  keyExtractor={item => item.id}
                  numColumns={4}
                />

                {/* <View style={{  justifyContent: 'space-between' }}>
                  <Style.ProgressTitleText>{I18n.t('game.progress')}</Style.ProgressTitleText>
                  <Style.ProgressText>{missionList.filter(m => m.pass === 1).length}/{missionList.length}</Style.ProgressText>
                </View> */}
                {/* {
                  missionList.map((mission, mission_index) => (
                    <GameBlock
                      key={mission.uid}
                      mode="game"
                      {...mission}
                      isActive={mission_index <= (lastPassIndex + 1)} // 關卡必須按照順序過
                      navigation={navigation}
                    />
                  ))
                } */}
                {/* {
                  isLoaded && (
                    <GameBlock
                      mode="reward"
                      // 是否全部破關
                      pass={missionList.filter(m => m.pass === 1).length === missionList.length}
                      navigation={navigation}
                      onOpenModalReward={onOpenModalReward}
                    />
                  )
                } */}
              </View>
            )
        }
      </Style.GameContainer>


      {
        modalWelcomeVisible && (
          <ModalGameInfo
            intro={intro}
            visible={modalWelcomeVisible}
            onClose={async () => {
              onCloseModalWelcome();
              await AsyncStorage.setItem('hasPlayed', JSON.stringify(true));
            }}
          />
        )
      }

      {
        modalRewardVisible && (
          <ModalReward reward={reward} visible={modalRewardVisible} onClose={onCloseModalReward} />
        )
      }
    </Style.ScrollContainer>
  );
}
Game.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')
export default function (props) {
  const navigation = useNavigation();
  return <Game {...props} navigation={navigation} />
}

