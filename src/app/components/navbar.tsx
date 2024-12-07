'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const initialNavigation = [
  { name: 'Home', href: '#home', current: true },
  { name: 'Who are we?', href: '#about', current: false },
  { name: 'Take a Ride', href: '#ride', current: false },
  { name: 'Reach Out Us', href: '#contact', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const [navigation, setNavigation] = useState(initialNavigation);

  const handleNavigationClick = (index: number, href: string) => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item, i) => ({
        ...item,
        current: i === index,
      }))
    );

    const targetElement = document.getElementById(href.slice(1)); // Remove '#' to match the ID
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport as root
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the section is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeSectionId = entry.target.id;
          setNavigation((prevNavigation) =>
            prevNavigation.map((item) => ({
              ...item,
              current: item.href === `#${activeSectionId}`,
            }))
          );
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navigation.forEach((item) => {
      const sectionElement = document.getElementById(item.href.slice(1)); // Remove '#' for the ID
      if (sectionElement) observer.observe(sectionElement);
    });

    return () => observer.disconnect();
  }, [navigation]);

  const getNavbarBgClass = () => {
    if (navigation.find((item) => item.name === 'Home' && item.current)) {
      return 'bg-transparent';
    }
    if (
      navigation.find(
        (item) =>
          ['Who are we?', 'Take a Ride', 'Reach Out Us'].includes(item.name) && item.current
      )
    ) {
      return 'bg-red-500/90'; // Semi-transparent
    }
    return 'bg-red-700'; // Fully opaque
  };

  return (
    <Disclosure
      as="nav"
      className={classNames('navbar-custom', getNavbarBgClass(), 'text-gray-200 hover:bg-red-500')}
    >
      <div className="mx-auto px-20 sm:px-20 lg:px-20 pt-5 pb-5">
        <div className="relative flex h-28 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src="./logo.png" className="h-28 w-auto" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-4 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigationClick(index, item.href);
                    }}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-red-900 text-white'
                        : 'text-gray-100 hover:bg-red-800 hover:text-white',
                      'rounded-md px-3 py-2 text-lg font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item, index) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavigationClick(index, item.href);
              }}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-red-900 text-white'
                  : 'text-gray-300 hover:bg-red-800 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
