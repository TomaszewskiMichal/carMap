import { Component } from 'react';
import { ErrorText } from './ErrorText';

class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) return <ErrorText />;

    return this.props.children;
  }
}
export default ErrorBoundary;
