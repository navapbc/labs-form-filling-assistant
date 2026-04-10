/* eslint-disable import/no-unresolved */
import { expect, test, vi } from 'vitest'

import { BenefitApplicationsLanding } from '../../components/benefit-applications-landing'
import type { VisibilityType } from '@/components/visibility-selector'
import { TooltipProvider } from '@/components/ui/tooltip'
import { render } from 'vitest-browser-react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}))

// Mock hooks
vi.mock('@/hooks/use-model-override', () => ({
    useModelOverride: () => undefined,
}))

const createMockProps = (overrides = {}) => ({
    input: '',
    setInput: vi.fn(),
    isReadonly: false,
    chatId: 'test-chat-id',
    sendMessage: vi.fn(),
    selectedVisibilityType: 'private' as VisibilityType,
    status: 'ready' as const,
    stop: vi.fn(),
    attachments: [],
    setAttachments: vi.fn(),
    messages: [],
    setMessages: vi.fn(),
    session: null,
    ...overrides,
})

test('BenefitApplicationsLanding renders heading', async () => {
    const { getByText } = render(<TooltipProvider><BenefitApplicationsLanding {...createMockProps()} /></TooltipProvider>)

    await expect.element(getByText(/Let\'s start a new application./)).toBeInTheDocument()
})

test('BenefitApplicationsLanding shows login alert when not logged in', async () => {
    const { getByText } = render(<TooltipProvider><BenefitApplicationsLanding {...createMockProps({ session: null })} /></TooltipProvider>)

    await expect.element(getByText('Log in to get started').first()).toBeInTheDocument()
    await expect.element(getByText('Log in').first()).toBeInTheDocument()
})

test('BenefitApplicationsLanding hides login alert when logged in', async () => {
    const session = { user: { id: '1', email: 'test@test.com' }, expires: '' }
    const { getByText } = render(<TooltipProvider><BenefitApplicationsLanding {...createMockProps({ session })} /></TooltipProvider>)

    await expect.element(getByText('Log in to get started')).not.toBeInTheDocument()
})

test('BenefitApplicationsLanding disables inputs when not logged in', async () => {
    const { getByPlaceholder } = render(<TooltipProvider><BenefitApplicationsLanding {...createMockProps({ session: null })} /></TooltipProvider>)

    const clientIdInput = getByPlaceholder('00000')
    await expect.element(clientIdInput).toBeDisabled()
})

test('BenefitApplicationsLanding disables Start auto-filling when fields are empty', async () => {
    const session = { user: { id: '1', email: 'test@test.com' }, expires: '' }
    const { getByText } = render(<TooltipProvider><BenefitApplicationsLanding {...createMockProps({ session })} /></TooltipProvider>)

    const startButton = getByText('Start auto-filling')
    await expect.element(startButton).toBeDisabled()
})

test('BenefitApplicationsLanding shows custom prompt section', async () => {
    const { getByText } = render(<TooltipProvider><BenefitApplicationsLanding {...createMockProps()} /></TooltipProvider>)

    await expect.element(getByText('Or, write your own prompt:')).toBeInTheDocument()
})
