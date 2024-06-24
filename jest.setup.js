import '@testing-library/jest-native/extend-expect';

// Mocking native animated module to prevent errors
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mocking Easing module globally
jest.mock('react-native/Libraries/Animated/Easing', () => {
  const actualEasing = jest.requireActual(
    'react-native/Libraries/Animated/Easing',
  );
  return {
    ...actualEasing,
    ease: jest.fn(() => 'ease'),
    bezier: jest.fn(() => (t) => t), // Mock bezier to return a simple linear function
    linear: jest.fn(() => 'linear'),
  };
});
