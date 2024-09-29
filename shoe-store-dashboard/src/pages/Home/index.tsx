import Map, { Marker, Popup } from 'react-map-gl';
import marker from '../../assets/aldo-circle-logo.png';
import React, { useEffect, useRef, useState } from 'react';
import { LowStockSlideout } from './LowStockSlideout';
import { StockAlert } from '../../data/types';
import { Store } from '../../data/stores';
import { StoreSlideout } from './StoreSlideout';
import Logo from '../../assets/aldo.png';
import './index.css';

import type { MapRef } from 'react-map-gl';

const MAP_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN;
const LOW_STOCK_THRESHOLD = 10;
const DEFAULT_LATITUDE = 44.5;
const DEFAULT_LONGITUDE = -73;

export const Home: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [popUpData, setPopUpData] = useState<Store>();
    const [showShopSlideout, setShowShopSlideout] = useState(false);
    const [currentStore, setCurrentStore] = useState<Store>();
    const [lowStockAlerts, setLowStockAlerts] = useState<{ [key: string]: StockAlert[] }>({});
    const [showLowStocklideout, setShowLowStockSlideout] = useState(false);
    const [currentAlert, setCurrentAlert] = useState<StockAlert>();

    const ws = useRef<WebSocket>();
    const mapRef = useRef<MapRef | null>(null);

    const updateRecentSales = (message: any) => {
        if (message.inventory < LOW_STOCK_THRESHOLD) {
            setLowStockAlerts((prev: any) => {
                const newAlertState = {...prev};
                if (newAlertState[message.store]) {
                    if(!newAlertState[message.store].some((alert: any) => alert.model === message.model)) {
                        newAlertState[message.store].push(message);
                    }
                } else {
                    newAlertState[message.store] = [message];
                }
                return newAlertState;
            })
        }
    };

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080");
        ws.current.onmessage = e => {
            const message = JSON.parse(e.data);
            updateRecentSales(message);
        };
        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    useEffect(() => {
        fetch('/api/stores')
            .then((response) => response.json())
            .then((data) => {
                const stores = data.stores;
                setStores(stores);
            });
    }, []);

    const zoomMap = (minLongitude: number, minLatitude: number, maxLongitude: number, maxLatitude: number) => {
        if (mapRef.current) {
            mapRef.current.fitBounds(
                [
                    [minLongitude, minLatitude], //-1 -1
                    [maxLongitude, maxLatitude] //+2 +1
                ],
                {padding: 40, duration: 1000}
            );
        }
    };

    const handleStoreSlideoutClose = () => {
        setShowShopSlideout(false);
        setCurrentStore(undefined);
        zoomMap(DEFAULT_LONGITUDE-3, DEFAULT_LATITUDE-3, DEFAULT_LONGITUDE+3, DEFAULT_LATITUDE+3);
    }

    const handleAlertClick = (alert: StockAlert) => {
        setShowLowStockSlideout(true);
        setCurrentAlert(alert);
    }

    const handleAlertResolved = (alert: StockAlert) => {
        setLowStockAlerts((prev: any) => {
            const newAlertState = {...prev};
            newAlertState[alert.store] = newAlertState[alert.store].filter(
                (item: StockAlert) => item.model !== alert.model
            );
            return newAlertState;
        });
        setShowLowStockSlideout(false);
    }

    const StoreList = stores.map((store) => {
        return (
        <li
            className="store-list"
            key={store.id}
            onClick={() => {
                setCurrentStore(store);
                setShowShopSlideout(true);
                zoomMap(store.location.longitude, store.location.latitude - 1, store.location.longitude + 2, store.location.latitude +1 );
            }}
            onMouseEnter={() => {
                setPopUpData(store);
            }}>
            <h2 className="store-list-name">{store.name}</h2>
            <p className="store-address">{store.address}</p>
            {lowStockAlerts[store.name] && lowStockAlerts[store.name].length > 0 &&
                <div className="low-stock-detected">
                    low stock detected
                </div>
            }
        </li>);
    });

    const MapLowStockAlerts = Object.keys(lowStockAlerts).length > 0 && Object.entries(lowStockAlerts).map((entry, idx) => {
        const [key, value] = entry;

        if (value.length === 0) {
            return null;
        }

        let longitude = 0, latitude = 0;

        for (const store of stores) {
            if (store.name === key) {
                longitude = store.location.longitude;
                latitude = store.location.latitude;
            }
        }

        return(<Marker
            className="marker"
            key={idx}
            longitude={longitude}
            latitude={latitude}
            onClick={(e) => {
                e.originalEvent.stopPropagation();
            }}
            offset={[20, -35]}
            anchor="bottom">
            <button
                className="low-stock-alert"
                onClick={()=>{
                    setCurrentStore(stores.find((store) => store.name === key));
                    setShowShopSlideout(true);
                    zoomMap(longitude, latitude - 1, longitude + 2, latitude + 1);
                }}>
                {value.length}
            </button>
        </Marker>)
    })
    
    return (
        <div className="home-container">
            <div className="dashhboard-header">
                <img src={Logo} alt="ALDO Logo" className="logo" />
                <h1>Inventory Management System</h1>
            </div>
            <div className="map-container">
                <ul className="stores-container">
                    {StoreList}
                </ul>
                {showShopSlideout && currentStore &&
                    <StoreSlideout
                        onClose={handleStoreSlideoutClose}
                        store={currentStore}
                        lowStockAlerts={lowStockAlerts}
                        onAlertClick={handleAlertClick}/>
                }
                <div className="map-panel">
                <Map
                    initialViewState={{
                        longitude: DEFAULT_LONGITUDE,
                        latitude: DEFAULT_LATITUDE,
                        zoom: 5.5
                    }}
                    ref={mapRef}
                    mapboxAccessToken={MAP_BOX_TOKEN}
                    style={{width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/mapbox/streets-v12">
                    {stores.map((store) => {
                        return (<Marker
                            className="marker"
                            key={store.id}
                            longitude={store.location.longitude}
                            latitude={store.location.latitude}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setPopUpData(store);
                            }}
                            anchor="bottom">
                                <img className="marker-image" alt="marker" src={marker} />
                        </Marker>);
                    })}
                    {popUpData && 
                        <Popup
                            longitude={popUpData.location.longitude}
                            latitude={popUpData.location.latitude}
                            onClose={() => setPopUpData(undefined)}
                            anchor="top">
                            <div>
                                <h2>{popUpData.name}</h2>
                                <p>{popUpData.address}</p>
                            </div>
                        </Popup>
                    }
                    {MapLowStockAlerts}
                </Map>
                {showLowStocklideout && currentAlert &&
                    <LowStockSlideout 
                        onClose={() => {
                            setShowLowStockSlideout(false);
                            setCurrentAlert(undefined);
                        }}
                        currentAlert={currentAlert}
                        onAlertResolve={handleAlertResolved}
                    />
                }
                </div>
            </div>
        </div>
    );
}
