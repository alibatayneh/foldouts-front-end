'use  client';

import React, { useState } from 'react';
// import {
//   Collapse,
//   Container,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const customTheme: CustomFlowbiteTheme['navBar'] = {
    "link": {
      "base": "block py-2 pl-3 pr-4 md:p-0",
      "active": {
        "on": "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
        "off": "border-b border-gray-100  text-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
      },
      "disabled": {
        "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        "off": ""
      }
    },
};

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isLoading } = useUser();
    const toggle = () => setIsOpen(!isOpen);
    //   console.log(activeButton);
    const router = useRouter();
    console.log(usePathname());
    const adminLinks = [
        {
            name: "Products",
            path: "/admin/products"
         },
         {
            name: "Create Product",
            path: "/admin/create-product"
         }];
    const userLinks = [
            {
                name: "Wish List",
                path: "/user/wish-list"
             }];

    const handleClick = (active, route) => {
      setActiveButton(active);
      router.push(route);
    };

    const navLinksForCurrentUser = () => {
      switch (currentUserType()) {
          case 'admin':
            return adminLinks;
          case 'user':
            return userLinks;
          default:
            return userLinks;
        }
    };

    const currentUserType = () => {
      const regex = /^\/([^\/]+)/;
      let match = regex.exec(usePathname());
      match = match ? match[1] : null;
      // match is either "admin", "brand-user", "user",
      // or null in case of invalid routes, which we wont render anyway.

      return match;
    };
    const [activeButton, setActiveButton] = useState(navLinksForCurrentUser()[0]['name']);

    return (
        <Navbar fluid={true} rounded={false} className="bg-slate-900" theme={customTheme}>
          <Navbar.Brand href="https://foldouts.store">
            <span className="self-center whitespace-nowrap">
                <img src="/foldouts-logo.png" className="mr-3 h-6 sm:h-9" alt="Foldouts Logo" />
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            {currentUserType() === 'user' && <Button className="mr-10">Get started</Button>}
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <Avatar className="bg-white rounded-full" alt="User settings" img="/profile-circle.png" rounded />
              }
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">{isLoading ? "Loading.." : user.name}</span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                  <Link href="/logout">Sign Out</Link>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
          {navLinksForCurrentUser().map((link, index) => (
            <Navbar.Link
                key={index}
                active={activeButton === link.name ? true : false}
                onClick={() => handleClick(link.name,link.path)}
                >
                {link.name}
            </Navbar.Link>
            ))}
          </Navbar.Collapse>
        </Navbar>
  );
};

export default NavBar;
