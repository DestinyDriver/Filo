'use client'
import { UserButton } from '@clerk/nextjs'

import { useUser } from '@clerk/nextjs'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Avatar className="h-8 w-8 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <AvatarFallback className="rounded-lg"></AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <div className='flex gap-2 select-none'>
              <Avatar className="h-8 w-8 rounded-lg">
                <UserButton  afterSignOutUrl='/' />
                <AvatarFallback className="rounded-lg">
                  {user?"":"U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.fullName || 'Guest'}
                </span>
                <span className="truncate text-xs">
                  {user?.primaryEmailAddress?.emailAddress || 'No email'}
                </span>
              </div>
            </div>
  )
}
