import { ScrollView, SafeAreaView, StyleProp, ViewStyle } from 'react-native'
import { GUTTER_SPACE } from '../../constants'
import { JSX } from 'react'

const Layout = ({ children, style, scrollViewProps }: {
  children: JSX.Element
  style: StyleProp<ViewStyle>
  scrollViewProps: ScrollView
}): JSX.Element => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={[{ paddingHorizontal: GUTTER_SPACE, paddingVertical: 15 }, style]} {...scrollViewProps}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Layout