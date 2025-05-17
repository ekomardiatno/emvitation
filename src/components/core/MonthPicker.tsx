import { TouchableHighlight, TouchableOpacity, View } from "react-native"
import Typography from "./Typography"
import { COLORS, GUTTER_SPACE, TEXT_CONFIG } from "../../constants"
import { useTheme } from "./AppProvider"
import { useContext, useMemo, useState } from "react"
import Icon from '@react-native-vector-icons/material-icons'
import moment from "moment"
import { MONTH_MODE, YEAR_MODE } from "./DatePicker/constants"
import { AppWindowDimensions } from "./ScreenSafeAreaView"

export default function MonthPicker({ value, onChange }: {
  value: Date | string;
  onChange: (date: Date) => void
}) {
  const { width } = useContext(AppWindowDimensions)
  let now = value ? (typeof value === 'string' ? new Date(value) : value) : new Date()
  const [viewedYear, setViewedYear] = useState(now.getFullYear())
  const viewedMonth = now.getMonth()
  const theme = useTheme()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [displayMode, setDisplayMode] = useState(MONTH_MODE)
  const [yearPointer, setYearPointer] = useState(now.getFullYear())

  const onChangeMode = () => {
    setDisplayMode(displayMode === MONTH_MODE ? YEAR_MODE : MONTH_MODE)
  }

  const onNext = () => {
    if (displayMode === MONTH_MODE) {
      setViewedYear(state => (state + 1))
    } else {
      setYearPointer(state => (state + 9))
    }
  }

  const onPrev = () => {
    if (displayMode === MONTH_MODE) {
      setViewedYear(state => (state - 1))
    } else {
      setYearPointer(state => (state - 9))
    }
  }

  const years = useMemo(() => {
    let year = []
    const start = yearPointer - 4
    const end = yearPointer + 4
    for (let i = start; i <= end; i++) {
      year.push(i)
    }
    return year
  }, [yearPointer])

  const selectedBgColor = COLORS.colorPrimary600
  const selectedTextColor = COLORS.colorBasic100
  const unselectedBgColor = theme.backgroundBasicColor2
  const unselectedTextColor = theme.textBasicColor

  return (
    <View style={{ padding: GUTTER_SPACE }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 5, backgroundColor: theme.backgroundBasicColor2, borderRadius: 5 }}>
        <TouchableHighlight
          underlayColor={theme.backgroundBasicColor3}
          style={{ borderRadius: 0 }}
          onPress={onPrev}
        >
          <View style={{ width: 35, height: 35, backgroundColor: theme.backgroundBasicColor2, alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
            <Icon name='chevron-left' size={TEXT_CONFIG.h3.fontSize} color={theme.textBasicColor} />
          </View>
        </TouchableHighlight>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {
            displayMode !== YEAR_MODE &&
            <TouchableOpacity
              activeOpacity={0.65} onPress={onChangeMode}>
              <Typography color={theme.textBasicColor} category='h6'>{moment(new Date(viewedYear, viewedMonth, 1)).format(displayMode === MONTH_MODE ? 'Y' : 'MMM Y')}</Typography>
            </TouchableOpacity>
          }
        </View>
        <TouchableHighlight
          underlayColor='rgba(0,0,0,.5)'
          style={{ borderRadius: 0 }}
          onPress={onNext}
        >
          <View style={{ width: 35, height: 35, backgroundColor: theme.backgroundBasicColor2, alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
            <Icon name='chevron-right' size={TEXT_CONFIG.h3.fontSize} color={theme.textBasicColor} />
          </View>
        </TouchableHighlight>
      </View>
      {
        displayMode === YEAR_MODE ?
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 5, rowGap: 10 }}>
            {
              years.map(year => (
                <TouchableOpacity
                  activeOpacity={0.65}
                  key={year}
                  style={{ width: (width - GUTTER_SPACE * 2 - 5 * 2) / 3, paddingVertical: 10, backgroundColor: year === viewedYear ? selectedBgColor : unselectedBgColor, borderRadius: 5 }}
                  onPress={() => {
                    setViewedYear(year)
                    setDisplayMode(MONTH_MODE)
                  }}
                >
                  <Typography style={{ textAlign: 'center' }} color={year === viewedYear ? selectedTextColor : unselectedTextColor}>{year}</Typography>
                </TouchableOpacity>
              ))
            }
          </View>
          :
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 5, rowGap: 10 }}>
            {
              months.map((month, i) => (
                <TouchableOpacity
                  activeOpacity={0.65}
                  key={month}
                  style={{ width: (width - GUTTER_SPACE * 2 - 5 * 3) / 4, paddingVertical: 10, backgroundColor: (new Date(value).getFullYear() === viewedYear && new Date(value).getMonth() === i) ? selectedBgColor : unselectedBgColor, borderRadius: 5 }}
                  onPress={() => {
                    if (typeof onChange === 'function') onChange(new Date(viewedYear, i, 1, 0, 0, 0, 0))
                  }}
                >
                  <Typography style={{ textAlign: 'center' }} color={(new Date(value).getFullYear() === viewedYear && new Date(value).getMonth() === i) ? selectedTextColor : unselectedTextColor}>{month}</Typography>
                </TouchableOpacity>
              ))
            }
          </View>
      }
    </View>
  )
}