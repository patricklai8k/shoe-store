import React, { useEffect, useState } from 'react';
import { Modal } from '../../components/modal/Modal';
import { StockAlert, StockData } from '../../data/types';
import { CloseButton } from '../../components/closeButton/CloseButton';

type LowStockSlideoutProps = {
    onClose: () => void;
    currentAlert: StockAlert;
    onAlertResolve: (alert: StockAlert) => void;
};

export const LowStockSlideout: React.FC<LowStockSlideoutProps> = ({onClose, currentAlert, onAlertResolve}) => {
    const [resolutionModalOpen, setResolutionModalOpen] = useState(false);
    const [transferStore, setTransferStore] = useState<string>();
    const [stockData, setStockData] = useState<StockData[]>();

    useEffect(() => {
        fetch(`/api/model-inventory/${currentAlert.store}`)
            .then((response) => response.json())
            .then((data) => {
                setStockData(data.inventory);
            });
    }, [currentAlert.store]);

    useEffect(() => {
        if (!resolutionModalOpen) return;
        const element = document.getElementById('test');
        element && element.scrollIntoView({block: "end", behavior: "smooth"});
     }, [resolutionModalOpen]);

    return (
        <div className="low-stock-slideout" style={{overflow: resolutionModalOpen ? "hidden" : "auto"}}>
            <div id="test"></div>
            <CloseButton onClick={onClose} />
            <h2>Low Stock at {currentAlert.store}</h2>
            <p>{currentAlert.model} is running low in stock. Only {currentAlert.inventory} left.</p>
            {stockData &&
                <>
                    <h3>Stock of {currentAlert.model} in nearby stores</h3>
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Store</th>
                                <th>Inventory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((item: any) => {
                                return (
                                    <tr>
                                        <td>{item.store}</td>
                                        <td>{item.inventory}</td>
                                    <td>
                                        <button
                                            className="request-stock-button"
                                            onClick={() => {
                                                setTransferStore(item.store);
                                                setResolutionModalOpen(true);
                                            }}>
                                            Transfer Stock
                                        </button>
                                    </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            }
            {resolutionModalOpen &&
                <Modal onClose={() => setResolutionModalOpen(false)}>
                    <h2>Stock Transfer Request</h2>
                    <p>Transfering from {transferStore}</p>
                    <div>
                        <label className="stock-transfer-label" htmlFor="quantity">Transefer Quantity</label>
                        <input defaultValue={10} min={10} name="quantity" type="number" />
                    </div>
                    <div className="stock-transfer-cta">
                        <button 
                            className="request-stock-button" 
                            onClick={() => {
                                setResolutionModalOpen(false);
                                onAlertResolve(currentAlert);
                            }}>
                            Confirm and Resolve Issue
                        </button>
                        <button className="request-stock-button" onClick={() => setResolutionModalOpen(false)}>Cancel</button>
                    </div>
                </Modal>
            }
        </div>
    );
};
