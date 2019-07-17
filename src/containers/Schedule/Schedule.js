import React, { Component } from 'react'
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import * as Style from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import Tab from '../../components/Tab/Tab';
import TabDate from '../../components/TabDate/TabDate';
import Button from '../../components/Button/Button';

export default class Schedule extends Component {
  state = {
    schedule: [],
    nowScheduleDate: '',
    savedSchedule: {},
    nowCategory: 'all',
  }

  async componentDidMount() {
    global.qq = AsyncStorage;
    const scheduleText = await AsyncStorage.getItem('schedule');
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    const schedule = JSON.parse(scheduleText).payload.agenda;
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }

    const nowScheduleDate = this.props.navigation.getNestedValue(['state', 'params', 'nowScheduleDate']) || schedule[0].date;

    this.setState({
      schedule,
      nowScheduleDate,
      savedSchedule,
    });
  }

  onChangeTab = (date) => {
    this.setState({ nowScheduleDate: date });
  }

  onPressTitle = (agenda) => () => {
    this.props.navigation.navigate('ScheduleDetail', { agenda });
  }

  onSave = (schedule_id) => () => {
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[schedule_id] = !savedSchedule[schedule_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  goToUnConf = () => {
    this.props.navigation.navigate('UnConf', { nowUnconfDate: this.state.nowScheduleDate });
  }

  renderScheduleItem = (agenda) => (
    <ScheduleItem
      key={`agenda${agenda.schedule_id || agenda.schedule_topic}`}
      regular
      paintBG={!Boolean(agenda.schedule_id)}
      title={I18n.locale === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
      category={agenda.category}
      onPressTitle={agenda.schedule_id ? this.onPressTitle(agenda) : () => { }}
      name={I18n.locale === 'zh' ? agenda.name : agenda.name_en}
      onSave={this.onSave(agenda.schedule_id)}
      saved={this.state.savedSchedule[agenda.schedule_id]}
      room={agenda.location} />
  )

  onChangeCategory = nowCategory => this.setState({ nowCategory })

  render() {
    const { schedule, nowScheduleDate, nowCategory } = this.state;
    const tabs = schedule.map(scheduleData => ({ name: scheduleData.date, value: scheduleData.date }));
    const categoryTabs = [
      { name: I18n.t('schedule.allSchedule'), value: 'all' },
      { name: I18n.t('schedule.favoriteSchedule'), value: 'favorite' },
    ];
    return (
      <Style.ScheduleContainer>
        {
          tabs.length ?
            <TabDate tabs={tabs} defaultActiveTab={nowScheduleDate} onChange={this.onChangeTab} /> :
            <View />
        }

        <Tab tabs={categoryTabs} defaultActiveTab={nowCategory} onChange={this.onChangeCategory} />

        {
          schedule.map((scheduleData) => (
            <Style.AgendaView
              key={`schedule${scheduleData.date}`}
              active={nowScheduleDate === scheduleData.date}>
              {scheduleData.items.map((itemData) => (
                <View key={`item${scheduleData.date},${itemData.duration}`}>
                  <ScheduleHeader time={itemData.duration} />
                  {
                    itemData.agendas.map(this.renderScheduleItem)
                  }
                </View>
              ))}
            </Style.AgendaView>
          ))
        }
        {
          tabs.length ?
            <Button onClick={this.goToUnConf} text={I18n.t('community.unconference')} align="center" margin={[16, 0, 0, 0]} /> :
            <View />
        }
      </Style.ScheduleContainer>
    )
  }
}