import React from 'react';
import I18n from '../../locales';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import apiServices from '../../api/services'
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import starIconNormal from '../../images/buttonStarNormal.png';
import starIconChecked from '../../images/buttonStarChecked.png';

export default class ScheduleDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const options = NavigationOptions(navigation, 'scheduleDetail.title', 'mode2');
    const session_id = navigation.getParam('session_id', 1);
    const savedStatus = navigation.getParam('savedStatus', false);
    const onSave = navigation.getParam('onSave', () => { });
    const onPress = () => {
      onSave({ session_id });
      navigation.setParams({ savedStatus: !savedStatus });
    }
    options.headerRight = (
      <Style.StarIconTouchable onPress={onPress}>
        <Style.StarIconImg source={savedStatus ? starIconChecked : starIconNormal} />
      </Style.StarIconTouchable>
    );
    return options;
  }

  state = {
    session: { speakers: [] }
  }

  async componentDidMount() {
    const session_id = this.props.navigation.getParam('session_id', 1);

    const { data: session } = await apiServices.get(`/session/${session_id}`);
    this.setState({
      session,
    });
  }

  render() {
    const { navigation } = this.props;
    const { session } = this.state;
    const lang = I18n.locale;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.IntroContainer>
            <Style.SpeakerContainer>
              <Style.ImgList>
                {
                  session.speakers.map(speakerData => <Style.SpeakerImg key={speakerData.name} source={{ uri: speakerData.img.mobile }} />)
                }
              </Style.ImgList>
              <Style.NameText>
                {
                  session.speakers
                    .map(speakerData => lang === 'zh' ? speakerData.name : speakerData.name_e)
                    .join(' | ')
                }
              </Style.NameText>
              <Style.JobText>
                {
                  session.speakers
                    .map(speakerData => `${lang === 'zh' ? speakerData.job_title : speakerData.job_title_e}@${lang === 'zh' ? speakerData.company : speakerData.company_e}`)
                    .join(' | ')
                }
              </Style.JobText>
            </Style.SpeakerContainer>

            <Style.SpeechItemContainer>
              <Style.Title>
                {lang === 'zh' ? session.topic : session.topic_e}
              </Style.Title>
              <Style.CategoryText>
                {
                  Boolean(session.tags) &&
                  session.tags.map(t => t.name).join(', ')
                }
              </Style.CategoryText>
            </Style.SpeechItemContainer>
            <Style.Line />
            <Style.DesText>
              {
                lang === 'zh' ? session.summary : session.summary_e
              }
            </Style.DesText>
            {
              Boolean(session.sponsor_info) && (
                <React.Fragment>
                  <Style.SponsorText>{I18n.t('sponsor.title')}</Style.SponsorText>
                  <Style.CardSmall>
                    <Style.CardImg source={{ uri: session.sponsor_info.logo_path }} />
                    <Style.CardText>
                      {lang === 'en' ? session.sponsor_info.name_e : session.sponsor_info.name}
                    </Style.CardText>
                  </Style.CardSmall>
                </React.Fragment>
              )
            }
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