import React, { useState } from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import InfoIcon from '@/assets/icons/info/info.svg';
import { useTheme } from '@/assets/theme';
import { useChildrenStore } from '@/core/store/childrenStore';
import { useChildren } from '@/features/family/screens/hooks/useChildren';
import { ChildStatus, type Child } from '@/features/family/types/children.types';
import { InfoModal } from '@/shared/components/info-modal';
import { Screen } from '@/shared/components/screen';
import { Text } from '@/shared/components/text';

import { KliqFamilyListItems } from './components/kliq-family-list-items/KliqFamilyListItems';

const KliqFamilyListScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyListScreen>) => {
  const { normalizeSize } = useTheme();
  const { data: storeData, isLoading } = useChildrenStore();
  useChildren({ autoFetch: !storeData });
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const children = storeData?.registeredChildren || [];

  const navigateToAddMember = () => navigation.navigate(KliqFamilyRoutes.AddKliqFamilyMemberScreen);

  const handleChildPress = (child: Child) => {
    if (child.status === ChildStatus.AWAITING_APPROVAL) {
      setIsInfoModalVisible(true);
      return;
    }
    navigation.navigate(KliqFamilyRoutes.KliqFamilyListDetailScreen, { child });
  };

  const onCloseInfoModal = () => {
    setIsInfoModalVisible(false);
  };

  return (
    <Screen
      isScreenLoading={isLoading}
      primaryButton={{
        text: 'Kliq Aileme Ekle',
        onPress: navigateToAddMember,
      }}
    >
      <Text variant="captionBold">Kliq Ailem</Text>
      <KliqFamilyListItems children={children} onChildPress={handleChildPress} />
      <InfoModal
        description={'Üyelik süreci aktifleştirildiğinde detayları görebilirsin.'}
        icon={<InfoIcon height={normalizeSize(200)} width={normalizeSize(200)} />}
        onClose={onCloseInfoModal}
        primaryButton={{
          text: 'Tamam',
          onPress: onCloseInfoModal,
          variant: 'primary',
        }}
        secondaryButton={{
          text: 'Hatırlatma Gönder',
          onPress: onCloseInfoModal,
          variant: 'secondary',
        }}
        title={'Bilgilendirme'}
        visible={isInfoModalVisible}
      />
    </Screen>
  );
};

export default KliqFamilyListScreen;
