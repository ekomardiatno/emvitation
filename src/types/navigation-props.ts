import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type TemplateParamsProp = {
  action: 'view' | 'select'
  onSelected?: (templateId: number) => void
}

export type RouteNavigationParamList = {
  'Home': undefined,
  'Create Invitation': undefined,
  'Bill': undefined,
  'Wallet': undefined
  'Profile': undefined
  'Template'?: TemplateParamsProp
}

export type NavigationProp = NativeStackNavigationProp<RouteNavigationParamList>