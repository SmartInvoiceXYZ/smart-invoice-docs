import { Box, Flex, Link, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

import { DocFooter } from './DocFooter';
import { NavBar } from '../layout/NavBar';
import NextLink from 'next/link';


export function DocLayout({ children, metatags, title, docs, active }) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{title}</title>
        {metatags}
        <link rel="icon" href="/logos/smart-invoice/icon-blue.svg" />
      </Head>
      <Script
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-30565BWGW9`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-30565BWGW9');
          `,
        }}
      />

      <NavBar />
      <Flex flexGrow={1} paddingY={10}>
        <VStack align='flex-start' padding={2}>
          {docs.map(doc => (
            <NextLink key={doc.slug} href={`/docs/${doc.slug}`} passHref>
              <Link
                _hover={{ color: 'blue.1', background: 'gray.background' }}
                paddingY={1}
                paddingX={6}
                width='100%'
                color={(active === doc.slug) && 'blue.1'}
                background={(active === doc.slug) && 'gray.background'}
                borderRadius={8}
              >
                {doc.title}
              </Link>
            </NextLink>
          ))}
        </VStack>
        <Box flexGrow={1}>{children}</Box>
      </Flex>
      <DocFooter />
    </Flex>
  );
}