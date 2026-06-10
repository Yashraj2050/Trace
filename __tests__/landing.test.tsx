import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LandingPage from '../app/page';

vi.mock('../components/landing/loading-screen', () => ({ LoadingScreen: () => <div data-testid="loading" /> }));
vi.mock('../components/landing/hero-section', () => ({ HeroSection: () => <div data-testid="hero" /> }));
vi.mock('../components/landing/proof-section', () => ({ ProofSection: () => <div /> }));
vi.mock('../components/landing/product-showcase', () => ({ ProductShowcase: () => <div /> }));
vi.mock('../components/landing/intelligence-section', () => ({ IntelligenceSection: () => <div /> }));
vi.mock('../components/landing/upload-section', () => ({ UploadSection: () => <div /> }));
vi.mock('../components/landing/cta-section', () => ({ CtaSection: () => <div /> }));
vi.mock('../components/landing/landing-nav', () => ({ LandingNav: () => <div /> }));

describe('Landing Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<LandingPage />);
    expect(container).toBeTruthy();
  });
});
