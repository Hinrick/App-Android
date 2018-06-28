import React, { Component } from 'react'
import { Dimensions, NativeModules, Platform, Image, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import I18n from '../../locales';

// component
import Background from './Background';
import News from './News';
import Mod from './Mod';
import Tab from '../../components/Tab/Tab';
import * as Style from './style';

// image
import mopconLogo from '../../images/mopconLogo01.png';
import iconSchedule from '../../images/icon/iconSchedule.png';
import iconMySchedule from '../../images/icon/iconMySchedule.png';
import iconUnconference from '../../images/icon/iconUnconference.png';
import iconMission from '../../images/icon/iconMission.png';
import iconSponsor from '../../images/icon/iconSponsor.png';
import iconSpeakers from '../../images/icon/iconSpeakers.png';
import iconCommunity from '../../images/icon/iconCommunity.png';
import iconNews from '../../images/icon/iconNews.png';

const { height, width } = Dimensions.get('window');
const tabs = [
  { name: '中文', value: 'zh' },
  { name: 'English', value: 'en' }
];

const getLanguageCode = () => {
  let systemLanguage = 'en';
  if (Platform.OS === 'android') {
    systemLanguage = NativeModules.I18nManager.localeIdentifier;
  } else {
    systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
  }
  const languageCode = systemLanguage.substring(0, 2);
  return languageCode;
}

export default class Main extends Component {
  state = {
    images: [
      'https://unsplash.it/300/?random',
      'https://unsplash.it/350/?random',
      'https://unsplash.it/400/?random',
      'https://unsplash.it/450/?random',
      'https://unsplash.it/500/?random',
      'https://unsplash.it/550/?random',
      'https://unsplash.it/600/?random'
    ],
    mods: [
      { icon: iconSchedule, name: 'home.schedule', screen: 'Schedule' },
      { icon: iconMySchedule, name: 'home.MySchedule' },
      { icon: iconUnconference, name: 'home.Unconference', screen: 'UnConf' },
      { icon: iconMission, name:'home.Mission' },
      { icon: iconSponsor, name: 'home.Sponsors', screen: 'Sponsor' },
      { icon: iconSpeakers, name: 'home.Speakers', screen: 'Speaker' },
      { icon: iconCommunity, name: 'home.Community' },
      { icon: iconNews, name: 'home.News', screen: 'News' },
    ],
    language: getLanguageCode(),
  }

  componentDidMount() {
		setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 100) // scroll view position fix
	}

  renderItem = ({ item, index }) => {
    return (
      <Style.CarouselItem width={width} source={{ uri: item }} />
    );
  }

  navigate = (screen) => {
    if (screen) {
      this.props.navigate(screen);
    }
  }

  onChangeLanguage = (language) => {
    I18n.locale = language;

    this.setState({
      language,
    });
  }

  render() {
    const { images, mods, language } = this.state;

    return (
      <Style.Container>
        <Background />
        <Style.ScrollContainer>
          <Style.ViewContainer>
            <Style.LogoContainer>
              <Image source={mopconLogo} />
            </Style.LogoContainer>
            <Style.CarouselContainer
              innerRef={(scrollView) => { this.scrollView = scrollView; }}
              horizontal= {true}
              decelerationRate={0}
              snapToInterval={width}
              snapToAlignment={"center"}
            >
              {images.map(img => <Style.CarouselItem width={width} source={{ uri: img }} /> )}
            </Style.CarouselContainer>
            <Style.Content>
              <News />
              <Style.ModContainer>
                {mods.map((mod, index) => <Mod key={`mod_${index}`} navigate={() => this.navigate(mod.screen)} {...mod} />)}
              </Style.ModContainer>
            </Style.Content>
            <Style.TabContainer>
              <Tab tabs={tabs} defaultActiveTab={language} onChange={this.onChangeLanguage}/>
            </Style.TabContainer>
          </Style.ViewContainer>
        </Style.ScrollContainer>
      </Style.Container>
    )
  }
}
