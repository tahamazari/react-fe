import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const defaultItems = [
    {
        label: "Taha",
        value: "Mazari",
        onClick: () => {}
    },
    {
        label: "Byte",
        value: "Genie",
        onClick: () => {}
    },
]

export default function Dropdown({ selectedItem = "", items = defaultItems, onSelect = () => {} }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedItem ? selectedItem : "Options" }
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div class="py-1">
        {
            items.map((item) => {
                return(
                <MenuItem>
                    <div
                      onClick={() => onSelect(item)}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      { item.label }
                    </div>
                  </MenuItem>
                )
            })
        }
        </div>
      </MenuItems>
    </Menu>
  )
}
