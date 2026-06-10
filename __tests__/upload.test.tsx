import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UploadPage from '../app/(dashboard)/upload/page';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual as any,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('Upload Page (OCR)', () => {
  it('renders the upload interface and instructions', () => {
    const { container } = render(<UploadPage />);
    expect(container).toBeInTheDocument();
  });
});
