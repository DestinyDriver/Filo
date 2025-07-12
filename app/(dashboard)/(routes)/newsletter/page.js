'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NewsletterPage() {
  return (
    <main className="m-auto bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl p-8 rounded-2xl bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 shadow-2xl"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
            className="flex justify-center"
          >
            <div className="p-4 bg-green-500/20 rounded-full">
              <Mail className="h-10 w-10 text-green-500 animate-pulse" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight">
            Stay <span className="text-green-500">Connected</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Subscribe to our newsletter to receive the latest updates, product announcements, and exclusive content straight to your inbox.
          </p>

          <form className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
              required
            />
            <Button type="submit" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-neutral-100 dark:text-neutral-900 font-semibold px-6 py-3 rounded-xl transition">
              Subscribe
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </motion.div>
    </main>
  )
}
