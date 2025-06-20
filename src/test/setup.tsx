import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    set: vi.fn(),
    to: vi.fn(),
    timeline: vi.fn(() => ({
      add: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
  },
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    props: Record<string, unknown>;
  }) => <img src={src} alt={alt} {...props} />,
}));
