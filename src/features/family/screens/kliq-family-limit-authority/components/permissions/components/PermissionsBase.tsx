import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { FlatList } from 'react-native';

import { useTheme } from '@/assets/theme';
import { useFamilyLimitAuthorityStore } from '@/core/store';
import type { Permission, Tab } from '@/features/family/types/limitAuthority.types';
import { InfoModal } from '@/shared/components/info-modal';
import { Text } from '@/shared/components/text';
import { Toggle } from '@/shared/components/toggle';
import { showToast, ToastType } from '@/shared/utils';

import {
  ContentColumn,
  MasterToggleRow,
  PermissionItemContainer,
  PermissionRow,
  PermissionsContainer,
  PermissionsContentContainer,
} from '../styles';

export interface PermissionsBaseHandle {
  requestSave: () => void;
}

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
  const { updateTabPermissions } = useFamilyLimitAuthorityStore();
  const notifications = useFamilyLimitAuthorityStore(
    (state) => state.data?.permissionsByChild[childId ?? '']?.notifications
  );
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [masterEnabled, setMasterEnabled] = useState(tab?.masterToggle.isEnabled ?? false);
  const [permissionsState, setPermissionsState] = useState(
    tab?.permissions.reduce((acc, perm) => {
      acc[perm.id] = perm.isEnabled;
      return acc;
    }, {} as Record<string, boolean>) ?? {}
  );

  const [pendingPermission, setPendingPermission] = useState<Permission | null>(null);

  const hasChanges = useMemo(() => {
    if (!tab) return false;

    const masterChanged = masterEnabled !== tab.masterToggle.isEnabled;
    const permissionsChanged = Object.entries(permissionsState).some(
      ([permId, isEnabled]) => isEnabled !== tab.permissions.find((p) => p.id === permId)?.isEnabled
    );

    return masterChanged || permissionsChanged;
  }, [masterEnabled, permissionsState, tab]);

  useImperativeHandle(ref, () => ({ requestSave: () => setIsSaveModalVisible(true) }), []);

  useEffect(() => {
    onHasChangesChange?.(hasChanges);
  }, [hasChanges, onHasChangesChange]);

  if (!tab || !childId) {
    return null;
  }

  const handleMasterToggleChange = (value: boolean) => {
    setMasterEnabled(value);
    if (!value) {
      setPermissionsState((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          updated[key] = false;
        });
        return updated;
      });
    }
  };

  const applyPermissionChange = (permissionId: string, value: boolean) => {
    setPermissionsState((prev) => {
      const updated = { ...prev, [permissionId]: value };

      if (value && !masterEnabled) {
        setMasterEnabled(true);
      }
      if (!value && Object.values(updated).every((perm) => !perm)) {
        setMasterEnabled(false);
      }
      return updated;
    });
  };

  const handlePermissionToggle = (permission: Permission, value: boolean) => {
    if (value && permission.requiresConfirmationOnEnable) {
      setPendingPermission(permission);
      return;
    }
    applyPermissionChange(permission.id, value);
  };

  const handleConfirmPendingPermission = () => {
    if (pendingPermission) {
      applyPermissionChange(pendingPermission.id, true);
    }
    setPendingPermission(null);
  };

  const handleConfirmSave = () => {
    setIsSaveModalVisible(false);
    updateTabPermissions(childId, tab.tabId, masterEnabled, permissionsState);

    const successToast = notifications?.saveSuccessToast;
    if (successToast) {
      showToast({
        title: successToast.title,
        message: successToast.message,
        type: successToast.type.toLowerCase() as ToastType,
      });
    }

    onSaved?.();
  };

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
