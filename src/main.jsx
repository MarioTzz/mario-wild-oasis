import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Fallback 传入的是组件 */}
    {/* onReset 的作用是刷新页面 并且重置错误边界 根据函数来进行操作 这里的是返回到初始界面 */}
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
