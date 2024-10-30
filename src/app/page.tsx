import type { Metadata } from 'next'
import HeroSection from '@/app/components/home/HeroSection'
import Header from '@/app/components/home/Header'

export const metadata: Metadata = {
  title: 'Atlas - Transform Your Documents into Knowledge',
  description: 'Upload, search, and chat with your documents using natural language. Atlas makes your content interactive and accessible.',
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      </main>
    </>
  )
}