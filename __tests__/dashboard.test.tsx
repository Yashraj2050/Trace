import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MissionControl from '../app/(dashboard)/dashboard/page';
import DashboardLoading from '../app/(dashboard)/loading';

describe('Dashboard (Mission Control)', () => {
  it('renders main metrics and headings', () => {
    render(<MissionControl />);
    expect(screen.getByText(/Mission Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Atmospheric Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/OS Sync Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Restored Mass/i)).toBeInTheDocument();
  });

  it('renders empty/action states like the Scanner link', () => {
    render(<MissionControl />);
    expect(screen.getByText(/Initialize_Scanner/i)).toBeInTheDocument();
    expect(screen.getByText(/Action Required/i)).toBeInTheDocument();
  });
});

describe('Dashboard Loading State', () => {
  it('renders skeleton UI', () => {
    render(<DashboardLoading />);
    // Checking for animate-pulse class or skeleton structure
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
