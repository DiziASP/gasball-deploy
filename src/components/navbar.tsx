'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brand } from './brand';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AuthContext } from './AuthProvider';
import { useRouter } from 'next/navigation';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Outdoor Field',
    href: '/field',
    description: 'Cocok buat kalian yang suka hujan-hujan'
  },
  {
    title: 'Indoor Field',
    href: '/field',
    description: 'Cocok untuk private playing dengan teman-teman'
  }
];

const getInitial = (name: string) => {
  const n_slice = name.split(' ');
  return n_slice[0][0] + n_slice[n_slice.length - 1][0];
};

export function Navigation() {
  const user = React.useContext(AuthContext)?.user;
  const { push } = useRouter();

  return (
    <nav className="flex flex-row justify-between items-center shadow-md py-3 px-12 bg-background">
      {/* Brand */}
      {user ? (
        <Link href="/" legacyBehavior passHref>
          <p className="font-bold text-3xl cursor-pointer">GasBall</p>
        </Link>
      ) : (
        <p className="font-bold text-3xl cursor-pointer">GasBall</p>
      )}
      <NavigationMenu>
        <NavigationMenuList>
          {/* Field */}
          {user?.role === 'pelanggan' && (
            <NavigationMenuItem>
              <Link href="/field">
                <NavigationMenuTrigger>Field</NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[240px] px-4 py-2">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}

          {/* History */}
          {(user?.role === 'pelanggan' || user?.role === 'penjaga') && (
            <NavigationMenuItem>
              <Link href="/history" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  History
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {/* Dashboard - jangan lupa diubah kalo udah bisa ambil state pengguna */}
          {user?.role === 'admin' && (
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {/* Profile */}
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/assets/images/profile.jpeg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {getInitial(user?.full_name || 'Guest')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.full_name || 'Guest'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && (
                  <DropdownMenuItem
                    onClick={() => {
                      fetch('/api/auth/logout', {
                        method: 'POST'
                      }).then(() => {
                        push('/auth/login');
                        window.location.reload();
                      });
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                )}
                {!user && (
                  <Link href="auth/login">
                    <DropdownMenuItem>Log in</DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
