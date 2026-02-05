import { SharedValue } from 'react-native-reanimated';
import { Vendor } from '..';
import { View } from 'react-native';
import { SPACING } from '../../../../constants';
import PaginationDot from './PaginationDot';

export default function Pagination({
  data,
  scrollX,
}: {
  data: Vendor[];
  scrollX: SharedValue<number>;
}) {
  if (data.length < 2) {
    return null;
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.md,
      }}>
      {data.map((_, index) => {
        return <PaginationDot key={index} index={index} scrollX={scrollX} />;
      })}
    </View>
  );
}
