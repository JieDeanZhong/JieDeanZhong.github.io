'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 避免 SSR/CSR 主题不一致导致 hydration 问题
  if (!mounted) {
    return <div className="flex items-center" />;
  }

  const current = (resolvedTheme ?? theme ?? 'system') as 'light' | 'dark' | 'system';

  return (
    <div className="flex items-center">
      <label className="sr-only" htmlFor="theme-switch">
        Theme switcher
      </label>

      <select
        id="theme-switch"
        aria-label="Theme switcher"
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        value={current}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
