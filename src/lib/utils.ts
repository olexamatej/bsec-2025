'use client'

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { useEffect, useState } from 'react'

export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted
}