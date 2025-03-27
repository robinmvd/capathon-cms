import React from "react";
import {render, screen, act} from "@testing-library/react";
import Countdown from "../src/app/ui/countdown";
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe("Countdown component", () => {
    test("renders countdown with initial valuea", () => {
        render(<Countdown />);

        expect(screen.getByText(/days/i)).toBeInTheDocument();
        expect(screen.getByText(/hours/i)).toBeInTheDocument();
        expect(screen.getByText(/minutes/i)).toBeInTheDocument();
        expect(screen.getByText(/seconds/i)).toBeInTheDocument();
    })

    test("updates countdown over time", () => {
        render(<Countdown />);

        const secondsElement = screen.getByText("seconds").previousSibling;
        const initialSeconds = Number(secondsElement.textContent);

        act(() => {
            jest.advanceTimersByTime(2000);
        })

        const updatedSeconds = Number(secondsElement.textContent);

        expect(updatedSeconds).toBeLessThan(initialSeconds);
    })

    test("does not count below zero", () => {
        render(<Countdown />);

        act(() => {
            jest.advanceTimersByTime(1000 * 60 * 60 * 24 * 365);
        })

        const timeLeftElements = screen.getAllByText(/\d+/);

        timeLeftElements.forEach(element => {
            const timeLeft = element.textContent;
            expect(Number(timeLeft)).toBeGreaterThanOrEqual(0);
        });
    })

    test("clears interval when onmounting", () => {
        const clearIntervalMock = jest.spyOn(global, 'clearInterval');

        const {unmount} = render(<Countdown />);

        unmount();

        expect(clearIntervalMock).toHaveBeenCalled();

        clearIntervalMock.mockRestore();
    })

    

});