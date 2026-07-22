import { FolderOpen, Mail, MessageSquare, Terminal } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NavItem } from '../types/portfolio'

export const navItems: Array<NavItem & { icon: LucideIcon }> = [
  { id: 'about', label: '/about', to: '/about', icon: Terminal },
  { id: 'projects', label: '/projects', to: '/projects', icon: FolderOpen },
  { id: 'feedback', label: '/feedback', to: '/feedback', icon: MessageSquare },
  { id: 'contact', label: '/contact', to: '/contact', icon: Mail },
]
