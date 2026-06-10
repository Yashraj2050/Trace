import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InsightsPage from '../app/(dashboard)/insights/page';

// Mock the Client Components it renders
vi.mock('@/components/dashboard/insight-card', () => ({
  InsightCard: () => <div data-testid="insight-card" />
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: '123' } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          order: vi.fn().mockResolvedValue({ 
            data: []
          })
        })
      })
    })
  })
}));

describe('Insights Page', () => {
  it('renders without crashing', async () => {
    const Page = await InsightsPage();
    const { container } = render(Page);
    expect(container).toBeTruthy();
  });
});
