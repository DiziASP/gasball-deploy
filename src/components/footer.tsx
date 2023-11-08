'use client';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { cn } from '@/lib/utils';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'About Gasball',
    href: '/',
    description: 'Cocok buat kalian yang suka hujan-hujan'
  },
  {
    title: 'Behind Gasball',
    href: '/',
    description: 'Cocok buat kalian yang suka hujan-hujan'
  },
  {
    title: 'Privacy Policy',
    href: '/field',
    description: 'Cocok untuk private playing dengan teman-teman'
  }
];

const contact: { title: string; number: string }[] = [
  {
    title: 'Naura',
    number: '+62-812-345-6789'
  },
  {
    title: 'Ojan',
    number: '+62-812-345-6789'
  },
  {
    title: 'Abil',
    number: '+62-812-345-6789'
  },
  {
    title: 'Dizi',
    number: '+62-812-345-6789'
  }
];

const social: { media: string; href: string }[] = [
  {
    media: 'Instagram',
    href: 'https://www.instagram.com/nauravld/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=='
  },
  {
    media: 'Linkedin',
    href: 'https://www.linkedin.com/in/naura-valda-prameswari-13577a1b0/'
  },
  {
    media: 'Twitter',
    href: 'https://twitter.com/hero0brine'
  },
  {
    media: 'Youtube',
    href: 'https://www.youtube.com/@nauravaldaprameswari2922'
  }
];

export const Footer = () => {
  return (
    <div className="mt-auto bg-background">
      <div className="flex flex-col pt-12 pb-6 container">
        <div className="flex flex-row justify-evenly">
          <div className="space-y-2 max-w-[15rem]">
            <h3>GasBall</h3>
            <p className="text-muted-foreground">
              Aplikasi Manajemen Lapangan Futsal
            </p>
          </div>
          <div className="space-y-1 max-w-[10rem]">
            <h3 className="text-sm font-medium leading-none mb-2">
              Learn More
            </h3>
            <ul className="flex flex-col list-none">
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
          </div>
          <div className="space-y-1 max-w-xs">
            <h3 className="text-sm font-medium leading-none mb-2">
              Contact us
            </h3>
            <ul className="flex flex-col list-none">
              {contact.map((component) => (
                <ContactList key={component.title} title={component.title}>
                  {component.number}
                </ContactList>
              ))}
            </ul>
          </div>

          <div className="space-y-1 max-w-xs">
            <h3 className="text-sm font-medium leading-none mb-2">
              Social Media
            </h3>
            <ul className="flex flex-row list-none space-x-3">
              {social.map((component) => (
                <SocialMedia
                  key={component.media}
                  media={component.media}
                  href={component.href}
                />
              ))}
            </ul>
          </div>
        </div>
        <Separator orientation="horizontal" className="my-4" />
        <div className="flex justify-center space-x-4 text-sm">
          <p>© {new Date().getFullYear()} GasBall | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className="text-sm leading-none">{title}</div>
      </a>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const ContactList = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 py-2 rounded-md leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:bg-accent',
          className
        )}
        {...props}
      >
        <div className="text-sm leading-none">
          {title}: <span className="font-semibold text-sm">{children}</span>
        </div>
      </a>
    </li>
  );
});
ContactList.displayName = 'ContactList';

const SocialMedia = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, media, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-full leading-none no-underline outline-none transition-colors scale-90 hover:scale-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        {media == 'Instagram' && <Instagram className="w-6 h-6" />}
        {media == 'Linkedin' && <Linkedin className="w-6 h-6" />}
        {media == 'Twitter' && <Twitter className="w-6 h-6" />}
        {media == 'Youtube' && <Youtube className="w-6 h-6" />}
      </a>
    </li>
  );
});
SocialMedia.displayName = 'SocialMedia';
