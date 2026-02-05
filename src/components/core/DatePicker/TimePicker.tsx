import { View } from 'react-native'
import Typography from '../Typography'
import TimeScroller from './TimeScroller'

const TimePicker = ({
  second,
  setSecond,
  minute,
  setMinute,
  hour,
  setHour
}: {
  second: string
  setSecond: (time: string) => void
  minute: string
  setMinute: (time: string) => void
  hour: string
  setHour: (time: string) => void
}) => {
  const minutes = () => {
    let minute = []
    let i = 0
    while (i <= 59) {
      minute.push(i)
      i++
    }
    return minute
  }
  const seconds = () => {
    let second = []
    let i = 0
    while (i <= 59) {
      second.push(i)
      i++
    }
    return second
  }
  const hours = () => {
    let hour = []
    let i = 0
    while (i <= 23) {
      hour.push(i)
      i++
    }
    return hour
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TimeScroller setTime={setHour} time={hour} numbers={hours()} />
      <Typography style={{ marginHorizontal: 5 }}>:</Typography>
      <TimeScroller setTime={setMinute} time={minute} numbers={minutes()} />
      <Typography style={{ marginHorizontal: 5 }}>:</Typography>
      <TimeScroller setTime={setSecond} time={second} numbers={seconds()} />
    </View>
  )
}

export default TimePicker