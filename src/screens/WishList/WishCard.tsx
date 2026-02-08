import moment from 'moment';
import { useTheme } from '../../components/core/AppProvider';
import Card from '../../components/core/Card';
import Typography from '../../components/core/Typography';
import { SPACING } from '../../constants';
import { WishDataType } from '../../types/wish-type';
import useAppSelector from '../../hooks/useAppSelector';
import { WeddingCard } from '../MyWedding/WeddingCard';
import { View } from 'react-native';
import Divider from '../../components/Divider';

export default function WishCard({wish}: {wish: WishDataType}) {
  const theme = useTheme();
  const {weddings} = useAppSelector(state => state.wedding);
  const wedding = weddings.find(w => w.invitationId === wish.invitationId);
  return (
    <Card>
      <Typography category="large" fontWeight={600}>
        {wish.guestName}
      </Typography>
      <Typography style={{marginTop: SPACING.xxs}}>{wish.message}</Typography>
      <Typography
        category="xsmall"
        marginTop={SPACING.sm}
        color={theme['text-secondary']}>
        {moment(wish.createdAt).format('ddd, DD MMM Y HH:mm')}
      </Typography>
      {wedding && (
        <View>
          <Divider marginVertical={SPACING.md} />
          <WeddingCard
            hideTemplateInfo={true}
            data={wedding}
            controls={<></>}
          />
        </View>
      )}
    </Card>
  );
}
