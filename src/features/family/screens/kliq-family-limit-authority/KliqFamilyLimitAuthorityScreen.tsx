import React, { useCallback, useMemo, useRef, useState } from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyIcon from '@/assets/icons/info/empty.svg';
import { useTheme } from '@/assets/theme';
import { useFamilyLimitAuthorityStore } from '@/core/store';
import { Button } from '@/shared/components/button';
import { InfoCard } from '@/shared/components/info-card';
import { InfoModal } from '@/shared/components/info-modal';
import { Screen } from '@/shared/components/screen';
import { Tabs, TabsItem } from '@/shared/components/tabs';
import { useDisableBackNavigation } from '@/shared/hooks/useDisableBackNavigation';

import { useFamilyLimitAuthority } from '../hooks/useFamilyLimitAuthority';

import { AccountPermissions, CardPermissions } from './components';
import type { PermissionsBaseHandle } from './components';

const KliqFamilyLimitAuthorityScreen = ({
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyLimitAuthorityScreen>) => {
  const { child } = route.params;
  const { normalizeSize } = useTheme();

  const { data: storeData, isLoading } = useFamilyLimitAuthorityStore();
  useFamilyLimitAuthority({ autoFetch: !storeData });

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasChangesByTab, setHasChangesByTab] = useState<boolean[]>([false, false]);
  const [isUnsavedChangesModalVisible, setIsUnsavedChangesModalVisible] = useState(false);
  const accountPermissionsRef = useRef<PermissionsBaseHandle>(null);
  const cardPermissionsRef = useRef<PermissionsBaseHandle>(null);

  const hasUnsavedChanges = useMemo(() => hasChangesByTab.some(Boolean), [hasChangesByTab]);

  const { goBack } = useDisableBackNavigation(hasUnsavedChanges, () => {
    if (hasUnsavedChanges) {
      setIsUnsavedChangesModalVisible(true);
    } else {
      goBack();
    }
  });

  const handleAccountHasChanges = useCallback((value: boolean) => {
    setHasChangesByTab((prev) => (prev[0] === value ? prev : [value, prev[1]]));
  }, []);

  const handleCardHasChanges = useCallback((value: boolean) => {
    setHasChangesByTab((prev) => (prev[1] === value ? prev : [prev[0], value]));
  }, []);

  const limitAuthority = storeData?.permissionsByChild[child.id];
  const tabs = limitAuthority?.tabs || [];

  const accountTab = tabs.find((tab) => tab.tabId === 'ACCOUNT_PERMISSIONS');
  const cardTab = tabs.find((tab) => tab.tabId === 'CARD_PERMISSIONS');

  const tabItems: TabsItem[] = [
    {
      tabId: 'account-permissions',
      title: accountTab?.tabTitle ?? 'Hesap Yetkileri',
      content: (
        <AccountPermissions
          childId={child.id}
          onHasChangesChange={handleAccountHasChanges}
          onSaved={goBack}
          ref={accountPermissionsRef}
          tab={accountTab}
        />
      ),
    },
    {
      tabId: 'card-permissions',
      title: cardTab?.tabTitle ?? 'Kart Yetkileri',
      content: (
        <CardPermissions
          childId={child.id}
          onHasChangesChange={handleCardHasChanges}
          onSaved={goBack}
          ref={cardPermissionsRef}
          tab={cardTab}
        />
      ),
    },
  ];

  const activePermissionsRef = activeIndex === 0 ? accountPermissionsRef : cardPermissionsRef;

  const handleLeaveWithoutSaving = () => {
    setIsUnsavedChangesModalVisible(false);
    goBack();
  };

  return (
    <Screen isScreenLoading={isLoading}>
      {tabs.length > 0 ? (
        <Tabs
          footer={
            <Button
              disabled={!hasChangesByTab[activeIndex]}
              onPress={() => activePermissionsRef.current?.requestSave()}
              text="Kaydet"
            />
          }
          items={tabItems}
          onIndexChange={setActiveIndex}
        />
      ) : (
        <InfoCard
          description="Bu çocuk için limit ve yetki işlemi bulunmuyor."
          icon={<EmptyIcon height={normalizeSize(128)} width={normalizeSize(187)} />}
          text="İşlem Bulunamadı"
        />
      )}
      <InfoModal
        description="Kaydedilmemiş değişiklikleriniz var. Devam ederseniz değişiklikleriniz kaybolacak."
        onClose={() => setIsUnsavedChangesModalVisible(false)}
        primaryButton={{ text: 'Devam Et', onPress: handleLeaveWithoutSaving }}
        secondaryButton={{
          text: 'Vazgeç',
          onPress: () => setIsUnsavedChangesModalVisible(false),
        }}
        title="Kaydedilmemiş Değişiklikler"
        visible={isUnsavedChangesModalVisible}
      />
    </Screen>
  );
};

export default KliqFamilyLimitAuthorityScreen;
