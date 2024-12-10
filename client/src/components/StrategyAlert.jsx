import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const StrategyAlert = () => {
    const [strategy, setStrategy] = useState({
        name: '',
        details: Array(7).fill({ product: '', mult: '', contracts: [], selectedContract: '', contractName: '' })
        // details: Array(7).fill({ product: '', mult: '', selectedContract: '', contractName: '' })
    });

    useEffect(() => {
        const savedStrategy = JSON.parse(localStorage.getItem('strategyDetails'));
        if (savedStrategy) setStrategy(savedStrategy);
    }, []);

    useEffect(() => {
        localStorage.setItem('strategyDetails', JSON.stringify(strategy));
    }, [strategy]);

    console.log("STRATEGY ", strategy)

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
                if (!contracts.length) {
                    Swal.fire({ title: "No Contracts", text: `No contracts found for ID: ${productCode}`, icon: "info" });
                } else {
                    Swal.fire({ title: "Contracts Found", text: `Select your contracts for Product ${productCode}`, icon: "success" });
                    setStrategy((prevStrategy) => {
                        const newDetails = [...prevStrategy.details];
                        newDetails[index] = { ...newDetails[index], contracts, selectedContract: '' };
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
            return { ...prevStrategy, details: newDetails };
        });
    };

    const setStrategyAlert = async () => {
        alert("Strategy Alert is Set !!")
        //First enter the details into the DB and start running the server
        //Then go back to the home page
    }

    function backHome() {
        window.history.back()
    }


    //////////////Taken ////////////////////////////////
    const news = () => {

       
        let details = strategy.details; 
        console.log("details " , details) ; 

        const mp = new Map();
        let instruments = [];
        for (let i = 0; i < details.length; i++) {
            if (details[i].product.length > 0) {
                let temp = "TT-" + details[i].selectedContract
                instruments.push(temp);
                mp.set(temp, details[i].mult)
            }
        }
        console.log("mp ", mp)

        console.log("instruments ", instruments);

        let runningMp = new Map();
        mp.forEach((value, key) => {
            runningMp.set(key, new Array(2).fill(0))
        });
        console.log("size of runningMp ", runningMp.size);
        console.log("runnning mp " , runningMp)

        let totalIDs = runningMp.size;
        let flagMp = new Map();


        function init(instruments) {
            var client;

            const fields = ["key", "ExchangeRecvTime", "BestAsk", "BestAskQty", "BestBid", "BestBidQty"]
            client = new LightstreamerClient("https://ls-md.corp.hertshtengroup.com", "TTsdkLSAdapter");
            client.connectionOptions.setReconnectTimeout(2500);
            var subscription = new Subscription("MERGE", instruments, fields);
            subscription.addListener({
                onItemUpdate: function (obj) {
                    let values = obj.updateValues;
                    console.log(values)

                    let bestAsk = parseFloat(values[4]);
                    let bestBid = parseFloat(values[6]);

                    let currentId = values[2];
                    flagMp.set(currentId, '1');
                    runningMp.set(currentId, [bestAsk, bestBid]);

                    let bidOfStructure = 0;
                    let askOfStructure = 0;
                    runningMp.forEach((value, key) => {
                        if (mp.get(key)[0] === "+") {
                            let mult = mp.get(key);
                            let mul = mult.slice(1);
                            let operand = parseFloat(mul)
                            console.log("operand + ", operand)
                            bidOfStructure = bidOfStructure + (value[1] * operand);
                            askOfStructure = askOfStructure + (value[0] * operand);
                        }
                        else {
                            let mult = mp.get(key);
                            let mul = mult.slice(1);
                            let operand = parseFloat(mul)
                            console.log("operand - ", operand)
                            bidOfStructure = bidOfStructure + (value[0] * operand * -1);
                            askOfStructure = askOfStructure + (value[1] * operand * -1);
                        }
                    });


                    if (flagMp.size === totalIDs) {

                    }
                }
            });
            subscription.setDataAdapter("HGL1_Adapter");
            subscription.setRequestedSnapshot("no")
            subscription.setRequestedMaxFrequency(1)
            client.subscribe(subscription);
            client.connect();
        }
        // init(instruments);


    }

    news() ; 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ width: '400px', textAlign: 'center' }}>
                <h3>Strategy Input Form</h3>
                <br />
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Strategy Name"
                        value={strategy.name}
                        onChange={handleNameChange}
                    />
                </div>
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                        <form onSubmit={(e) => getContracts(e, i)} className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Product ${i + 1}`}
                                value={strategy.details[i].product}
                                onChange={(e) => handleInputChange(i, 'product', e.target.value)}
                                style={{ marginBottom: '5px' }}
                            />
                            <button className="btn btn-outline-success" type="submit" style={{ width: '100%' }}>Fetch Contracts</button>
                        </form>

                        {/* Display dropdown only if contracts are available */}
                        {strategy.details[i].contracts.length > 0 && (
                            <select
                                className="form-control"
                                value={strategy.details[i].selectedContract}
                                onChange={(e) => handleContractSelect(i, e.target.value)}
                                style={{ marginTop: '5px' }}
                            >
                                <option value="">Select Contract</option>
                                {strategy.details[i].contracts.map((contract, idx) => (
                                    <option key={idx} value={contract.instrumentId}>
                                        {contract.instrumentAlias} {/* Change this to the property you want to display */}
                                    </option>
                                ))}
                            </select>
                        )}

                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Multiplier ${i + 1}`}
                            value={strategy.details[i].mult}
                            onChange={(e) => handleInputChange(i, 'mult', e.target.value)}
                            style={{ marginTop: '5px' }}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setStrategyAlert()}
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    Set Alert
                </button>
            </div>
        </div>
    );
};

export default StrategyAlert;
