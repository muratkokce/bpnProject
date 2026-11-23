import type React from 'react';
import { useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { useFamilyLimitAuthorityStore } from '@/core/store';
import type { Permission, Tab } from '@/features/family/types/limitAuthority.types';
import { showToast, ToastType } from '@/shared/utils';

export interface PermissionsBaseHandle {
  requestSave: () => void;
}

interface UsePermissionsBaseParams {
  tab?: Tab;
  childId?: string;
  onHasChangesChange?: (hasChanges: boolean) => void;
  onSaved?: () => void;
  ref?: React.Ref<PermissionsBaseHandle>;
}

export const usePermissionsBase = ({
  tab,
  childId,
  onHasChangesChange,
  onSaved,
  ref,
}: UsePermissionsBaseParams) => {
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

  const permissions = tab?.permissions ?? [];

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

  const collectWithDependencies = (permissionId: string): string[] => {
    const visited = new Set<string>();
    const stack = [permissionId];

    while (stack.length > 0) {
      const id = stack.pop() as string;
      if (visited.has(id)) continue;
      visited.add(id);

      const dependsOn = permissions.find((perm) => perm.id === id)?.dependsOn;
      if (dependsOn && permissions.some((perm) => perm.id === dependsOn)) {
        stack.push(dependsOn);
      }
    }

    return [...visited];
  };

  const collectWithDependents = (permissionId: string): string[] => {
    const visited = new Set<string>([permissionId]);
    let changed = true;

    while (changed) {
      changed = false;
      permissions.forEach((perm) => {
        if (perm.dependsOn && visited.has(perm.dependsOn) && !visited.has(perm.id)) {
          visited.add(perm.id);
          changed = true;
        }
      });
    }

    return [...visited];
  };

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
      const updated = { ...prev };

      const affectedIds = value
        ? collectWithDependencies(permissionId)
        : collectWithDependents(permissionId);
      affectedIds.forEach((id) => {
        updated[id] = value;
      });

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
    if (!tab || !childId) return;

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

  return {
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
  };
};
