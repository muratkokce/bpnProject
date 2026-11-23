import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { Child } from '@/features/family/types/children.types';
import type { ListItemChildren } from '@/shared/components/list-item/types';
import { showToast } from '@/shared/utils';

type Navigation = FamilyScreenProps<
  typeof KliqFamilyRoutes.KliqFamilyListDetailScreen
>['navigation'];

export const useKliqFamilyListDetailMenuItems = (child: Child, navigation: Navigation) => {
  const showUnavailableAlert = (title: string) => () =>
    showToast({ message: 'Bu işlem henüz kullanılamıyor.', type: 'info', title });

  const accountAndCardMenuItems: ListItemChildren[] = [
    {
      title: 'Hesap Hareketleri',
      onPress: () => navigation.navigate(KliqFamilyRoutes.KliqFamilyTransactionScreen, { child }),
    },
    {
      title: 'Limit ve Yetki İşlemleri',
      onPress: () =>
        navigation.navigate(KliqFamilyRoutes.KliqFamilyLimitAuthorityScreen, { child }),
    },

    {
      title: 'Fiziki Kart Kayıp / Çalıntı / İptal',
      onPress: showUnavailableAlert('Fiziki Kart Kayıp / Çalıntı / İptal'),
    },
    {
      title: 'Sanal Kart İptal',
      onPress: showUnavailableAlert('Sanal Kart İptal'),
    },
  ];

  const financialSettingsMenuItems: ListItemChildren[] = [
    {
      title: 'Hemen Para Gönder',
      onPress: showUnavailableAlert('Hemen Para Gönder'),
    },
  ];

  return { accountAndCardMenuItems, financialSettingsMenuItems };
};
