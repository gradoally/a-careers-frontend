"use client";

import React from 'react';
import clsx from 'clsx';
// import {useRouter} from 'next/router';
import { usePathname } from 'next/navigation'
import  {LinkProps as NextLinkProps} from 'next/link';
import {Link as IntlLink} from "@/navigation";
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

import { styled } from '@mui/material/styles';


// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
        Omit<NextLinkProps, 'href' | 'as' | 'onClick' | 'onMouseEnter' | 'onTouchStart'> {
    to:  any;
    linkAs?: NextLinkProps['as'];
    locale?: "en" | "ru"
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
    function NextLinkComposed(props, ref) {
        const {to, linkAs, replace, scroll, shallow, prefetch, locale, ...other} = props;

        return (
            <IntlLink
                href={to}
                prefetch={prefetch}
                as={linkAs}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                passHref
                locale={locale}
                ref={ref}
                {...other}
            />
        );
    },
);

export type LinkProps = {
    activeClassName?: string;
    as?: NextLinkProps['as'];
    href: NextLinkProps['href'];
    linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
    noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
    Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
    const {
        activeClassName = 'active',
        as,
        className: classNameProps,
        href,
        linkAs: linkAsProp,
        locale,
        noLinkStyle,
        prefetch,
        replace,
        role, // Link don't have roles.
        scroll,
        shallow,
        ...other
    } = props;

    const currentPathname = usePathname();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: currentPathname === pathname && activeClassName,
    });

    const isExternal =
        typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

    if (isExternal) {
        if (noLinkStyle) {
            return <Anchor className={className} href={href} ref={ref} {...other} />;
        }

        return <MuiLink className={className} href={href} ref={ref} {...other} />;
    }

    const linkAs = linkAsProp || as;
    const nextJsProps = {to: href, linkAs, replace, scroll, shallow, prefetch, locale};

    if (noLinkStyle) {
        return <NextLinkComposed className={className} ref={ref} {...nextJsProps} {...other} />;
    }

    return (
        <MuiLink
            component={NextLinkComposed}
            className={className}
            underline={'none'}
            ref={ref}
            {...nextJsProps}
            {...other}
        />
    );
});

export default Link;
