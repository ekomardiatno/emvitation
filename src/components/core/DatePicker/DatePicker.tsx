import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../constants';
import { useTheme } from '../AppProvider';
import Typography from '../Typography';
import Icon from '@react-native-vector-icons/material-icons';
import moment from 'moment';
import Button from '../Button';
import { useController } from 'react-hook-form';
import capitalizeFirstText from '../../../utils/capitalizeFirstText';
import { YEAR_MODE, MONTH_MODE, DATE_MODE } from './constants';

const {width} = Dimensions.get('window');

const DatePicker = ({
  label,
  placeholder,
  name,
  control,
  required,
  defaultValue,
  editable = true,
  dateOnly,
  timeOnly,
  containerStyle,
  hideErrorText,
}: Omit<ControlProps, 'defaultValue'> & {
  defaultValue?: Date | string;
  containerStyle?: StyleProp<ViewStyle>;
  dateOnly?: boolean;
  timeOnly?: boolean;
  hideErrorText?: boolean;
}) => {
  const {height} = useSafeAreaFrame();
  defaultValue =
    defaultValue && moment(defaultValue).isValid()
      ? new Date(defaultValue)
      : undefined;
  let now = useMemo(() => defaultValue || new Date(), [defaultValue]);
  let currentDate = useMemo(
    () =>
      new Date(
        now.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0),
      ),
    [now],
  );
  const {
    field,
    formState: {errors},
  } = useController({
    control,
    name,
    defaultValue,
  });
  const theme = useTheme();
  const [isCalendarPanelVisible, setIsCalendarPanelVisible] = useState(false);
  const [viewedYear, setViewedYear] = useState(now.getFullYear());
  const [viewedMonth, setViewedMonth] = useState(now.getMonth());
  const [displayMode, setDisplayMode] = useState(DATE_MODE);
  const [yearPointer, setYearPointer] = useState(now.getFullYear());
  const [timeSecond, setTimeSecond] = useState(
    timeOnly ? '00' : moment(now).format('ss'),
  );
  const [timeMinute, setTimeMinute] = useState(
    timeOnly ? '00' : moment(now).format('mm'),
  );
  const [timeHour, setTimeHour] = useState(
    timeOnly ? '00' : moment(now).format('HH'),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);

  useEffect(() => {
    if (dateOnly && field.value) {
      setSelectedDate(new Date(field.value));
    } else if (!timeOnly && field.value) {
      setSelectedDate(field.value);
    }
  }, [field.value, dateOnly, timeOnly]);

  const onViewCalendar = () => {
    setIsCalendarPanelVisible(state => !state);
  };

  const getPointerByYear = useCallback(
    (year: number) => {
      let currentYearPointer = currentDate.getFullYear();
      let diff = Math.round((year - currentYearPointer) / 9);
      let targetYearPointer = currentYearPointer + 9 * diff;
      return targetYearPointer;
    },
    [currentDate],
  );

  const onCancel = () => {
    setIsCalendarPanelVisible(false);
    const date = field.value
      ? new Date(field.value)
      : selectedDate || currentDate;
    if (!field.value) {
      setSelectedDate(null);
    }
    setYearPointer(getPointerByYear(date.getFullYear()));
    setViewedYear(date.getFullYear());
    setViewedMonth(date.getMonth());
    setTimeSecond(moment(date).format('ss'));
    setTimeMinute(moment(date).format('mm'));
    setTimeHour(moment(date).format('HH'));
    setDisplayMode(DATE_MODE);
  };

  const firstDate = useMemo(
    () =>
      new Date(
        viewedYear,
        viewedMonth,
        1,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        0,
      ),
    [viewedYear, viewedMonth, now],
  );
  const lastDate = useMemo(
    () =>
      new Date(
        viewedYear,
        viewedMonth + 1,
        0,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        0,
      ),
    [viewedYear, viewedMonth, now],
  );

  const dates = useMemo(() => {
    let date = [];
    const dayOfFirstDate = firstDate.getDay();
    const dayOfLastDate = lastDate.getDay();
    const start =
      firstDate.getTime() -
      (dayOfFirstDate > 0 ? dayOfFirstDate - 1 : 6) * 24 * 60 * 60 * 1000;
    const end =
      lastDate.getTime() +
      (dayOfLastDate > 0
        ? dayOfLastDate + (6 - (dayOfLastDate - 1) - dayOfLastDate)
        : 0) *
        24 *
        60 *
        60 *
        1000;
    for (let i = start; i <= end; i = i + 24 * 60 * 60 * 1000) {
      date.push(new Date(i));
    }
    return date;
  }, [firstDate, lastDate]);

  const years = useMemo(() => {
    let year = [];
    const start = yearPointer - 4;
    const end = yearPointer + 4;
    for (let i = start; i <= end; i++) {
      year.push(i);
    }
    return year;
  }, [yearPointer]);

  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const onNext = () => {
    if (displayMode === DATE_MODE) {
      if (viewedMonth === 11) {
        setViewedYear(state => state + 1);
        setViewedMonth(0);
        return;
      }
      setViewedMonth(state => state + 1);
    } else if (displayMode === MONTH_MODE) {
      setViewedYear(state => state + 1);
    } else {
      setYearPointer(state => state + 9);
    }
  };

  const onPrev = () => {
    if (displayMode === DATE_MODE) {
      if (viewedMonth === 0) {
        setViewedYear(state => state - 1);
        setViewedMonth(11);
        return;
      }
      setViewedMonth(state => state - 1);
    } else if (displayMode === MONTH_MODE) {
      setViewedYear(state => state - 1);
    } else {
      setYearPointer(state => state - 9);
    }
  };

  const onChangeMode = () => {
    setDisplayMode(
      displayMode === DATE_MODE
        ? MONTH_MODE
        : displayMode === MONTH_MODE
        ? YEAR_MODE
        : DATE_MODE,
    );
  };

  const setYearPointerByValue = useCallback(() => {
    if (!field.value) return;
    const targetYearPointer = getPointerByYear(
      timeOnly ? new Date().getFullYear() : new Date(field.value).getFullYear(),
    );
    setYearPointer(targetYearPointer);
  }, [field.value, getPointerByYear, timeOnly]);

  const setViewedYearByValue = useCallback(() => {
    if (!field.value) return;
    let yearOfValue = timeOnly
      ? new Date().getFullYear()
      : new Date(field.value).getFullYear();
    setViewedYear(yearOfValue);
  }, [field.value, timeOnly]);

  const setViewedMonthByValue = useCallback(() => {
    if (!field.value) return;
    let monthOfValue = timeOnly
      ? new Date().getMonth()
      : new Date(field.value).getMonth();
    setViewedMonth(monthOfValue);
  }, [field.value, timeOnly]);

  const setTimeByValue = useCallback(() => {
    if (!field.value) return;
    let date = field.value;
    if (timeOnly) {
      const timeStates = (field.value as string).split(':');
      date = new Date(
        new Date().setHours(
          Number(timeStates.at(0)),
          Number(timeStates.at(1)),
          Number(timeStates.at(2)),
          0,
        ),
      );
    }
    setTimeSecond(moment(date).format('ss'));
    setTimeMinute(moment(date).format('mm'));
    setTimeHour(moment(date).format('HH'));
  }, [field.value, timeOnly]);

  useEffect(() => {
    setYearPointerByValue();
    setViewedYearByValue();
    setViewedMonthByValue();
    setTimeByValue();
  }, [
    setTimeByValue,
    setViewedMonthByValue,
    setViewedYearByValue,
    setYearPointerByValue,
  ]);

  const onDatePress = (date: Date) => {
    const hour = Number(timeHour);
    const minute = Number(timeMinute);
    const second = Number(timeSecond);
    date = new Date(date.setHours(hour, minute, second, 0));
    setSelectedDate(date);
  };

  const onOkPress = () => {
    setIsCalendarPanelVisible(false);
    const hour = Number(timeHour);
    const minute = Number(timeMinute);
    const second = Number(timeSecond);
    if (timeOnly) {
      field.onChange(
        moment(new Date().setHours(hour, minute, second)).format('HH:mm:ss'),
      );
      return;
    }
    if (!selectedDate) {
      return;
    }
    const date = dateOnly
      ? moment(selectedDate).format('YYYY-MM-DD')
      : new Date(selectedDate.setHours(hour, minute, second, 0)).toISOString();
    field.onChange(date);
  };

  const isDisabled = (date: Date) => {
    return (
      date.getTime() < firstDate.getTime() ||
      date.getTime() > lastDate.getTime()
    );
  };

  return (
    <View style={containerStyle}>
      {label && <FieldLabel label={label} required={required} />}
      <View
        style={{
          borderWidth: 1,
          borderRadius: RADIUS.sm,
          borderColor: errors[name]
            ? theme['error-text']
            : !editable
            ? theme['border-muted']
            : theme['input-border'],
          backgroundColor: theme['input-bg'],
        }}>
        <TextInput
          placeholderTextColor={theme['input-placeholder']}
          style={{
            paddingHorizontal: SPACING.md,
            paddingVertical: Platform.OS === 'ios' ? 15 : 10,
            color: !editable ? theme['text-disabled'] : theme['input-text'],
            fontFamily: getFontFamily({}),
          }}
          placeholder={placeholder}
          value={
            field.value
              ? timeOnly
                ? field.value
                : dateOnly
                ? moment(field.value).format('ddd, DD MMM YY')
                : moment(field.value).format('ddd, DD MMM YY HH:mm:ss')
              : undefined
          }
          editable={false}
        />
        <TouchableOpacity
          disabled={!editable}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: RADIUS.md,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}
          activeOpacity={1}
          onPress={onViewCalendar}>
          {errors[name] && (
            <Icon
              name="error"
              color={theme['error-text']}
              size={TYPOGRAPHY.textStyle.small.fontSize}
              style={{marginRight: 5}}
            />
          )}
          <Icon
            name={timeOnly ? 'watch-later' : 'calendar-today'}
            color={!editable ? theme['text-disabled'] : theme['text-secondary']}
            size={TYPOGRAPHY.textStyle.regular.fontSize}
          />
        </TouchableOpacity>
      </View>
      {!hideErrorText &&
        errors[name] &&
        typeof errors[name].message === 'string' && (
          <FieldErrorText>
            {capitalizeFirstText(errors[name].message)}
          </FieldErrorText>
        )}
      <EModal visible={isCalendarPanelVisible} onClose={onCancel}>
        <View
          style={{
            backgroundColor: theme['bg-surface'],
            padding: SPACING.md,
            marginBottom:
              Platform.OS === 'ios' ? SPACING.md * 3 : StatusBar.currentHeight,
            borderWidth: 1,
            borderRadius: RADIUS.md,
            borderColor: theme['border-default'],
            width: (width < height ? width : height) - SPACING.md * 2,
            alignSelf: 'center',
          }}>
          {!timeOnly && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <TouchableOpacity
                activeOpacity={0.65}
                style={{
                  width: 35,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={onPrev}>
                <Icon
                  name="chevron-left"
                  size={TYPOGRAPHY.textStyle.h1.fontSize}
                  color={theme['text-primary']}
                />
              </TouchableOpacity>
              {displayMode !== YEAR_MODE && (
                <TouchableOpacity activeOpacity={0.65} onPress={onChangeMode}>
                  <Typography category="h4">
                    {moment(new Date(viewedYear, viewedMonth, 1)).format(
                      displayMode === MONTH_MODE ? 'Y' : 'MMM Y',
                    )}
                  </Typography>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.65}
                style={{
                  width: 35,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={onNext}>
                <Icon
                  name="chevron-right"
                  size={TYPOGRAPHY.textStyle.h1.fontSize}
                  color={theme['text-primary']}
                />
              </TouchableOpacity>
            </View>
          )}
          {displayMode === DATE_MODE && !timeOnly && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginBottom: 5,
                }}>
                {days.map(day => (
                  <View
                    key={day}
                    style={{
                      width: (width - SPACING.md * 2 - SPACING.md * 2 - 3) / 7,
                    }}>
                    <Typography category="small" style={{textAlign: 'center'}}>
                      {day}
                    </Typography>
                  </View>
                ))}
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {dates.map(date => (
                  <TouchableOpacity
                    activeOpacity={0.65}
                    disabled={isDisabled(date)}
                    key={date.getTime()}
                    style={{
                      width: (width - SPACING.md * 2 - SPACING.md * 2 - 3) / 7,
                      height: (width - SPACING.md * 2 - SPACING.md * 2 - 3) / 7,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius:
                        (width - SPACING.md * 2 - SPACING.md * 2 - 3) / 7 / 2,
                      backgroundColor:
                        selectedDate &&
                        moment(date).format('DD/MM/YYYY') ===
                          moment(selectedDate).format('DD/MM/YYYY')
                          ? theme['primary-bg']
                          : 'transparent',
                    }}
                    onPress={() => onDatePress(date)}>
                    <Typography
                      color={
                        isDisabled(date)
                          ? theme['text-disabled']
                          : selectedDate &&
                            moment(date).format('DD/MM/YYYY') ===
                              moment(selectedDate).format('DD/MM/YYYY')
                          ? theme['primary-text']
                          : date.getTime() === currentDate.getTime()
                          ? theme['warning-text']
                          : date.getDay() === 0
                          ? theme['error-text']
                          : theme['text-primary']
                      }>
                      {date.getDate()}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          {displayMode === MONTH_MODE && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                rowGap: 10,
                columnGap: 5,
              }}>
              {months.map((month, i) => (
                <TouchableOpacity
                  activeOpacity={0.65}
                  key={month}
                  style={{
                    width: (width - 2 - SPACING.md * 2 * 2 - 2 * 5) / 3,
                    paddingVertical: 10,
                    backgroundColor:
                      i === viewedMonth
                        ? theme['primary-bg']
                        : theme['bg-surface'],
                    borderRadius: RADIUS.md,
                  }}
                  onPress={() => {
                    setViewedMonth(i);
                    setDisplayMode(DATE_MODE);
                  }}>
                  <Typography
                    style={{textAlign: 'center'}}
                    color={
                      i === viewedMonth
                        ? theme['primary-text']
                        : theme['text-primary']
                    }>
                    {month}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {displayMode === YEAR_MODE && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                rowGap: 10,
                columnGap: 5,
              }}>
              {years.map(year => (
                <TouchableOpacity
                  activeOpacity={0.65}
                  key={year}
                  style={{
                    width: (width - 2 - SPACING.md * 2 * 2 - 2 * 5) / 3,
                    paddingVertical: 10,
                    backgroundColor:
                      year === viewedYear
                        ? theme['primary-bg']
                        : theme['bg-surface'],
                    borderRadius: RADIUS.md,
                  }}
                  onPress={() => {
                    setViewedYear(year);
                    setDisplayMode(MONTH_MODE);
                  }}>
                  <Typography
                    style={{textAlign: 'center'}}
                    color={
                      year === viewedYear
                        ? theme['primary-text']
                        : theme['text-primary']
                    }>
                    {year}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {displayMode === DATE_MODE && !dateOnly && (
            <View style={{marginTop: SPACING.md * 2, alignItems: 'center'}}>
              <TimePicker
                second={timeSecond}
                minute={timeMinute}
                hour={timeHour}
                setSecond={setTimeSecond}
                setMinute={setTimeMinute}
                setHour={setTimeHour}
              />
            </View>
          )}
          {displayMode === DATE_MODE && (
            <View style={{gap: 5, marginTop: SPACING.md * 2}}>
              <Button appearance="primary" onPress={onOkPress}>
                OK
              </Button>
              <Button appearance="transparent" onPress={onCancel}>
                Cancel
              </Button>
            </View>
          )}
        </View>
      </EModal>
    </View>
  );
};

import TimePicker from './TimePicker';
import { getFontFamily } from '../Typography';
import EModal from '../EModal';
import ControlProps from '../ControlProps';
import FieldLabel from '../FieldLabel';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import FieldErrorText from '../FieldErrorText';

export default DatePicker;
