import type { Preview } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import '../design-system/tokens/index.css'

/** Renders every story inside the app's real mobile frame, using the existing tokens only. */
function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 375,
        margin: '0 auto',
        padding: 'var(--space-page-margin)',
        background: 'var(--color-bg)',
      }}
    >
      {children}
    </div>
  )
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <MobileFrame>
        <Story />
      </MobileFrame>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'paper',
      values: [{ name: 'paper', value: 'var(--color-bg)' }],
    },
  },
}

export default preview
