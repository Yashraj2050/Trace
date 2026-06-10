import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UploadPage from '../app/(dashboard)/upload/page';

describe('Upload Page (OCR)', () => {
  it('renders the upload interface and instructions', () => {
    const { container } = render(<UploadPage />);
    expect(container).toBeInTheDocument();
  });
});
