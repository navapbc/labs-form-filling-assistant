'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import type { ChatMessage } from '@/lib/types';
import { useModelOverride } from '@/hooks/use-model-override';

interface SuggestedActionsProps {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({
  chatId,
  sendMessage,
  selectedVisibilityType,
}: SuggestedActionsProps) {
  const modelOverride = useModelOverride();
  const suggestedActions = [
    {
      title: 'Help Jane Doe apply for WIC',
      label: 'ruhealth.org/appointments/apply-4-wic-form',
      action: 'Help Jane Doe (DOB: 03/15/1990, 123 Main St, Riverside CA 92501, jane.doe@email.com) apply for WIC at https://www.ruhealth.org/appointments/apply-4-wic-form#.',
    },
    {
      title: 'Help John Smith apply for IHSS',
      label: 'riversideihss.org/Home/IHSSApply',
      action: 'Help John Smith (DOB: 07/22/1985, 456 Oak Ave, Riverside CA 92502, john.smith@email.com) apply for IHSS at https://riversideihss.org/Home/IHSSApply',
    },
    {
      title: 'Help Maria Garcia apply for IHSS',
      label: 'riversideihss.org/Home/IHSSApply',
      action: 'Help Maria Garcia (DOB: 11/30/1978, 789 Elm Dr, Riverside CA 92503, maria.garcia@email.com) apply for IHSS at https://riversideihss.org/Home/IHSSApply',
    },
    {
      title: 'Help Alex Johnson apply for Benefits Cal',
      label: 'BenefitsCal.com',
      action: 'Help Alex Johnson (DOB: 01/10/1995, 321 Pine Rd, Riverside CA 92504, alex.j@email.com) apply for CalFresh at BenefitsCal.com',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full overflow-hidden"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={`${index > 1 ? 'hidden sm:block' : 'block'} min-w-0`}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              sendMessage(
                { role: 'user', parts: [{ type: 'text', text: suggestedAction.action }] },
                modelOverride,
              );
            }}
            className="text-left border border-sidebar-border rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm gap-1 flex-col w-full h-auto justify-start items-start transition-colors duration-200 bg-[#E8D0E0] hover:bg-[#DCC0D0] hover:text-black dark:bg-[#2D1B2E] dark:hover:bg-[#3D2A3E] whitespace-normal overflow-hidden"
          >
            <span className="font-medium truncate max-w-full">{suggestedAction.title}</span>
            <span className="text-muted-foreground text-xs font-mono truncate max-w-full">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
