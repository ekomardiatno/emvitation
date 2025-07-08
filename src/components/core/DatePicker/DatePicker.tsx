import { useMemo, useState, useEffect, useCallback } from 'react'
import { View, TextInput, TouchableOpacity, StatusBar, Platform, Dimensions, StyleProp, ViewStyle } from 'react-native'
import { BORDER_RADIUS, BORDER_WIDTH, TEXT_CONFIG, COLORS, GUTTER_SPACE } from '../../../constants'
import { useTheme } from '../AppProvider'
import Typography from '../Typography'
import Icon from '@react-native-vector-icons/material-icons'
import moment from 'moment'
import Button from '../Button'
import { useController } from 'react-hook-form'
import capitalizeFirstText from '../../../utils/capitalizeFirstText'
import { YEAR_MODE, MONTH_MODE, DATE_MODE } from './constants'

const { width } = Dimensions.get('window')

const DatePicker = ({ label, placeholder, name, control, required, defaultValue, editable = true, containerStyle }: Omit<ControlProps, 'defaultValue'> & {
  defaultValue?: Date,
  containerStyle?: StyleProp<ViewStyle>
}) => {
  const { height } = useSafeAreaFrame()
  defaultValue = defaultValue && moment(defaultValue).isValid() ? new Date(defaultValue) : undefined
  let now = defaultValue || new Date()
  let currentDate = new Date(now.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0))
  const { field, formState: { errors } } = useController({
    control,
    name,
    defaultValue
  })
  const theme = useTheme()
  const [isCalendarPanelVisible, setIsCalendarPanelVisible] = useState(false)
  const [viewedYear, setViewedYear] = useState(now.getFullYear())
  const [viewedMonth, setViewedMonth] = useState(now.getMonth())
  const [displayMode, setDisplayMode] = useState(DATE_MODE)
  const [yearPointer, setYearPointer] = useState(now.getFullYear())
  const [timeSecond, setTimeSecond] = useState(moment(now).format('ss'))
  const [timeMinute, setTimeMinute] = useState(moment(now).format('mm'))
  const [timeHour, setTimeHour] = useState(moment(now).format('HH'))
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate)

  const onViewCalendar = () => {
    setIsCalendarPanelVisible(state => !state)
  }

  const getPointerByYear = (year: number) => {
    let currentYearPointer = currentDate.getFullYear()
    let diff = Math.round((year - currentYearPointer) / 9)
    let targetYearPointer = currentYearPointer + (9 * diff)
    return targetYearPointer
  }

  const onCancel = () => {
    setIsCalendarPanelVisible(false)
    const date = field.value || selectedDate || currentDate
    if (!field.value) setSelectedDate(null)
    setYearPointer(getPointerByYear(date.getFullYear()))
    setViewedYear(date.getFullYear())
    setViewedMonth(date.getMonth())
    setTimeSecond(moment(date).format('ss'))
    setTimeMinute(moment(date).format('mm'))
    setTimeHour(moment(date).format('HH'))
    setDisplayMode(DATE_MODE)
  }

  const firstDate = useMemo(() => new Date(viewedYear, viewedMonth, 1, now.getHours(), now.getMinutes(), now.getSeconds(), 0), [viewedYear, viewedMonth, now])
  const lastDate = useMemo(() => new Date(viewedYear, viewedMonth + 1, 0, now.getHours(), now.getMinutes(), now.getSeconds(), 0), [viewedYear, viewedMonth, now])

  const dates = useMemo(() => {
    let date = []
    const dayOfFirstDate = firstDate.getDay()
    const dayOfLastDate = lastDate.getDay()
    const start = firstDate.getTime() - (dayOfFirstDate > 0 ? (dayOfFirstDate - 1) : 6) * 24 * 60 * 60 * 1000
    const end = lastDate.getTime() + ((dayOfLastDate > 0) ? (dayOfLastDate + ((6 - (dayOfLastDate - 1)) - dayOfLastDate)) : 0) * 24 * 60 * 60 * 1000
    for (let i = start; i <= end; i = i + (24 * 60 * 60 * 1000)) {
      date.push(new Date(i))
    }
    return date
  }, [firstDate, lastDate])

  const years = useMemo(() => {
    let year = []
    const start = yearPointer - 4
    const end = yearPointer + 4
    for (let i = start; i <= end; i++) {
      year.push(i)
    }
    return year
  }, [yearPointer])

  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const onNext = () => {
    if (displayMode === DATE_MODE) {
      if (viewedMonth === 11) {
        setViewedYear(state => (state + 1))
        setViewedMonth(0)
        return
      }
      setViewedMonth(state => (state + 1))
    } else if (displayMode === MONTH_MODE) {
      setViewedYear(state => (state + 1))
    } else {
      setYearPointer(state => (state + 9))
    }
  }

  const onPrev = () => {
    if (displayMode === DATE_MODE) {
      if (viewedMonth === 0) {
        setViewedYear(state => (state - 1))
        setViewedMonth(11)
        return
      }
      setViewedMonth(state => (state - 1))
    } else if (displayMode === MONTH_MODE) {
      setViewedYear(state => (state - 1))
    } else {
      setYearPointer(state => (state - 9))
    }
  }

  const onChangeMode = () => {
    setDisplayMode(displayMode === DATE_MODE ? MONTH_MODE : displayMode === MONTH_MODE ? YEAR_MODE : DATE_MODE)
  }

  const setYearPointerByValue = useCallback(() => {
    if (!field.value) return
    const targetYearPointer = getPointerByYear(field.value.getFullYear())
    setYearPointer(targetYearPointer)
  }, [field.value])

  const setViewedYearByValue = useCallback(() => {
    if (!field.value) return
    let yearOfValue = field.value.getFullYear()
    setViewedYear(yearOfValue)
  }, [field.value])

  const setViewedMonthByValue = useCallback(() => {
    if (!field.value) return
    let monthOfValue = field.value.getMonth()
    setViewedMonth(monthOfValue)
  }, [field.value])

  const setTimeByValue = useCallback(() => {
    if (!field.value) return
    setTimeSecond(moment(field.value).format('ss'))
    setTimeMinute(moment(field.value).format('mm'))
    setTimeHour(moment(field.value).format('HH'))
  }, [])

  useEffect(() => {
    setYearPointerByValue()
    setViewedYearByValue()
    setViewedMonthByValue()
    setTimeByValue()
  }, [])

  const onDatePress = (date: Date) => {
    const hour = Number(timeHour)
    const minute = Number(timeMinute)
    const second = Number(timeSecond)
    date = new Date(date.setHours(hour, minute, second, 0))
    setSelectedDate(date)
  }

  const onOkPress = () => {
    setIsCalendarPanelVisible(false)
    if (!selectedDate) return
    const hour = Number(timeHour)
    const minute = Number(timeMinute)
    const second = Number(timeSecond)
    const date = new Date(selectedDate.setHours(hour, minute, second, 0))
    field.onChange(date)
  }

  const isDisabled = (date: Date) => {
    return (date.getTime() < firstDate.getTime() || date.getTime() > lastDate.getTime())
  }

  return (
    <View style={containerStyle}>
      {
        label &&
        <FieldLabel label={label} required={required} />
      }
      <View style={{ borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: errors[name] ? theme.borderDangerColor1 : !editable ? theme.backgroundBasicColor1 : theme.borderBasicColor1, backgroundColor: theme.backgroundBasicColor1 }}>
        <TextInput placeholderTextColor={theme.textHintColor} style={{ paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 15 : 10, color: !editable ? theme.textDisabledColor : theme.textBasicColor, fontFamily: getFontFamily({}) }} placeholder={placeholder} value={field.value ? moment(field.value).format('ddd, DD MMM YY HH:mm:ss') : undefined} />
        <TouchableOpacity
          disabled={!editable}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: BORDER_RADIUS, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 15 }}
          activeOpacity={1}
          onPress={onViewCalendar}
        >
          {
            errors[name] &&
            <Icon name='error' color={theme.textDangerColor} size={TEXT_CONFIG.h6.fontSize} style={{ marginRight: 5 }} />
          }
          <Icon name='calendar-today' color={!editable ? theme.textDisabledColor : theme.textHintColor} size={TEXT_CONFIG.p1.fontSize} />
        </TouchableOpacity>
      </View>
      {
        (errors[name] && typeof errors[name].message === 'string') &&
        <Typography category='c1' style={{ marginTop: 5 }} color={theme.textDangerColor}>{capitalizeFirstText(errors[name].message)}</Typography>
      }
      <EModal
        visible={isCalendarPanelVisible}
        onClose={onCancel}
      >
        <View style={{ backgroundColor: theme.backgroundBasicColor0, padding: GUTTER_SPACE, marginBottom: (Platform.OS === 'ios' ? GUTTER_SPACE * 3 : StatusBar.currentHeight), borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: theme.borderBasicColor0, width: (width < height ? width : height) - (GUTTER_SPACE * 2), marginLeft: GUTTER_SPACE }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <TouchableOpacity
              activeOpacity={0.65}
              style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }}
              onPress={onPrev}
            >
              <Icon name='chevron-left' size={TEXT_CONFIG.h3.fontSize} color={theme.textBasicColor} />
            </TouchableOpacity>
            {
              displayMode !== YEAR_MODE &&
              <TouchableOpacity
                activeOpacity={0.65} onPress={onChangeMode}>
                <Typography category='h6'>{moment(new Date(viewedYear, viewedMonth, 1)).format(displayMode === MONTH_MODE ? 'Y' : 'MMM Y')}</Typography>
              </TouchableOpacity>
            }
            <TouchableOpacity
              activeOpacity={0.65}
              style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }}
              onPress={onNext}
            >
              <Icon name='chevron-right' size={TEXT_CONFIG.h3.fontSize} color={theme.textBasicColor} />
            </TouchableOpacity>
          </View>
          {
            displayMode === DATE_MODE &&
            <>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5 }}>
                {
                  days.map(day => (
                    <View key={day} style={{ width: (width - (GUTTER_SPACE * 2) - (GUTTER_SPACE * 2) - 3) / 7 }}>
                      <Typography category='label' style={{ textAlign: 'center' }}>{day}</Typography>
                    </View>
                  ))
                }
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  dates.map(date => (
                    <TouchableOpacity
                      activeOpacity={0.65}
                      disabled={isDisabled(date)} key={date.getTime()} style={{ width: (width - (GUTTER_SPACE * 2) - (GUTTER_SPACE * 2) - 3) / 7, height: (width - (GUTTER_SPACE * 2) - (GUTTER_SPACE * 2) - 3) / 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: ((width - (GUTTER_SPACE * 2) - (GUTTER_SPACE * 2) - 3) / 7) / 2, backgroundColor: (selectedDate && moment(date).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY')) ? COLORS.colorPrimary500 : 'transparent' }}
                      onPress={() => onDatePress(date)}>
                      <Typography color={isDisabled(date) ? theme.textDisabledColor : (selectedDate && moment(date).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY')) ? COLORS.colorBasic100 : date.getTime() === currentDate.getTime() ? theme.textWarningColor : date.getDay() === 0 ? theme.textDangerColor : theme.textBasicColor} category='p1'>{date.getDate()}</Typography>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </>
          }
          {
            displayMode === MONTH_MODE &&
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, columnGap: 5 }}>
              {
                months.map((month, i) => (
                  <TouchableOpacity
                    activeOpacity={0.65}
                    key={month}
                    style={{ width: (width - 2 - (GUTTER_SPACE * 2 * 2) - (2 * 5)) / 3, paddingVertical: 10, backgroundColor: i === viewedMonth ? COLORS.colorPrimary500 : theme.backgroundBasicColor0, borderRadius: BORDER_RADIUS }}
                    onPress={() => {
                      setViewedMonth(i)
                      setDisplayMode(DATE_MODE)
                    }}
                  >
                    <Typography style={{ textAlign: 'center' }} color={i === viewedMonth ? COLORS.colorBasic100 : theme.textBasicColor}>{month}</Typography>
                  </TouchableOpacity>
                ))
              }
            </View>
          }
          {
            displayMode === YEAR_MODE &&
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, columnGap: 5 }}>
              {
                years.map(year => (
                  <TouchableOpacity
                    activeOpacity={0.65}
                    key={year}
                    style={{ width: (width - 2 - (GUTTER_SPACE * 2 * 2) - (2 * 5)) / 3, paddingVertical: 10, backgroundColor: year === viewedYear ? COLORS.colorPrimary500 : theme.backgroundBasicColor0, borderRadius: BORDER_RADIUS }}
                    onPress={() => {
                      setViewedYear(year)
                      setDisplayMode(MONTH_MODE)
                    }}
                  >
                    <Typography style={{ textAlign: 'center' }} color={year === viewedYear ? COLORS.colorBasic100 : theme.textBasicColor}>{year}</Typography>
                  </TouchableOpacity>
                ))
              }
            </View>
          }
          {
            displayMode === DATE_MODE && (
              <View style={{ marginTop: GUTTER_SPACE * 2, alignItems: 'center' }}>
                <TimePicker second={timeSecond} minute={timeMinute} hour={timeHour} setSecond={setTimeSecond} setMinute={setTimeMinute} setHour={setTimeHour} />
              </View>
            )
          }
          {
            displayMode === DATE_MODE &&
            <View style={{ gap: 5, marginTop: GUTTER_SPACE * 2 }}>
              <Button appearance='primary' onPress={onOkPress}>OK</Button>
              <Button appearance='transparent' onPress={onCancel}>Cancel</Button>
            </View>
          }
        </View>
      </EModal>
    </View>
  )
}

import TimePicker from './TimePicker'
import { getFontFamily } from '../Typography'
import EModal from '../EModal'
import ControlProps from '../ControlProps'
import FieldLabel from '../FieldLabel'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

export default DatePicker