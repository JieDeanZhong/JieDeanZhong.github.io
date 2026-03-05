'use client'

import { useEffect, useMemo, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'

function IconPlaceholder() {
  return <span className="inline-block h-[18px] w-[18px]" aria-hidden="true" />
}

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const icon = useMemo(() => {
    if (!mounted) return <IconPlaceholder />

    if (resolvedTheme === 'dark') return <Moon size={18} />
    if (resolvedTheme === 'light') return <Sun size={18} />
    return <Monitor size={18} />
  }, [mounted, resolvedTheme])

  // SSR/first client render: render a stable, non-portal button to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Theme switcher"
          className="flex items-center justify-center hover:text-primary-500 dark:hover:text-primary-400"
        >
          {icon}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          aria-label="Theme switcher"
          className="flex items-center justify-center hover:text-primary-500 dark:hover:text-primary-400"
        >
          {icon}
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="z-50 mt-2 w-36 origin-top-right rounded-md bg-white p-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800"
        >
          <MenuItem>
            {({ focus }) => (
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex w-full items-center rounded-md px-2 py-2 ${
                  focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <Sun size={16} />
                <span className="ml-2">Light</span>
              </button>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex w-full items-center rounded-md px-2 py-2 ${
                  focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <Moon size={16} />
                <span className="ml-2">Dark</span>
              </button>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`flex w-full items-center rounded-md px-2 py-2 ${
                  focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <Monitor size={16} />
                <span className="ml-2">System</span>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
