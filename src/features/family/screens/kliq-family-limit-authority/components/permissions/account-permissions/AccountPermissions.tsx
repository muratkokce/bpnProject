import type { Tab } from '@/features/family/types/limitAuthority.types';

import { PermissionsBase } from '../components';
import type { PermissionsBaseHandle } from '../components';

interface AccountPermissionsProps {
  tab?: Tab;
  childId?: string;
  onHasChangesChange?: (hasChanges: boolean) => void;
  onSaved?: () => void;
  ref?: React.Ref<PermissionsBaseHandle>;
}

export const AccountPermissions: React.FC<AccountPermissionsProps> = ({
  tab,
  childId,
  onHasChangesChange,
  onSaved,
  ref,
}) => (
  <PermissionsBase
    childId={childId}
    onHasChangesChange={onHasChangesChange}
    onSaved={onSaved}
    ref={ref}
    tab={tab}
  />
);
