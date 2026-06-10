import '@testing-library/jest-dom';
import { vi } from 'vitest';

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
vi.mock('framer-motion', () => {
  const React = require('react');
  const actualFramerMotion = vi.importActual('framer-motion');
  
  // Custom mock component that renders its children
  const mockComponent = React.forwardRef(({ children, ...props }: any, ref: any) => {
    // Filter out motion props
    const { 
      initial, animate, exit, transition, variants, 
      whileHover, whileTap, whileInView, viewport, 
      onAnimationStart, onAnimationComplete, layoutId,
      ...validProps 
    } = props;
    
    return React.createElement('div', { ...validProps, ref }, children);
  });
  
  return {
    ...actualFramerMotion,
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
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
  };
});

// Mock Canvas context for testing (needed by some charting libraries/confetti)
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
  } as any;
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
