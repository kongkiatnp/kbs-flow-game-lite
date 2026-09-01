import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("KBS Flow Game crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="fatal-screen">
          <div className="robot-orb" aria-hidden="true">🤖</div>
          <h1>ภารกิจสะดุดนิดหน่อย</h1>
          <p>KBS-AI ขอซ่อมระบบสักครู่ แล้วลองเปิดเกมใหม่อีกครั้งนะ</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            ลองใหม่
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}
