import React, { useEffect, useState } from "react";
import { Store } from "../../data/stores";
import { CloseButton } from "../../components/closeButton/CloseButton";
import { LineChart, Line, XAxis, YAxis, Tooltip, Label } from 'recharts';
import { StockAlert } from "../../data/types";


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p>Date: {new Date(payload[0].payload.date).toLocaleDateString("EN-CA")}</p>
                <p>Revenue: {payload[0].payload.sales}</p>
            </div>
        );
    }

    return null;
}

type StoreSlideoutProps = {
    onClose: () => void;
    store: Store;
    lowStockAlerts: {
        [key: string]: StockAlert[];
    };
    onAlertClick: (alert: StockAlert) => void;
};

export const StoreSlideout: React.FC<StoreSlideoutProps> = ({onClose, store, lowStockAlerts, onAlertClick}) => {
    const [storeData, setStoreData] = useState<any>();

    useEffect(() => {
        fetch(`/api/stores/${store.id}`)
        .then((response) => response.json())
        .then((data) => {
            setStoreData(data.store);
        });
    }, [store.id]);

    return (
        <div className="store-slideout">
        <CloseButton onClick={onClose} />
        <h2>{store.name}</h2>
        {storeData &&
            <>
                <div className="low-stock-cta-container">
                    {lowStockAlerts[store.name] && lowStockAlerts[store.name].map((alert: StockAlert) => {
                    return (
                        <div className="low-stock-cta">
                        <p><b>{alert.model}</b> is running low in stock. Only {alert.inventory} left.</p>
                        <button
                            className="resolve-issue-button"
                            onClick={() => onAlertClick(alert)}>
                            Resolve Issue
                            </button>
                        </div>
                    );
                    })}
                </div>
                <h3>Inventory</h3>
                <table className="inventory-table">
                    <thead>
                    <tr>
                        <th>Model</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {storeData.inventory.map((item: any) => {
                        return (
                            <tr>
                                <td>{item.model}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <h3>Revenue Trends</h3>
                <LineChart width={470} height={300} data={storeData.salesData.tenDays}>
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                    <XAxis
                        reversed={true}
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis padding={{ top: 30 }} tickFormatter={v => `$${v}`} />
                    <Tooltip content={<CustomTooltip />}/>
                </LineChart>
                <h3>Recent Sales</h3>
                <div className="recent-activities">
                    {storeData.recentSales.map((sale: any) => {
                        return (
                        <div className="recent-activity">
                            <div><b>Date:</b> {new Date(sale.date).toLocaleDateString()}</div>
                            <div><b>Model:</b> {sale.model}</div>
                            <div><b>Price:</b> {sale.price}</div>
                            <div><b>Payment Method:</b> {sale.paymentMethod}</div>
                        </div>
                        );
                    })}
                </div>
            </>
        }
        </div>
    );
};
