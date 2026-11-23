import React from 'react';

import { FlatList } from 'react-native';

import { useTheme } from '@/assets/theme';
import type { Tab } from '@/features/family/types/limitAuthority.types';
import { InfoModal } from '@/shared/components/info-modal';
import { Text } from '@/shared/components/text';
import { Toggle } from '@/shared/components/toggle';

import {
  ContentColumn,
  MasterToggleRow,
  PermissionItemContainer,
  PermissionRow,
  PermissionsContainer,
  PermissionsContentContainer,
} from '../styles';

import { usePermissionsBase } from './hooks';
import type { PermissionsBaseHandle } from './hooks';

export type { PermissionsBaseHandle } from './hooks';

interface PermissionsBaseProps {
  tab?: Tab;
  childId?: string;
  onHasChangesChange?: (hasChanges: boolean) => void;
  onSaved?: () => void;
  ref?: React.Ref<PermissionsBaseHandle>;
}

export const PermissionsBase: React.FC<PermissionsBaseProps> = ({
  tab,
  childId,
  onHasChangesChange,
  onSaved,
  ref,
}) => {
  const { colors, normalizeSize } = useTheme();
  const {
    notifications,
    isSaveModalVisible,
    setIsSaveModalVisible,
    masterEnabled,
    permissionsState,
    pendingPermission,
    setPendingPermission,
    handleMasterToggleChange,
    handlePermissionToggle,
    handleConfirmPendingPermission,
    handleConfirmSave,
  } = usePermissionsBase({ tab, childId, onHasChangesChange, onSaved, ref });

  if (!tab || !childId) {
    return null;
  }

  return (
    <PermissionsContainer>
      <Text variant="bodyBold">{tab.tabTitle}</Text>
      <PermissionsContentContainer>
        <MasterToggleRow>
          <ContentColumn>
            <Text variant="bodyBold">{tab.masterToggle.title}</Text>
            {tab.masterToggle.description && (
              <Text
                color={colors.text.secondary}
                style={{ marginTop: normalizeSize(4) }}
                variant="captionRegular"
              >
                {tab.masterToggle.description}
              </Text>
            )}
          </ContentColumn>
          <Toggle onValueChange={handleMasterToggleChange} value={masterEnabled} />
        </MasterToggleRow>
        <FlatList
          data={tab.permissions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PermissionItemContainer>
              <PermissionRow>
                <ContentColumn>
                  <Text variant="bodyMedium">{item.title}</Text>
                  {item.description && (
                    <Text
                      color={colors.text.secondary}
                      style={{ marginTop: normalizeSize(4) }}
                      variant="captionRegular"
                    >
                      {item.description}
                    </Text>
                  )}
                </ContentColumn>
                <Toggle
                  onValueChange={(value) => handlePermissionToggle(item, value)}
                  value={permissionsState[item.id] ?? false}
                />
              </PermissionRow>
            </PermissionItemContainer>
          )}
          scrollEnabled={false}
        />
      </PermissionsContentContainer>
      <InfoModal
        description={notifications?.saveConfirmationModal.description ?? ''}
        onClose={() => setIsSaveModalVisible(false)}
        primaryButton={{
          text: notifications?.saveConfirmationModal.confirmButtonText ?? 'Onayla',
          onPress: handleConfirmSave,
        }}
        secondaryButton={{
          text: notifications?.saveConfirmationModal.cancelButtonText ?? 'Vazgeç',
          onPress: () => setIsSaveModalVisible(false),
        }}
        title={notifications?.saveConfirmationModal.title ?? ''}
        visible={isSaveModalVisible}
      />
      <InfoModal
        description={pendingPermission?.confirmationWarning ?? ''}
        onClose={() => setPendingPermission(null)}
        primaryButton={{ text: 'Onayla', onPress: handleConfirmPendingPermission }}
        secondaryButton={{ text: 'Vazgeç', onPress: () => setPendingPermission(null) }}
        title="Yetki Onayı"
        visible={pendingPermission !== null}
      />
    </PermissionsContainer>
  );
};
