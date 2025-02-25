'use client'

import Link from "next/link";
import Input from '../ui/input';
import Button from '../ui/button';
import { Moon, Sun, MountainIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [theme, setTheme] = useState('light');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="px-6 lg:px-12 h-16 flex items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        <span className="ml-2 text-2xl font-extrabold text-gray-900 dark:text-gray-100 transition-colors">AISA</span>
      </Link>
      <nav className="ml-auto flex gap-6">
        <Link className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all" href="/test">
          Career Test
        </Link>
        <Link className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all" href="/roadmap">
          Roadmap Generation
        </Link>
        <Button className="rounded-full shadow-lg px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all" onClick={() => setIsLoginModalOpen(true)}>
          Log In
        </Button>
        <Button
          variant="secondary"
          className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-all"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Login or create an account to get started.</p>
            <div className="space-y-4">
              <Input label="Email" type="email" placeholder="m@example.com" required />
              <Input label="Password" type="password" required />
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all">Login</Button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Don't have an account?</p>
              <Button variant="outline" className="w-full rounded-full border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">Register</Button>
            </div>
            <div className="mt-6 text-center">
              <Button variant="secondary" className="rounded-full px-4 py-2" onClick={() => setIsLoginModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
