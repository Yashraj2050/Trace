import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';
import * as React from 'react';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock framer-motion to avoid animation issues in tests
/* eslint-disable @typescript-eslint/no-unused-vars */
vi.mock('framer-motion', async () => {
  const actualFramerMotion = await vi.importActual('framer-motion');
  
  // Custom mock component that renders its children
  const mockComponent = React.forwardRef(({ children, ...props }: Record<string, unknown>, ref: React.ForwardedRef<unknown>) => {
    // Filter out motion props
    const { 
      initial: _i, animate: _a, exit: _e, transition: _t, variants: _v, 
      whileHover: _wh, whileTap: _wt, whileInView: _wiv, viewport: _vp, 
      onAnimationStart: _oas, onAnimationComplete: _oac, layoutId: _li,
      ...validProps 
    } = props;
    
    return React.createElement('div', { ...validProps, ref }, children as React.ReactNode);
  });
  mockComponent.displayName = 'MockMotionComponent';
  
  return {
    ...(actualFramerMotion as object),
    motion: {
      div: mockComponent,
      span: mockComponent,
      p: mockComponent,
      h1: mockComponent,
      h2: mockComponent,
      h3: mockComponent,
      section: mockComponent,
      button: mockComponent,
      a: mockComponent,
      svg: mockComponent,
      path: mockComponent,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});

// Mock Canvas context for testing (needed by some charting libraries/confetti)
// @ts-expect-error - Mocking canvas context for tests
HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn((x, y, w, h) => ({ data: new Array(w * h * 4) })),
    putImageData: vi.fn(),
    createImageData: vi.fn(),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock cobe to prevent requestAnimationFrame infinite loops from hanging vitest coverage
vi.mock('cobe', () => {
  return {
    default: () => ({ destroy: vi.fn() })
  };
});

beforeAll(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] });
});

// Globally mock Supabase client to prevent hanging fetch requests
vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-id' } }, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: {}, error: null }),
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({ data: [], error: null })
          })
        }),
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ data: [], error: null })
        })
      }),
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: {}, error: null })
        })
      })
    })
  })
}));

afterAll(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});
