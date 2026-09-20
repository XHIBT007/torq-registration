import { Button as ButtonPrimitive } from '@base-ui/react/button'
import {
  cva,
  type VariantProps,
} from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'group/button',
    'inline-flex',
    'shrink-0',
    'items-center',
    'justify-center',
    'rounded-lg',
    'border',
    'border-transparent',
    'bg-clip-padding',
    'text-sm',
    'font-semibold',
    'whitespace-nowrap',
    'transition-[background-color,border-color,color,transform,box-shadow]',
    'duration-200',
    'ease-out',
    'outline-none',
    'select-none',
    'focus-visible:border-ring',
    'focus-visible:ring-3',
    'focus-visible:ring-ring/40',
    'active:not-aria-[haspopup]:translate-y-px',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'aria-invalid:border-destructive',
    'aria-invalid:ring-3',
    'aria-invalid:ring-destructive/20',
    'dark:aria-invalid:border-destructive',
    'dark:aria-invalid:ring-destructive/30',
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-red-500',
          'text-white',
          'shadow-[0_6px_20px_rgba(239,68,68,0.16)]',
          'hover:bg-red-400',
          'hover:shadow-[0_8px_24px_rgba(239,68,68,0.22)]',
          'active:bg-red-600',
        ].join(' '),

        outline: [
          'border-white/15',
          'bg-white/[0.04]',
          'text-white',
          'backdrop-blur-sm',
          'hover:border-white/30',
          'hover:bg-white/[0.08]',
        ].join(' '),

        secondary: [
          'bg-white/10',
          'text-white',
          'hover:bg-white/15',
        ].join(' '),

        ghost: [
          'text-white/70',
          'hover:bg-white/[0.07]',
          'hover:text-white',
        ].join(' '),

        destructive: [
          'bg-red-500/10',
          'text-red-400',
          'hover:bg-red-500/20',
          'focus-visible:border-red-500/40',
          'focus-visible:ring-red-500/20',
        ].join(' '),

        link: [
          'h-auto',
          'p-0',
          'text-red-500',
          'underline-offset-4',
          'hover:text-red-400',
          'hover:underline',
        ].join(' '),
      },

      size: {
        default:
          'h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',

        xs:
          'h-7 gap-1 rounded-md px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*="size-"])]:size-3',

        sm:
          'h-9 gap-1.5 rounded-md px-3 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*="size-"])]:size-3.5',

        lg:
          'h-12 gap-2 rounded-lg px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',

        icon:
          'size-10',

        'icon-xs':
          'size-7 rounded-md [&_svg:not([class*="size-"])]:size-3',

        'icon-sm':
          'size-9 rounded-md',

        'icon-lg':
          'size-12 rounded-lg',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  )
}

export {
  Button,
  buttonVariants,
}
