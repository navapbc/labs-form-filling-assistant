import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { UserActionConfirmation } from '@/components/ai-elements/user-action-confirmation';

test('UserActionConfirmation renders with proper content in approval-requested state', async () => {
  const mockOnApprove = vi.fn();
  const { getByText } = render(
    <UserActionConfirmation
      approval={{ id: 'test-1', approved: undefined }}
      state="approval-requested"
      requestMessage="Complete the CAPTCHA and submit the application."
      onApprove={mockOnApprove}
    />
  );

  await expect.element(getByText('Action required')).toBeInTheDocument();
  await expect.element(getByText('Complete the CAPTCHA and submit the application.')).toBeInTheDocument();
  await expect.element(getByText('Take control')).toBeInTheDocument();
});

test('UserActionConfirmation calls onApprove when Take control button is clicked', async () => {
  const mockOnApprove = vi.fn();
  const { getByRole } = render(
    <UserActionConfirmation
      approval={{ id: 'test-2', approved: undefined }}
      state="approval-requested"
      requestMessage="Complete the CAPTCHA and submit the application."
      onApprove={mockOnApprove}
    />
  );

  const approveButton = getByRole('button', { name: /take control/i });
  await approveButton.click();

  expect(mockOnApprove).toHaveBeenCalledTimes(1);
  expect(mockOnApprove).toHaveBeenCalledWith('test-2');
});

test('UserActionConfirmation supports custom messages', async () => {
  const mockOnApprove = vi.fn();
  const { getByText } = render(
    <UserActionConfirmation
      approval={{ id: 'test-4', approved: undefined }}
      state="approval-requested"
      requestTitle="Custom Title"
      requestMessage="Custom action required message."
      onApprove={mockOnApprove}
    />
  );

  await expect.element(getByText('Custom Title')).toBeInTheDocument();
  await expect.element(getByText('Custom action required message.')).toBeInTheDocument();
});
