# HexFlow - Interactive Onboarding Application

## Description

HexFlow is an interactive web application built with Next.js. It provides an engaging onboarding experience for users with animations and personalized steps. The application collects basic information from users (name and email) and compares their responses with other professionals in the same industry to provide insights into current industry sentiment.

## Demo

Lihat demo aplikasi di: [https://hex-flow-fadildrs-projects.vercel.app/](https://hex-flow-fadildrs-projects.vercel.app/)

## Key Features

- **Interactive User Interface**: Modern design with GSAP and Lottie animations
- **Multi-step Onboarding Flow**: Guided onboarding process with smooth transitions
- **Animated Hexagon Components**: Key visual elements with Lottie animation
- **Animated Text**: Engaging typing and text animation effects
- **Floating Text**: Floating text elements with glass-morphism effects
- **Input Validation**: Email and user name validation
- **Responsive**: Optimized display for various screen sizes
- **State Management**: Application state management with React Hooks and Reducer Pattern

## Technologies Used

- **Frontend Framework**: Next.js 15, React 19
- **Styling**: Tailwind CSS with class-variance-authority and clsx
- **Animation**:
  - GSAP (GreenSock Animation Platform) for complex animations
  - Lottie React for JSON-based animations
- **Smooth Scrolling**: @studio-freight/lenis
- **Testing**:
  - Vitest as test runner
  - React Testing Library for component testing
  - Jest DOM for assertions
- **Others**:
  - TypeScript for type safety
  - ESLint and Prettier for code quality
  - Storybook for component documentation

## Application Structure

### Main Components

#### Step Components

- **WelcomeScreen**: Opening screen with floating text and animated hexagon
- **OnboardingStep**: Component to display onboarding steps (3 different steps)
- **InputStep**: Component to collect user input (name and email)
- **ConfirmationStep**: Confirmation of previously entered information before completing the process

#### UI Components

- **HexagonSvg**: SVG hexagon component with GSAP animation
- **LottieHexagon**: Hexagon component with Lottie animation
- **AnimatedText**: Text component with typing animation effect
- **FloatingText**: Component to display floating text with glass-morphism effect
- **Header**: Header component with navigation buttons
- **LoadingPage**: Loading page when processing data

### State Management

- **useAppState Hook**: Custom hook to manage application state
- **appReducer**: Reducer to handle state changes
- **AppState Interface**: Type definition for application state
- **AppAction Type**: Type definition for actions that can be performed on state

### Application Flow

1. **Welcome Screen**: Users are greeted with animations and floating text
2. **Onboarding Steps**: Users go through 3 onboarding steps explaining the purpose of the application
3. **Input Steps**: Users enter their name and email
4. **Confirmation**: Confirmation of information and preparation for results
5. **Complete**: Display results and insights based on user input

## Getting Started

### Prerequisites

- Node.js (latest version recommended)
- npm or yarn

### Installation

```bash
# Clone repository (if not already done)
git clone https://github.com/fadildr/HexFlow.git
cd HexFlow

# Install dependencies
npm install
```

### Running the Application

```bash
# Development mode with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

- `npm run dev` - Run development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Run the built application
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:run` - Run all tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Run tests in watch mode
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run analyze` - Analyze bundle size
- `npm run storybook` - Run Storybook for component documentation
- `npm run build-storybook` - Build Storybook for deployment

## Development

### Folder Structure

```
src/
├── app/               # Next.js App Router
├── components/        # React Components
│   ├── steps/         # Onboarding step components
│   └── ui/            # Reusable UI components
├── constants/         # Application constants
├── hooks/             # Custom React hooks
├── lib/               # Utilities and helpers
├── reducers/          # State reducers
├── test/              # Testing utilities
└── types/             # TypeScript type definitions
```

### Styling Guide

This application uses Tailwind CSS for styling with a utility-first approach. UI components use a combination of class-variance-authority and clsx to manage component variations.

### Testing

This application uses Vitest and React Testing Library for testing. To run tests:

```bash
# Run all tests
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Credits

Developed with ❤️ by Fadil
