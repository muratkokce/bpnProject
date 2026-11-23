import React, { useMemo, useState } from 'react';

import { FlatList } from 'react-native';

import { useTheme } from '@/assets/theme';
import { useFamilyLimitAuthorityStore } from '@/core/store';
import type { Tab } from '@/features/family/types/limitAuthority.types';
import { Button } from '@/shared/components/button';
import { Text } from '@/shared/components/text';
import { Toggle } from '@/shared/components/toggle';

import {
  ContentColumn,
  MasterToggleRow,
  PermissionItemContainer,
  PermissionRow,
  PermissionsContainer,
  PermissionsContentContainer,
  SaveButtonContainer,
} from '../styles';

interface PermissionsBaseProps {
  tab?: Tab;
  childId?: string;
}

export const PermissionsBase: React.FC<PermissionsBaseProps> = ({ tab, childId }) => {
  const { colors, normalizeSize } = useTheme();
  const { updateTabPermissions } = useFamilyLimitAuthorityStore();
  const [masterEnabled, setMasterEnabled] = useState(tab?.masterToggle.isEnabled ?? false);
  const [permissionsState, setPermissionsState] = useState(
    tab?.permissions.reduce((acc, perm) => {
      acc[perm.id] = perm.isEnabled;
      return acc;
    }, {} as Record<string, boolean>) ?? {}
  );

  const hasChanges = useMemo(() => {
    if (!tab) return false;

    const masterChanged = masterEnabled !== tab.masterToggle.isEnabled;
    const permissionsChanged = Object.entries(permissionsState).some(
      ([permId, isEnabled]) => isEnabled !== tab.permissions.find((p) => p.id === permId)?.isEnabled
    );

    return masterChanged || permissionsChanged;
  }, [masterEnabled, permissionsState, tab]);

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

  const handlePermissionChange = (permissionId: string, value: boolean) => {
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

  const handleSave = () => {
    updateTabPermissions(childId, tab.tabId, masterEnabled, permissionsState);
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
                  onValueChange={(value) => handlePermissionChange(item.id, value)}
                  value={permissionsState[item.id] ?? false}
                />
              </PermissionRow>
            </PermissionItemContainer>
          )}
          scrollEnabled={false}
        />
      </PermissionsContentContainer>
      <SaveButtonContainer>
        <Button disabled={!hasChanges} onPress={handleSave} text="Kaydet" />
      </SaveButtonContainer>
    </PermissionsContainer>
  );
};
