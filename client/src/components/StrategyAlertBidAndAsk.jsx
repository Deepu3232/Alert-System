// import * as Ls from "lightstreamer-client-web";
import React, { useState, useEffect } from 'react';
import { BiCloudLightRain } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
// useNavigate


const StrategyAlertBidAndAsk = ({ username }) => {
    const [strategy, setStrategy] = useState({
        name: '',
        details: Array(6).fill({ product: '', mult: '', contracts: [], selectedContract: '', contractName: '' }),
        threshold: ''
    });
    let navigate = useNavigate();

    // const [threshold  , setThreshold] = useState('');
    // console.log("strategy ", strategy);
    const {state} = useLocation()
    // console.log(state.alertType)

    const handleInputChange = (index, field, value) => {
        setStrategy((prevStrategy) => {
            const newDetails = [...prevStrategy.details];
            newDetails[index] = { ...newDetails[index], [field]: value };
            return { ...prevStrategy, details: newDetails };
        });
    };

    const handleNameChange = (e) => {
        setStrategy((prevStrategy) => ({ ...prevStrategy, name: e.target.value }));
    };

    const getContracts = async (event, index) => {
        event.preventDefault();
        const productCode = strategy.details[index].product.trim().toUpperCase();

        Swal.fire({
            title: "Fetching Contracts",
            text: `Fetching contracts for product code: ${productCode}`,
            icon: "info",
        }).then(async () => {
            try {
                const apiUrl = `https://marketdata-api.corp.hertshtengroup.com/api/instruments/active?productCode=${productCode}`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok.');

                const contracts = await response.json();
                // console.log("contracts ", contracts);
                if (!contracts.length) {
                    Swal.fire({ title: "No Con<br /><br />tracts", text: `No contracts found for ID: ${productCode}`, icon: "info" });
                } else {
                    Swal.fire({ title: "Contracts Found", text: `Select your contracts for Product ${productCode}`, icon: "success" });
                    setStrategy((prevStrategy) => {
                        const newDetails = [...prevStrategy.details];
                        newDetails[index] = { ...newDetails[index], contracts, selectedContract: '', contractName: '' };
                        return { ...prevStrategy, details: newDetails };
                    });
                }
            } catch (error) {
                Swal.fire({ title: "Error", text: `Failed to fetch contracts: ${error.message}`, icon: "error" });
            }
        });
    };

    const handleContractSelect = (index, contractId) => {
        setStrategy((prevStrategy) => {
            const newDetails = [...prevStrategy.details];
            newDetails[index].selectedContract = contractId;
            newDetails[index].contractName = newDetails[index].contracts.find((contract) => contract.instrumentId === contractId).instrumentAlias;
            return { ...prevStrategy, details: newDetails };
        });
    };


    const makeAPICall = async (backendData) => {
        const baseURL = import.meta.env.VITE_BASE_URL
        // const response = await fetch("http://localhost:8000/setStrategyAlert", {
            const response = await fetch(`${baseURL}/setStrategyAlert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(backendData)
        });

        const resp = await response.json();

        if (resp) {
            console.log("RESP , ", resp)
            console.log("DATA ENTERED !!!")
        }
    }

    const setStrategyAlert = () => {
        console.log("STrategy ", strategy)
        let data = []
        strategy.details.map(detail => {
            if (detail.product.length > 0) {
                data.push({
                    product: detail.product,
                    mult: detail.mult,
                    selectedContract: detail.selectedContract,
                    contractName: detail.contractName
                });
            }
        })
        console.log("data ", data);
        const backendData = {
            user: username,
            alertType: state.alertType,
            alertName: strategy.name,
            status: "active",
            threshold: strategy.threshold,
            details: data
        }
        makeAPICall(backendData)
        Swal.fire({
            title: "Success",
            text: "Strategy Alert has been set!",
            icon: "success",
        });
        navigate("/")
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <br /><br />
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Strategy Alert</h3>
            <div className="mb-3">

                <label>Strategy Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Strategy Name"
                    value={strategy.name}
                    onChange={handleNameChange}
                />
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '40px',
                    marginTop: '40px',
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                        <label>Product {i + 1}</label>
                        <form onSubmit={(e) => getContracts(e, i)} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Product Code"
                                value={strategy.details[i].product}
                                onChange={(e) => handleInputChange(i, 'product', e.target.value)}
                            />
                            <button type="submit" className="btn btn-success">Fetch</button>
                        </form>
                        {strategy.details[i].contracts.length > 0 && (
                            <>
                                <label>Select Contract</label>
                                <select
                                    className="form-control"
                                    value={strategy.details[i].selectedContract}
                                    onChange={(e) => handleContractSelect(i, e.target.value)}
                                    style={{ marginBottom: '10px' }}
                                >
                                    <option value="">Select Contract</option>
                                    {strategy.details[i].contracts.map((contract, idx) => (
                                        <option key={idx} value={contract.instrumentId}>
                                            {contract.instrumentAlias}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                        <label>Multiplier</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Multiplier"
                            value={strategy.details[i].mult}
                            onChange={(e) => handleInputChange(i, 'mult', e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <br /><br />
            <div className='w-50 d-flex flex-row justify-content-center m-auto'>



                {/* <label>Threshold</label> */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Threshold Here"
                    style={{ width: '50%', marginTop: '20px' }}
                    value={strategy.threshold}
                    onChange={(e) => setStrategy({ ...strategy, threshold: e.target.value })}
                // value={strategy.details[i].mult}
                // onChange={(e) => handleInputChange(i, 'mult', e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={setStrategyAlert}
                    style={{ width: '50%', marginTop: '20px' }}
                >
                    Set Alert
                </button>
            </div>
        </div>
    );
};

export default StrategyAlertBidAndAsk;
