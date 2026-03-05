'use client'

import { Fragment, useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition, Radio, RadioGroup } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'

/**
 * A tiny placeholder to keep layout stable before client mount.
 * Must be deterministic across SSR/CSR.
 */
function Blank() {
  return <span className="inline-block h-[18px] w-[18px]" aria-hidden="true" />
}

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render the real UI after the component mounts on the client.
  useEffect(() => {
    setMounted(true)
  }, [])

  // Keep layout stable, but avoid rendering HeadlessUI portal/transition on SSR.
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

  const isDark = (resolvedTheme ?? theme) === 'dark'

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
          <MenuButton aria-label="Theme switcher">
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </MenuButton>
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
            <RadioGroup value={theme} onChange={setTheme}>
              <div className="p-1">
                <Radio value="light">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        type="button"
                        className={`${focus ? 'bg-primary-600 text-white' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2">
                          <Sun size={18} />
                        </div>
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
                        className={`${focus ? 'bg-primary-600 text-white' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2">
                          <Moon size={18} />
                        </div>
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
                        className={`${focus ? 'bg-primary-600 text-white' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2">
                          <Monitor size={18} />
                        </div>
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

export default ThemeSwitch
