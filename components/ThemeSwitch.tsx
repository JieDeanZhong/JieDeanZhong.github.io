'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Radio, RadioGroup, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'

type ThemeChoice = 'light' | 'dark' | 'system'

function Blank() {
  return <span className="inline-block h-[18px] w-[18px]" aria-hidden="true" />
}

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ✅ SSR/首屏 hydration：不渲染 HeadlessUI portal/transition
  if (!mounted) {
    return (
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Theme switcher"
          className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center"
        >
          <Blank />
        </button>
      </div>
    )
  }

  // ✅ 收敛 theme，避免 TS 严格模式：string | undefined → union
  const currentChoice: ThemeChoice = useMemo(() => {
    const t = theme ?? 'system'
    return t === 'light' || t === 'dark' || t === 'system' ? t : 'system'
  }, [theme])

  const isDark = (resolvedTheme ?? 'light') === 'dark'

  const handleChange = (value: ThemeChoice) => {
    setTheme(value)
  }

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
          <MenuButton aria-label="Theme switcher">{isDark ? <Moon size={18} /> : <Sun size={18} />}</MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-hidden dark:bg-gray-800">
            <RadioGroup value={currentChoice} onChange={handleChange}>
              <div className="p-1">
                <Radio value="light">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        type="button"
                        className={`${
                          focus ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <span className="mr-2">
                          <Sun size={18} />
                        </span>
                        Light
                      </button>
                    )}
                  </MenuItem>
                </Radio>

                <Radio value="dark">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        type="button"
                        className={`${
                          focus ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <span className="mr-2">
                          <Moon size={18} />
                        </span>
                        Dark
                      </button>
                    )}
                  </MenuItem>
                </Radio>

                <Radio value="system">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        type="button"
                        className={`${
                          focus ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <span className="mr-2">
                          <Monitor size={18} />
                        </span>
                        System
                      </button>
                    )}
                  </MenuItem>
                </Radio>
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
