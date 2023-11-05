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
import Image from 'next/image';

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

export function Navigation() {
  return (
    <nav className="flex flex-row justify-between items-center shadow-md max-h-16 px-12">
      <Link href="/" legacyBehavior passHref>
        <p className="font-bold text-3xl">GasBall</p>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {/* Field */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Field</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[240px] px-4">
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

          {/* History */}
          <NavigationMenuItem>
            <Link href="/history" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                History
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Profile */}
          <NavigationMenuItem>
            <Link href="/profile" legacyBehavior passHref>
              <Image
                src="/assets/images/profile.jpeg"
                alt="profile"
                className="rounded-full ml-4"
                width={40}
                height={40}
              />
            </Link>
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
