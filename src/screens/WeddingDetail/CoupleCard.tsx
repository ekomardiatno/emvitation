import { Image, View } from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import { RADIUS, SPACING } from '../../constants';
import Typography from '../../components/core/Typography';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function CoupleCard({
  name,
  fatherName,
  motherName,
  hometown,
  imgUri,
  gender = 'male',
}: {
  name?: string;
  fatherName?: string | null;
  motherName?: string | null;
  hometown?: string | null;
  imgUri?: string | null;
  gender?: 'male' | 'female';
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        padding: SPACING.sm,
        borderRadius: SPACING.sm,
        flexDirection: 'row',
        gap: SPACING.md,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: theme.divider,
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: RADIUS.full,
          overflow: 'hidden',
          borderWidth: SPACING.xxs,
          borderColor: theme['border-default'],
          backgroundColor: theme['secondary-bg'],
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {imgUri ? (
          <Image
            source={{uri: imgUri}}
            style={{width: 50, height: 50}}
            resizeMode="cover"
          />
        ) : (
          <MaterialIcons
            size={40}
            color={theme['text-secondary']}
            name="person"
          />
        )}
      </View>
      <View style={{flexGrow: 1}}>
        <Typography fontWeight={600}>{name}</Typography>
        {(fatherName || motherName) && (
          <Typography
            category="xsmall"
            color={theme['text-secondary']}
            style={{marginTop: SPACING.xxs}}>
            {gender === 'male' ? 'Putra' : 'Putri'} dari{' '}
            {`${[fatherName, motherName].filter(s => !!s).join(' & ')}`}
          </Typography>
        )}
        {hometown && (
          <Typography category="small" style={{marginTop: SPACING.xs}}>
            {hometown}
          </Typography>
        )}
      </View>
    </View>
  );
}
