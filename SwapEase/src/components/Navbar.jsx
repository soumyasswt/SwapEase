import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  HomeIcon,
  TagIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserCircleIcon,
  UserPlusIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [profilePic, setProfilePic] = useState('/default-profile.png');
  const [userName, setUserName] = useState('User');
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfilePic(userData.profilePic || '/default-profile.png');
          setUserName(userData.name || 'User');
        }
      }
    };
    fetchProfileData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out!");
    } catch (error) {
      toast.error("Error signing out: " + (error.message || "Please try again."));
    }
  };

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Browse Listings', href: '/listings', icon: TagIcon },
    { name: 'Post an Item', href: '/post', icon: InformationCircleIcon },
    { name: 'My Rentals', href: '/rentals', icon: PhoneIcon },
  ];

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-auto" src="/swapease-logo.png" alt="SwapEase" />
                  <span className="text-2xl font-extrabold text-white ml-2">SwapEase</span>
                </Link>
                <div className="hidden md:flex md:ml-10 space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? 'bg-indigo-700 text-white'
                          : 'text-gray-300 hover:bg-indigo-500 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300'
                      )}
                    >
                      <item.icon className="h-5 w-5 mr-1" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {user ? (
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                        <img className="h-8 w-8 rounded-full" src={profilePic} alt="User profile" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                              )}
                            >
                              <UserCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleSignOut}
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                              )}
                            >
                              <XMarkIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link to="/signin" className="text-gray-300 hover:text-white transition duration-300">Sign in</Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
