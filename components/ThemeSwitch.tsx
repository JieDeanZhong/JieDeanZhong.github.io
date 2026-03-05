'use client'

<div className="flex items-center">
  <button
    aria-label="Theme switcher"
    className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center"
    type="button"
  >
    <Blank />
  </button>
</div>

return (
  <div className="flex items-center">
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        aria-label="Theme switcher"
        className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center"
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </MenuButton>

      <Transition ...>
        <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-white/10">
          <RadioGroup value={resolvedTheme ?? theme} onChange={setTheme}>
            <MenuItem>
              {({ active }) => (
                <Radio
                  className={[
                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                    'flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100',
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
                    'flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100',
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
                    'flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100',
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
