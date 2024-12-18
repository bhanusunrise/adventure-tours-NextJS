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

    const targetElement = document.getElementById(href.slice(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeSectionId = entry.target.id;
          setNavigation((prevNavigation) =>
            prevNavigation.map((item) => (item.href === `#${activeSectionId}` ? { ...item, current: true } : { ...item, current: false }))
          );
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navigation.forEach((item) => {
      const sectionElement = document.getElementById(item.href.slice(1));
      if (sectionElement) observer.observe(sectionElement);
    });

    return () => observer.disconnect();
  }, [navigation]);

  const getNavbarBgClass = () => {
    const currentSection = navigation.find((item) => item.current);

    if (currentSection?.name === 'Home') {
      return 'bg-transparent'; // Transparent background for Home
    }
    if (
      ['Who are we?', 'Take a Ride', 'Reach Out Us'].includes(currentSection?.name || '')
    ) {
      return 'bg-gray-800/90'; // Semi-transparent dark background for other sections
    }
    return 'bg-gray-900'; // Default dark background
  };

  return (
    <Disclosure
      as="nav"
      className={classNames(
        'navbar-custom', 
        getNavbarBgClass(), 
        'text-gray-200 hover:bg-gray-900', 
        'transition-all duration-500 ease-in-out' // Adding transition for smooth background color change
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-20 pt-1 pb-1"> {/* Reduced padding for smaller devices (px-4 and px-6 for sm and lg respectively) */}
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex items-center">
            <img alt="Your Company" src="./logo.png" className="h-14 w-auto" />
          </div>
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
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
                    ? 'bg-gray-400 text-white'
                    : 'text-gray-100 hover:bg-gray-800 hover:text-white',
                  'rounded-md px-3 py-2 text-lg font-medium'
                )}
              >
                {item.name}
              </a>
            ))}
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
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white',
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
