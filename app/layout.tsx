'use client';

import './globals.css';
import NavBar from '../components/NavBar';
import { Container } from 'reactstrap';
import Footer from '../components/Footer';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <main id="app" className="d-flex flex-column h-100" data-testid="layout">
            <NavBar />
            <Container className="flex-grow-1 mt-5 mx-auto">{children}</Container>
            <Footer />
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
