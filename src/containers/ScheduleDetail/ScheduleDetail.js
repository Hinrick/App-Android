import React from 'react';
import I18n from '../../locales';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import starIconNormal from '../../images/buttonStarNormal.png';
import starIconChecked from '../../images/buttonStarChecked.png';

export default class ScheduleDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'scheduleDetail.title', 'mode2')

  state = {
    savedSchedule: {},
  }

  async componentDidMount() {
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }
    this.setState({
      savedSchedule,
    });
  }

  onSave = (schedule_id) => () => {
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[schedule_id] = !savedSchedule[schedule_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  render() {
    const { navigation } = this.props;
    const { savedSchedule } = this.state;
    const lang = I18n.locale;
    const agenda = navigation.getParam('agenda', {});
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.IntroContainer>
            <Style.SpeakerContainer>
              <Style.SpeakerImg source={{ uri: agenda.picture }} />
              <Style.NameText>{lang === 'zh' ? agenda.name : agenda.name_en}</Style.NameText>
              <Style.JobText>{`${agenda.job}@${agenda.company}`}</Style.JobText>
            </Style.SpeakerContainer>
            <Style.SpeechItemContainer>
              <Style.Title>
                {lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
              </Style.Title>
              <Style.CategoryText>{agenda.category}</Style.CategoryText>
            </Style.SpeechItemContainer>
            <Style.Line />
            <Style.DesText>
              {
                lang === 'zh' ? agenda.schedule_info : agenda.schedule_info_en
              }
            </Style.DesText>
          </Style.IntroContainer>
        </Style.SDContainer>
      </ScrollView>
    );
  }
}

/*



<Style.StarIconTouchable onPress={this.onSave(agenda.schedule_id)}>
                  <Style.StarIconImg source={savedSchedule[agenda.schedule_id] ? starIconChecked : starIconNormal} />
                </Style.StarIconTouchable>


<SpeechItem
  color="inverse"
  category={agenda.category}
  topic={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
  saved={savedSchedule[agenda.schedule_id]}
  onSave={this.onSave(agenda.schedule_id)}
/>

<Style.IntroContainer>
  <SpeakerItem
    name={lang === 'zh' ? agenda.name : agenda.name_en}
    job={agenda.job}
    company={agenda.company}
    picture={agenda.picture}
  />
</Style.IntroContainer>


*/