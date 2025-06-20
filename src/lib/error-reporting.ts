export class ErrorReporter {
  static report(error: Error, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'production') {
      // Integrate with Sentry, LogRocket, or similar
      console.error('Error reported:', error, context);
    } else {
      console.error('Development error:', error, context);
    }
  }
}
