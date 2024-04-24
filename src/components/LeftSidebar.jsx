import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { name: 'Dashboard', href: 'https://arxiv.org/pdf/2307.06435.pdf', icon: FolderIcon, current: false },
  { name: 'Team', href: 'https://arxiv.org/pdf/2307.06435.pdf', icon: FolderIcon, current: false },
  { name: 'Projects', href: 'https://arxiv.org/pdf/2307.06435.pdf', icon: FolderIcon, current: false },
  { name: 'Calendar', href: 'https://arxiv.org/pdf/2307.06435.pdf', icon: FolderIcon, current: false },
  { name: 'Documents', href: 'https://arxiv.org/pdf/2307.06435.pdf', icon: FolderIcon, current: false },
  { name: 'Reports', href: 'https://arxiv.org/pdf/2307.06435.pdf', icon: FolderIcon, current: false },
];

export default function LeftSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigationClick = (href) => {
    window.open(href, '_blank');
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1">
              <div className="flex flex-col w-full bg-white">
                <div className="flex items-center h-16 px-4">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-900" aria-hidden="true" />
                  </button>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigationClick(item.href)}
                      className={classNames(
                        item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </button>
                  ))}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-lg font-semibold text-indigo-600">Saved Files</span>
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigationClick(item.href)}
                className={classNames(
                  item.current ? 'bg-gray-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500',
                    'mr-4 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
