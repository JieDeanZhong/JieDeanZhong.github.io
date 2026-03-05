'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'

function Blank() {
  return <span aria-hidden="true" className="inline-block h-[18px] w-[18px]" />
}

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = (resolvedTheme ?? theme) === 'dark'

  // SSR/首次 hydration：避免 theme 未解析导致的抖动
  if (!mounted) {
    return (
      <div className="flex items-center">
        <button
          aria-label="Theme switcher"
          className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center"
          type="button"
        >
          <Blank />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          aria-label="Theme switcher"
          className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </MenuButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="bg-white dark:bg-gray-800 ring-black/5 dark:ring-white/10 absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md p-1 shadow-lg ring-1 focus:outline-none">
            <RadioGroup value={resolvedTheme ?? theme} onChange={setTheme}>
              <MenuItem>
                {({ active }) => (
                  <Radio
                    className={[
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      'text-gray-900 dark:text-gray-100 flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm',
                    ].join(' ')}
                    value="light"
                  >
                    <Sun size={16} />
                    Light
                  </Radio>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <Radio
                    className={[
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      'text-gray-900 dark:text-gray-100 flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm',
                    ].join(' ')}
                    value="dark"
                  >
                    <Moon size={16} />
                    Dark
                  </Radio>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <Radio
                    className={[
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      'text-gray-900 dark:text-gray-100 flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm',
                    ].join(' ')}
                    value="system"
                  >
                    <Monitor size={16} />
                    System
                  </Radio>
                )}
              </MenuItem>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
