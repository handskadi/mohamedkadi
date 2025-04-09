import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: Props) {
  let messages;
  try {
    messages = require(`../../locales/${locale}/common.json`);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
