// App.test.jsx
import { render, screen } from '@testing-library/react'
import React from "react";
import App from "../src/App";
import { describe, expect } from 'vitest';

describe('App.test.js', () => {
    it('should render login page if user is not log in', () => {
        render(<App/>)

        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/login/i);
    })
})
