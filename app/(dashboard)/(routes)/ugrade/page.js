'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function UpgradePage() {
  return (
    <main className="m-auto bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl p-8 rounded-2xl bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 shadow-2xl"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
            className="flex justify-center"
          >
            <div className="p-4 bg-green-500/20 rounded-full">
              <Sparkles className="h-10 w-10 text-green-500 animate-pulse" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight">
            Unlock <span className="text-green-500">Premium Features</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Supercharge your file-sharing experience with faster uploads, larger storage, and premium support. Built for teams & creators.
          </p>

          <ul className="text-left mt-6 space-y-3">
            {['Unlimited uploads', 'Priority access', 'Team collaboration', 'Encrypted sharing'].map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
                className="flex items-center gap-3 text-neutral-900 dark:text-neutral-100"
              >
                <CheckCircle className="text-green-500 w-5 h-5" />
                {feature}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-neutral-100 dark:text-neutral-900 font-semibold px-6 py-3 rounded-xl transition"
            >
              Upgrade Now
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
