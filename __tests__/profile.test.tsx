import { render, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfilePage from '../app/(dashboard)/profile/page';

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: '123', email: 'test@test.com' } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: vi.fn().mockResolvedValue({ 
            data: { 
              full_name: 'Evelyn Reed', 
              sustainability_score: 85,
              streak_days: 12
            } 
          })
        })
      })
    })
  })
}));

describe('Profile Page', () => {
  it('renders without crashing', async () => {
    const Page = await ProfilePage();
    let container: any;
    await act(async () => {
      const result = render(Page);
      container = result.container;
    });
    expect(container).toBeTruthy();
  });
});
