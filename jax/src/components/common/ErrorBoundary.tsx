import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('JAX Architecture Error Boundary caught exception:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[420px] p-8 text-center bg-slate-950/80 border border-slate-800 rounded-2xl mx-auto max-w-xl my-12">
          <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 font-mono text-lg">
            !
          </div>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            {this.props.fallbackTitle || 'Component Surface Recovery'}
          </h2>
          <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            The foundation encountered an isolated rendering fault. The shell remains intact and state can be safely restored.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={this.handleReload}
              className="px-5 py-2 text-xs font-medium tracking-wide uppercase text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Restore Viewport
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
