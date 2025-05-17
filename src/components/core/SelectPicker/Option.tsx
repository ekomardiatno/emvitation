import { TouchableHighlight, View } from 'react-native'
import { BORDER_WIDTH, COLORS } from '../../../constants'
import { useTheme } from '../AppProvider'
import Typography from '../Typography'
import { JSX } from 'react'

const Option = ({ value, title, onChange, icon, selected, isLastIndex = false }: {
  value: string
  title: string
  onChange: ((value: string) => void) | undefined
  icon: JSX.Element
  selected: boolean
  isLastIndex: boolean
}): JSX.Element => {
  const theme = useTheme()
  return (
    <TouchableHighlight underlayColor={selected ? theme.backgroundBasicColor3 : theme.backgroundBasicColor2} style={{ borderRadius: 15 }} onPress={() => {
      if (onChange)
        onChange(value)
    }}>
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: selected ? COLORS.colorPrimary400 : theme.backgroundBasicColor1, borderRadius: 15, gap: 20 }}>
        {
          icon &&
          <View style={{ paddingVertical: 10 }}>
            {icon}
          </View>
        }
        <View style={{ flex: 1, borderBottomWidth: isLastIndex ? 0 : BORDER_WIDTH, borderColor: selected ? COLORS.colorPrimary400 : theme.borderBasicColor4, paddingVertical: 10, justifyContent: 'center' }}>
          <Typography color={selected ? COLORS.colorBasic000 : undefined}>{title}</Typography>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default Option