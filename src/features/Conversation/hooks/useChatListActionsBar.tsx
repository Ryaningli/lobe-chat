import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { Copy, Download, Edit, ListRestart, RotateCcw, Split, Trash } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { isDeprecatedEdition } from '@/const/version';

interface ChatListActionsBar {
  branching: ActionIconGroupItems;
  copy: ActionIconGroupItems;
  del: ActionIconGroupItems;
  delAndRegenerate: ActionIconGroupItems;
  divider: { type: 'divider' };
  edit: ActionIconGroupItems;
  exportTable: ActionIconGroupItems;
  regenerate: ActionIconGroupItems;
}

export const useChatListActionsBar = ({
  hasThread,
}: { hasThread?: boolean } = {}): ChatListActionsBar => {
  const { t } = useTranslation('common');

  return useMemo(
    () => ({
      branching: {
        disable: isDeprecatedEdition,
        icon: Split,
        key: 'branching',
        label: !isDeprecatedEdition
          ? t('branching', { defaultValue: 'Create Sub Topic' })
          : t('branchingDisable'),
      },
      copy: {
        icon: Copy,
        key: 'copy',
        label: t('copy', { defaultValue: 'Copy' }),
      },
      del: {
        danger: true,
        disable: hasThread,
        icon: Trash,
        key: 'del',
        label: hasThread ? t('messageAction.deleteDisabledByThreads', { ns: 'chat' }) : t('delete'),
      },
      delAndRegenerate: {
        disable: hasThread,
        icon: ListRestart,
        key: 'delAndRegenerate',
        label: t('messageAction.delAndRegenerate', {
          defaultValue: 'Delete and regenerate',
          ns: 'chat',
        }),
      },
      divider: {
        type: 'divider',
      },
      edit: {
        icon: Edit,
        key: 'edit',
        label: t('edit', { defaultValue: 'Edit' }),
      },
      exportTable: {
        icon: Download,
        key: 'exportTable',
        label: '导出表格',
      },
      regenerate: {
        icon: RotateCcw,
        key: 'regenerate',
        label: t('regenerate', { defaultValue: 'Regenerate' }),
      },
    }),
    [hasThread],
  );
};
