/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>BeatBite-Bistro</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex flex-row flex-grow-1 justify-content-between">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <div className="d-flex flex-row justify-content-start gap-3">
              <Link passHref href="/orders">
                <Nav.Link>View Orders</Nav.Link>
              </Link>
              <Link passHref href="/orders/new">
                <Nav.Link>Create an Order</Nav.Link>
              </Link>
              <Link passHref href="/orders/revenue">
                <Nav.Link>Revenue</Nav.Link>
              </Link>
            </div>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
