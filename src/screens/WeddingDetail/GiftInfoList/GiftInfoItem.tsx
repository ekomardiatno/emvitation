import { Image, View } from 'react-native';
import Card from '../../../components/core/Card';
import { FONT_FAMILY, PROVIDERS, SPACING } from '../../../constants';
import { useTheme } from '../../../components/core/AppProvider';
import Typography from '../../../components/core/Typography';
import Button from '../../../components/core/Button';
import groupDigits from '../../../utils/groupDigits';
import Confirmation from '../../../components/core/Confirmation';

const providerNames = PROVIDERS.map(p => p.name);

type ProviderName = (typeof providerNames)[number];

export default function GiftInfoItem({
  providerName,
  accountNumber,
  accountHolderName,
  onEdit,
  onDelete,
  isDeleting,
  disableControls,
}: {
  providerName: ProviderName;
  accountNumber: string;
  accountHolderName: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  disableControls?: boolean;
}) {
  const theme = useTheme();
  const provider = PROVIDERS.find(p => p.name === providerName);

  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          gap: SPACING.md,
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            borderRadius: SPACING.md,
            overflow: 'hidden',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: theme['border-default'],
            padding: SPACING.sm,
          }}>
          <Image
            source={
              provider?.logo[theme.schema === 'dark' ? 'white' : 'regular']
            }
            style={{width: 100, height: 40, resizeMode: 'contain'}}
          />
        </View>
        <View style={{flexGrow: 1, paddingTop: SPACING.xs}}>
          <Typography
            style={{
              fontFamily: FONT_FAMILY.mono,
              fontWeight: 600,
            }}>
            {groupDigits(accountNumber, 4, ' ')}
          </Typography>
          <Typography
            style={{
              color: theme['text-secondary'],
            }}>
            a.n. {accountHolderName}
          </Typography>
          {!disableControls && (
            <View
              style={{
                marginTop: SPACING.md,
                paddingTop: SPACING.md,
                borderTopWidth: 1,
                borderTopColor: theme['border-default'],
                flexDirection: 'row',
                gap: SPACING.md,
                justifyContent: 'flex-end',
              }}>
              <Confirmation
                mode="button"
                onConfirmed={onDelete}
                appearance="basic"
                confirmationDialogAppearance="danger"
                cautionTitle="Hapus Info Amplop Digital"
                cautionText="Apakah Anda yakin ingin menghapus info amplop digital ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                isLoading={isDeleting}
                buttonStyle={{
                  paddingVertical: SPACING.xs,
                  borderColor: theme['error-text'],
                }}
                textStyle={{color: theme['error-text']}}>
                Hapus
              </Confirmation>
              <Button
                onPress={onEdit}
                appearance="basic"
                isLoading={isDeleting}
                style={{paddingVertical: SPACING.xs}}>
                Edit
              </Button>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}
