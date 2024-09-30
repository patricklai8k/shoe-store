import React from "react";

import { render, screen } from "@testing-library/react";
import { StoreSlideout } from "./StoreSlideout";

describe("StoreSlideout", () => {
    it("renders StoreSlideout component", () => {
        const handleClose = jest.fn();
        const handleAlertClick = jest.fn();

        const store = {
            id: "1",
            name: "test store name",
            address: "test address",
            location: {
                latitude: 0,
                longitude: 0
            }
        };

        const lowStockAlerts = {
            "test store name": [
                {
                    store: "test store name",
                    model: "test model",
                    inventory: 5
                }
            ]
        };

        render(< StoreSlideout
            onClose={handleClose}
            store={store}
            lowStockAlerts={lowStockAlerts}
            onAlertClick={handleAlertClick}
        />);

        const headerElement = screen.getByText("test store name");
        expect(headerElement).toBeVisible();

        const lowStockElement = screen.getByText("is running low in stock. Only 5 left.", { exact: false });
        expect(lowStockElement.textContent).toBe("test model is running low in stock. Only 5 left.");
    });
});