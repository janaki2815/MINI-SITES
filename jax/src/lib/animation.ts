/**
 * Animation Utilities & Physics Kinematics
 * Compositor-friendly smooth transitions and frame-rate independent damping.
 */

export const transitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  },
  destinationSlide: {
    initial: { opacity: 0, y: 14, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.99 },
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
  dockSlide: {
    collapsed: { y: 'calc(100% - 24px)', opacity: 0.85 },
    expanded: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 320, damping: 28 },
  },
};

/**
 * Exponential damping function for smooth camera and mesh movements:
 * current + (target - current) * (1 - Math.exp(-lambda * dt))
 */
export function expDamp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
