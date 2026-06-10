import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CommunityPage from '../app/(dashboard)/community/page';

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: '123' } } })
    },
    from: () => ({
      select: () => ({
        order: () => ({
          limit: vi.fn().mockResolvedValue({ data: [] })
        })
      })
    })
  })
}));

describe('Community Page', () => {
  it('renders the community feed layout', async () => {
    const Page = await CommunityPage();
    await act(async () => {
      render(Page);
    });
    expect(screen.getByText(/Global Net/i)).toBeInTheDocument();
  });
});
