"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              We&apos;re sorry, but something unexpected happened.
            </p>
            {this.state.error && (
              <pre className="text-xs bg-muted p-3 rounded mb-4 overflow-auto">
                {this.state.error.message}
              </pre>
            )}
            <Button onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

