// components/home/HeroSection.tsx
import React from 'react';
import { Button } from "@/app/components/ui/button";
import Link from 'next/link';
import { ArrowRight, BookOpen, MessageSquare, Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="flex min-h-screen flex-col pt-16"> {/* Added pt-16 for header space */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl leading-normal bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 pb-2">
            Transform Your Documents into Knowledge
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Upload, search, and chat with your documents using natural language. Atlas makes your content interactive and accessible.
          </p>
          </div>

          <div className="space-x-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mt-16">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-2 bg-blue-100 dark:bg-violet-900 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-violet-400" />
              </div>
              <h3 className="font-semibold">Document Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Organize and access your documents in structured groups
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-2 bg-blue-100 dark:bg-violet-900 rounded-full">
                <Search className="h-6 w-6 text-blue-600 dark:text-violet-400" />
              </div>
              <h3 className="font-semibold">Natural Search</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Find exactly what you need using natural language queries
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-2 bg-blue-100 dark:bg-violet-900 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-violet-400" />
              </div>
              <h3 className="font-semibold">Interactive Chat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Chat with your documents using AI-powered conversations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;