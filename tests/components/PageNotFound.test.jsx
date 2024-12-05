import React from "react";
import { render, screen } from "@testing-library/react";
import PageNotFound  from "../../src/components/PageNotFound ";
import { expect } from "vitest";

describe('404 page', () => {
    it('should render a page with an ilustration image and text', () => {
        render(<PageNotFound />)

        const ilustrationImage = screen.getByAltText(/Not Found/i)
        expect(ilustrationImage).toBeInTheDocument();


        const headingText = screen.getByText(/404 Page/i)
        expect(headingText).toBeInTheDocument();

        const subtext = screen.getByText(/There's probably Nothing here/i)
        expect(subtext).toBeInTheDocument();
    })
})