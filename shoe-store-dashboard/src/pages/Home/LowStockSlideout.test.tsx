import { render, screen } from "@testing-library/react";
import { LowStockSlideout } from "./LowStockSlideout";

describe("LowStockSlideout", () => {
    it("renders LowStockSlideout component", () => {
        const handleClose = jest.fn();
        const handleAlertResolve = jest.fn();

        const currentAlert = {
            store: "test store name",
            model: "test model",
            inventory: 5
        }

        render(< LowStockSlideout
            onClose={handleClose}
            currentAlert={currentAlert}
            onAlertResolve={handleAlertResolve}
        />);

        const headerElement = screen.getByText("Low Stock at test store name");
        expect(headerElement).toBeVisible();

        const lowStockElement = screen.getByText("test model is running low in stock. Only 5 left.");
        expect(lowStockElement).toBeVisible();
    });
});