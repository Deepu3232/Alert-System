// feature : functionality to reactivate the alert
// maybe manually or after some interval of time 
// small change also done related to modal : even on changing the product, and clicking on search button,
//we were getting the same previous contracts, this is because we set setInfo(null) only after Set Alert button is clicked, but now setInfo(null) is added as soon as any of product or productType changes !!! 


import { useEffect, useRef, useState } from 'preact/hooks'
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { BiSolidShow } from "react-icons/bi";
import { VscDebugRestart } from "react-icons/vsc";
import { FaSearchengin } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
// useNavigate
// Link
// import productsList from '../public/productsList'


export const Alerts = ({ username, accounts }) => {
    // console.log(productsList)
    //After user clicks on
    const mainClassStyling = {
        height: "50vh",
        overflowY: "scroll"
    }

    const [products, setProducts] = useState([
        "225",
        "10Y",
        "225M",
        "2JC R",
        "2YY",
        "30Y",
        "5YY",
        "6A",
        "6B",
        "6C",
        "6E",
        "6J",
        "6L",
        "6M",
        "6N",
        "6R",
        "6S",
        "6Z",
        "7F",
        "A.es",
        "AA",
        "ADM",
        "ADM_MM",
        "AFS",
        "AH",
        "AJY",
        "ALI",
        "AMB1",
        "AMT1",
        "AP",
        "AU",
        "AUS",
        "AW",
        "B.es",
        "BAX",
        "BB",
        "bc",
        "BC.es",
        "BIO",
        "BM3",
        "BMA",
        "BRN",
        "BRN_MD",
        "BRN_MM",
        "BRN_Z",
        "BSB",
        "BTC",
        "BTE",
        "BUS",
        "BZ",
        "BZT",
        "C",
        "C_Z",
        "CA",
        "CAN",
        "CC",
        "CC_Z",
        "CCM",
        "CGB",
        "CGF",
        "CGO",
        "CGZ",
        "CHH",
        "CL",
        "CLT",
        "CN",
        "CNH",
        "COA",
        "CORN",
        "CRA",
        "CSC",
        "CT",
        "CT_Z",
        "CUS",
        "DAP",
        "DBAI",
        "DBI",
        "DBJ",
        "DC",
        "DDI",
        "DG",
        "DHH",
        "DHS",
        "DI1",
        "DINR",
        "DINRI",
        "DIT",
        "DOL",
        "DX",
        "E3G",
        "E7",
        "EAN",
        "ECD",
        "ECF",
        "EEM",
        "EEMA",
        "EH",
        "EHR",
        "EJP",
        "EMD",
        "ENK",
        "ER3",
        "ES",
        "ESG",
        "ESK",
        "ESR",
        "ETE",
        "ETH",
        "EUA",
        "EUI",
        "EUP",
        "EUS",
        "EY",
        "FBTE",
        "FBTP",
        "FBTS",
        "FBTU",
        "FCEU",
        "FCH",
        "FCPO",
        "FDAX",
        "FDXM",
        "FDXS",
        "FECX",
        "FEF",
        "FEHY",
        "FEMA",
        "FESB",
        "FESX",
        "FEU3",
        "FGBC",
        "FGBL",
        "FGBM",
        "FGBS",
        "FGBX",
        "FID",
        "FMAC",
        "FMAE",
        "FMAS",
        "FMAU",
        "FMCA",
        "FMCH",
        "FMCL",
        "FMCN",
        "FMCO",
        "FMCZ",
        "FMDK",
        "FMEA",
        "FMED",
        "FMEE",
        "FMEF",
        "FMEL",
        "FMEM",
        "FMEN",
        "FMEP",
        "FMEU",
        "FMFA",
        "FMFP",
        "FMFR",
        "FMGC",
        "FMGE",
        "FMGF",
        "FMGS",
        "FMGU",
        "FMHK",
        "FMHU",
        "FMID",
        "FMIN",
        "FMJP",
        "FMKG",
        "FMKN",
        "FMMU",
        "FMMX",
        "FMMY",
        "FMNA",
        "FMPA",
        "FMPH",
        "FMPX",
        "FMRS",
        "FMSA",
        "FMSE",
        "FMTH",
        "FMTW",
        "FMUA",
        "FMUK",
        "FMUS",
        "FMWE",
        "FMWG",
        "FMWN",
        "FMWO",
        "FMWP",
        "FMXJ",
        "FMXS",
        "FMXU",
        "FMZA",
        "FNG",
        "FOAT",
        "FRC",
        "FSF",
        "FSMI",
        "FSR3",
        "FST3",
        "FSTB",
        "FSXE",
        "FTUK",
        "FUEM",
        "FVS",
        "FXXP",
        "G",
        "G_Z",
        "GBR",
        "GC",
        "GCT",
        "GD",
        "GE",
        "GEO",
        "GF",
        "GFT",
        "GLD",
        "GO",
        "GWM",
        "H",
        "HC",
        "HE",
        "HET",
        "HG",
        "HGT",
        "HH",
        "HHI",
        "HN",
        "HO",
        "HOU",
        "HOU_Z",
        "HRC",
        "HSI",
        "HTI",
        "HU",
        "i",
        "I",
        "I.es",
        "IB",
        "IBHY",
        "IBIG",
        "ICF",
        "IND",
        "INK",
        "IR",
        "ISP",
        "IU",
        "J7",
        "JAP",
        "JB",
        "JBL",
        "JBM",
        "jFCE",
        "K2I",
        "KC",
        "KC_Z",
        "KE",
        "KET",
        "kFTI",
        "KOL",
        "KQI",
        "KRK",
        "KRW",
        "KU",
        "KX",
        "L",
        "LBR",
        "LE",
        "LET",
        "LGB",
        "LIB",
        "LIC",
        "LID",
        "LIT",
        "LIW",
        "LIY",
        "LRA",
        "LRC",
        "LRZ",
        "LT",
        "lu",
        "LU.es",
        "LUA",
        "LUC",
        "LUZ",
        "M.es",
        "M2K",
        "M6A",
        "M6B",
        "M6E",
        "M6J",
        "MBT",
        "MCA",
        "MCD",
        "MCH",
        "MCL",
        "MCS",
        "MES",
        "MET",
        "MEX",
        "MFS",
        "MGC",
        "MHG",
        "MHI",
        "MIN",
        "MJY",
        "MKI",
        "MMC",
        "MME",
        "MND",
        "MNG",
        "MNH",
        "MNQ",
        "MPC",
        "MSC",
        "MSF",
        "MTW",
        "MWE",
        "MYM",
        "NAA",
        "NG",
        "NGO",
        "NGT",
        "NI",
        "NIT",
        "NIY",
        "NK",
        "NK225",
        "NK225M",
        "NKD",
        "NOK",
        "NQ",
        "nr",
        "NR.es",
        "NT",
        "NZL",
        "O3",
        "OC1",
        "OGDCD",
        "OJ",
        "OQB",
        "OQD",
        "P.es",
        "PA",
        "PB",
        "PEK R",
        "PETRP",
        "PGJ R",
        "PGK R",
        "PJK R",
        "PJM R",
        "PJY",
        "PK.es",
        "PL",
        "PLT",
        "PRK",
        "QG",
        "QM",
        "QO",
        "R",
        "RB",
        "RBT",
        "RC",
        "RC_Z",
        "REDB",
        "REG R",
        "RF",
        "RFD",
        "RFI",
        "RGF R",
        "RGG R",
        "RGH R",
        "RJG R",
        "RJH R",
        "RJI R",
        "RJJ R",
        "RP",
        "RS",
        "RSD",
        "RSI",
        "RSS3",
        "RTY",
        "RUB",
        "S",
        "SA3",
        "SAS",
        "SB",
        "SB_Z",
        "SBT",
        "SC",
        "SC.es",
        "SCF",
        "SED",
        "SEK",
        "SF1",
        "SF3",
        "SGC",
        "SGP",
        "SGU",
        "SHR",
        "SI",
        "SIL",
        "SIR",
        "SIT",
        "SMC",
        "SN",
        "SO3",
        "SOA",
        "SON",
        "SOX",
        "SOY",
        "SOYB",
        "SPK",
        "SPT",
        "SR",
        "SR1",
        "SR3",
        "ST",
        "STL",
        "SVF",
        "SWI",
        "SXB",
        "SXF",
        "SXI",
        "SXO",
        "SXR",
        "SXT",
        "T10",
        "TBF3",
        "TF",
        "TFM",
        "TIE",
        "TN",
        "TNT",
        "TOA3M",
        "TPX",
        "TPXM",
        "TWE",
        "TWN",
        "TWP",
        "U",
        "UB",
        "UC",
        "UCN",
        "UHO",
        "UHU",
        "UIN",
        "USD",
        "UY",
        "VT",
        "VX",
        "VXM",
        "W",
        "W_Z",
        "WBS",
        "WBS_Z",
        "WDO",
        "WIN",
        "WSP",
        "XAB",
        "XAE",
        "XAF",
        "XAI",
        "XAK",
        "XAP",
        "XAR",
        "XAU",
        "XAV",
        "XAY",
        "XAZ",
        "XC",
        "XK",
        "XT",
        "XW",
        "Y.es",
        "Y2",
        "yEBM",
        "yECO",
        "yEMA",
        "YM",
        "yRSM",
        "yRSO",
        "YT",
        "Z",
        "Z3N",
        "ZB",
        "ZBT",
        "ZC",
        "ZCT",
        "ZF",
        "ZFT",
        "ZL",
        "ZLT",
        "ZM",
        "ZMT",
        "ZN",
        "ZNS",
        "ZO",
        "ZQ",
        "ZR",
        "ZS",
        "ZT",
        "ZTT",
        "ZW",
        "ZWT"
    ])
    const [refresh, setRefresh] = useState(false)
    const [alertType, setAlertType] = useState("Select Alert")
    const [threshold, setThreshold] = useState("")
    const [loading, setLoading] = useState(true)
    const closeModalRef = useRef(null)
    const openModalRef = useRef(null);
    const openStrategyAlertModalRef = useRef(null)
    const closeStrategyAlertModalRef = useRef(null)
    const openThresholdUpdateModal = useRef(null)
    const closeThresholdUpdateModal = useRef(null)
    const [product, setProduct] = useState("Product");
    const [strategyProduct1, setStrategyProduct1] = useState("Product")
    const [strategyProduct2, setStrategyProduct2] = useState("Product")
    const [strategyProduct3, setStrategyProduct3] = useState("Product")
    const [strategyProduct4, setStrategyProduct4] = useState("Product")
    const [strategyProduct5, setStrategyProduct5] = useState("Product")
    const [strategyProduct6, setStrategyProduct6] = useState("Product")
    const [productType, setProductType] = useState("Product Type");
    const [info, setInfo] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectAll, setSelectAll] = useState(false)
    const [unselectAll, setUnselectAll] = useState(false)
    const [alertName, setAlertName] = useState("");
    const [val, setVal] = useState(false)
    const [updateModalDetails, setUpdateModalDetails] = useState({})
    const [newThreshold, setNewThreshold] = useState("");
    const [searchBox, setSearchBox] = useState("")
    const [contractsToShow, setContractsToShow] = useState([]);

    let navigate = useNavigate();
    let baseURL = import.meta.env.VITE_BASE_URL
    const handleAlertTypeChange = (e) => {
        console.log("alertTypeHere ", e.target.value);
        setAlertType(e.target.value);
        if (e.target.value === "bidStrategyAlert") {
            // openStrategyAlertModalRef.current.click();
            navigate("/strategy",{
                state: {
                    alertType: "bidStrategyAlert"
                }
            })
        }
        else if (e.target.value === "askStrategyAlert") {
            navigate("/strategy",{
                state: {
                    alertType: "askStrategyAlert"
                }
            })
        }
    }

    const handleThresholdChange = (e) => {
        setThreshold(e.target.value);
    }

    const handleProductChange = (e) => {
        setProduct(e.target.value);
        setInfo(null);
    }

    const handleProduct1Change = (e) => {
        setStrategyProduct1(e.target.value);
        setInfo(null);
    }
    const handleProduct2Change = (e) => {
        setStrategyProduct2(e.target.value);
        setInfo(null);
    }
    const handleProduct3Change = (e) => {
        setStrategyProduct3(e.target.value);
        setInfo(null);
    }
    const handleProduct4Change = (e) => {
        setStrategyProduct4(e.target.value);
        setInfo(null);
    }
    const handleProduct5Change = (e) => {
        setStrategyProduct5(e.target.value);
        setInfo(null);
    }
    const handleProduct6Change = (e) => {
        setStrategyProduct6(e.target.value);
        setInfo(null);
    }

    const handleProductTypeChange = (e) => {
        setProductType(e.target.value);
        setInfo(null)
    }

    const handleAlertNameChange = (e) => {
        setAlertName(e.target.value);
    }

    const handleNewThresholdChange = (e) => {
        setNewThreshold(e.target.value);
    }

    const handleSubscriptionChange = (insID, index, e) => {
        // console.log("EVENT ", e.target.name)
        let checked = e.target.checked;
        const updatedInfo = info.map((contract, i) =>
            contract.insID === insID ? { ...contract, subscribed: checked } : contract
        );
        setInfo(updatedInfo);
        const updatedInfo1 = contractsToShow.map((contract, i) =>
            contract.insID === insID ? { ...contract, subscribed: checked } : contract
        );

        setContractsToShow(updatedInfo1)
    }
    // console.log(info)
    // console.log(contractsToShow)
    useEffect(() => {

        const getSubscriptions = async () => {

            const headersss = {
                'mode': "cors",
                'headers': {
                    'content-type': "application/json"
                },
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
            }
            // const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/application-0-tbfpqcl/endpoint/getSubscriptions", headersss);
            // const response = await fetch(`${baseURL}/getSubscriptions`, headersss)
            const response = await fetch(`http://localhost:8000/getSubscriptions`, headersss)
            console.log("resonse ", response);
            const data = await response.json();
            console.log("data ", data.subscriptions)
            setSubscriptions(data.subscriptions);
        }

        getSubscriptions();
    }, [refresh, setRefresh])



    const getContracts = (e) => {
        e.preventDefault();

        // setselectAll(false);
        setSelectAll(false)
        setUnselectAll(false)
        setLoading(true)
        openModalRef.current.click();

        console.log("info  ", info);

        if (info === null) callMarketDataAPI();
        else {
            setLoading(false)
            setContractsToShow(info);
        }

        async function callMarketDataAPI() {
            try {
                let trimmed = product.trim();
                let finalCode = trimmed.toUpperCase();
                const apiUrl = `https://marketdata-api.corp.hertshtengroup.com/api/instruments/active?productCode=${(finalCode)}`;

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok.');
                const contracts = await response.json();

                let dataForProductType = contracts.filter((contract) => {
                    return contract.productType.toLowerCase() === productType.toLowerCase();
                })

                if (!contracts) {
                    Swal.fire({
                        title: "No Contracts",
                        text: `No contracts found for ID: ${finalCode}`,
                        icon: "info"
                    });
                } else {
                    let infoTemp = []
                    dataForProductType.forEach(data => {
                        infoTemp.push({
                            contractName: data.instrumentAlias,
                            insID: data.instrumentId,
                            subscribed: true
                        })
                    });

                    setLoading(false)
                    setInfo(infoTemp);
                    setContractsToShow(infoTemp)
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: `Failed to fetch contracts: ${error.message}`,
                    icon: "error"
                });
            }
        }
    }


    const getContractsForStrategyAlert = (e) => {
        e.preventDefault();
        let btn = e.target;
        console.log("E.target ",)
        console.log("E.target ", btn.getAttribute('class'))
        // let button = document.querySelector(e.target) ; 

        // console.log("TARGET " , button) ; 
        // setselectAll(false);
        // setSelectAll(false)
        // setUnselectAll(false)
        // setLoading(true)
        // openModalRef.current.click();

        // console.log("info  ", info);

        // if (info === null) callMarketDataAPI();
        // else {
        //     setLoading(false)
        //     setContractsToShow(info);
        // }
        callMarketDataAPI()
        async function callMarketDataAPI() {
            try {
                let trimmed = strategyProduct1.trim();
                let finalCode = trimmed.toUpperCase();
                const apiUrl = `https://marketdata-api.corp.hertshtengroup.com/api/instruments/active?productCode=${(finalCode)}`;

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok.');
                const contracts = await response.json();

                // let dataForProductType = contracts.filter((contract) => {
                //     return contract.productType.toLowerCase() === productType.toLowerCase();
                // })

                if (!contracts) {
                    Swal.fire({
                        title: "No Contracts",
                        text: `No contracts found for ID: ${finalCode}`,
                        icon: "info"
                    });
                } else {
                    // let infoTemp = []
                    // contracts.forEach(data => {
                    //     infoTemp.push({
                    //         contractName: data.instrumentAlias,
                    //         insID: data.instrumentId,
                    //         subscribed: true
                    //     })
                    // });

                    // setLoading(false)
                    // setInfo(infoTemp);
                    // setContractsToShow(infoTemp)

                    const existingDropdown = form.querySelector('select');
                    if (existingDropdown) {
                        existingDropdown.remove();
                    }

                    // Create a new dropdown
                    const select = document.createElement('select');
                    select.className = 'form-control'; // Add Bootstrap styling class
                    select.innerHTML = '<option value="">Select Contract</option>'; // Default option

                    // Populate the dropdown with instrumentAlias values
                    contracts.forEach(contract => {
                        const option = document.createElement('option');
                        option.value = contract.instrumentId; // Option value (can be any unique identifier)
                        option.textContent = contract.instrumentAlias; // Display text
                        select.appendChild(option);
                    });

                    // Insert the dropdown below the input field
                    form.appendChild(select);


                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: `Failed to fetch contracts: ${error.message}`,
                    icon: "error"
                });
            }
        }
    }



    const setAlert = async (e) => {
        e.preventDefault();
        const tempProductType = (productType === "future" ? "outrights" : "spreads")
        let tempInfo = info.filter(x => x.subscribed === true);
        let updatedInfo = tempInfo.map(obj => {
            return {
                ...obj,
                status: "active"
            };
        });

        // console.log("Updated INfo", updatedInfo);
        // setInfo(tempInfo) ; 
        // console.log("INFOOOOO , " , info); 
        // console.log("tempInfo " , tempInfo)
        const response = await fetch(`${baseURL}/setSubscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alertName: alertName.length === 0 ? "My Alert" : alertName,
                user: username,
                product,
                productType: tempProductType,
                details: updatedInfo,
                alertType,
                threshold,
                alertStatus: "active"
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setRefresh(!refresh)

        const result = await response.json();
        Swal.fire({
            title: "Done !",
            text: `Alert Request Placed  !`,
            icon: "success"
        })

        setAlertName("")
        setProduct("Product")
        setProductType("Product Type")
        setAlertType("Select Alert")
        setThreshold("")
        setInfo(null)
    }

    const handleDivChange = (e) => {
        if (e.target.name === "selectAll") {
            console.log("HERE ", e.target.checked)
            if (e.target.checked) {
                // console.log(subscriptions)
                const updatedInfo = info.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: true } : contract
                );
                setInfo(updatedInfo);
                const updatedInfo1 = contractsToShow.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: true } : contract
                );

                setContractsToShow(updatedInfo1)
                console.log("INFO select ", info)

                setSelectAll(true)
                setUnselectAll(false);
            }
            else {
                const updatedInfo = info.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: false } : contract
                );
                setInfo(updatedInfo);
                const updatedInfo1 = contractsToShow.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: false } : contract
                );

                setContractsToShow(updatedInfo1)
                // setContractsToShow(updatedInfo)
                console.log("INFO unselect ", info)

                setSelectAll(false)

                setUnselectAll(true);
            }
        }
        else if (e.target.name === "unselectAll") {
            if (e.target.checked) {
                const updatedInfo = info.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: false } : contract
                );
                setInfo(updatedInfo);
                const updatedInfo1 = contractsToShow.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: false } : contract
                );

                setContractsToShow(updatedInfo1)
                // setContractsToShow(updatedInfo)

                console.log("INFO unselect ", info)


                setSelectAll(false)
                setUnselectAll(true);
            }
            else {
                const updatedInfo = info.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: true } : contract
                );
                setInfo(updatedInfo);
                const updatedInfo1 = contractsToShow.map((contract, i) =>
                    2 === 2 ? { ...contract, subscribed: true } : contract
                );

                setContractsToShow(updatedInfo1)

                // setContractsToShow(updatedInfo)
                console.log("INFO select ", info)


                setSelectAll(true)
                setUnselectAll(false);
            }
        }

        // console.log("selectAll " , selectAll)
        // console.log("unselectAll " , unselectAll)
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };


    console.log("info ", info);

    // console.log("Final INfor", info);


    const deleteAlert = async (id) => {
        console.log("ID To delete ", id);
        Swal.fire({
            title: "Do you want to delete the alert ?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Alert Deleted!", "", "success");


                const deleteA = async () => {
                    // console.log("ALERT TO DELETE " , id)

                    const headersss = {
                        'mode': "cors",
                        'headers': {
                            'content-type': "application/json"
                        },
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                    }


                    const response = await fetch(`${baseURL}/deleteAlert/${id}`, {
                        "method": "DELETE",
                        'mode': "cors",
                        'headers': {
                            'content-type': "application/json"
                        },
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                    })
                    const data = await response.json();
                    if (data) setRefresh(!refresh)
                }

                deleteA();



            } else if (result.isDenied) {
                Swal.fire("Alert is saved", "", "info");
            }
        });





        // if(data){
        //     
        //     console.log("Alert with " , id , " has been DELETED")
        // }
    }

    const updateAlert = async (alert) => {
        //open modal to update the threshold values 
        openThresholdUpdateModal.current.click()
        setUpdateModalDetails(alert);

        console.log("updateModalDetails ", updateModalDetails)


    }


    const updateNewThreshold = async (details) => {
        closeThresholdUpdateModal.current.click();

        //API call for updating the threshold in the DB
        const response = await fetch(`${baseURL}/updateThreshold/${details.id}`, {
            "method": "POST",
            "body": JSON.stringify({ newThreshold }),
            "content-type": "application/json"
        })
        const data = await response.json();

        if (data) {
            Swal.fire("Updated", "", "info");
        }
    }

    // setProducts(productsList)
    // console.log("NEW ", products)

    const handleSearchBoxChange = (e) => {
        setSearchBox(e.target.value);
    }

    const fetchSearchedContracts = (e) => {
        e.preventDefault();
        // if(text.length === 0) setInfo(info) 
        let text = searchBox.toLowerCase();
        console.log("text ", text)
        console.log(info)
        let updatedInfo = info.filter(obj => {
            return obj.contractName.toLowerCase().includes(text);
        });

        setContractsToShow(updatedInfo);
    }

    const showSelections = () => {
        setContractsToShow(info)
    }

    const handlecloseModalRef = () => {
        closeModalRef.current.click();
    }

    const reactivateAlert = async (alertID) => {
        alert("Alert is re-activated")
        //here we have to set the status of all the breached alerts to "active"
        //Make an API call to the following alertID, and change for each contractID status from "breached" to "active"
        const response = await fetch(`${baseURL}/reactivateAlert/${alertID}`, {
            "method": "PATCH",
            "content-type": "application/json"
        })
        const data = await response.json();
    }


    return (
        <>
            <form className="d-flex" onSubmit={setAlert} role="search">
                <div className="mt-5 d-flex w-100 justify-content-around" >
                    
                    <div className="alertType">
                        {/* <select value={comp} onChange={handleCompChange} className="form-select" aria-label="Default select example"> */}
                        <select name='alertType' value={alertType} onChange={handleAlertTypeChange} className="form-select" aria-label="Default select example">
                            <option selected>Select Alert</option>
                            <option value="bestAskPrice">Best Ask Price</option>
                            <option value="bestBidPrice">Best Bid Price</option>
                            <option value="bestAskQty">Best Ask Quantity</option>
                            <option value="bestBidQty">Best Bid Quantity</option>
                            <option value="bidStrategyAlert">Strategy Alert (Bid)</option>
                            <option value="askStrategyAlert">Strategy Alert (Ask)</option>
                            <option value="icebergAlert">Iceberg Alert</option>
                        </select>
                    </div>

                    <div className="alertName">
                        <input name='alertName' onChange={handleAlertNameChange} value={alertName} class="form-control me-2" type="text" placeholder="Enter Alert Name" aria-label="Search" />
                    </div>
                    

                    <div className='d-flex w-25'>
                        <select name='product' value={product} onChange={handleProductChange} className="form-select w-100" aria-label="select example" type="productType" placeholder="Product">
                            <option selected>Product</option>
                            {
                                products.map((product, index) => {
                                    return <option key={index} value={product}>{product}</option>
                                    // console.log("Hello")
                                })
                            }
                            {/* <option value="CL">CL</option>
                            <option value="BRN">BRN</option>
                            <option value="SB">SB</option>
                            <option value="ZW">ZW</option>
                            <option value="ZC">ZC</option>
                            <option value="HG">HG</option>
                            <option value="CT">CT</option> */}
                        </select>
                        <select name='productType' value={productType} onChange={handleProductTypeChange} className="form-select" aria-label="select example" type="productType" placeholder="Product Type">
                            <option selected>Product Type</option>
                            <option value="future">Outrights</option>
                            <option value="multileginstrument">Spreads</option>
                        </select>
                        <div>
                            <button onClick={getContracts} class="btn btn-success w-100" type="submit">
                                <FaSearchengin color='white' size={25} />
                            </button>
                        </div>
                        {/* <button onClick={getContracts} class="btn btn-success w-100" type="submit">Get Contracts</button> */}
                    </div>
                    

                    <div className="threshold">
                        <input name='threshold' onChange={handleThresholdChange} value={threshold} class="form-control me-2" type="productType" placeholder="Enter Threshold" aria-label="Search" />
                    </div>
                    {/* <div> */}
                    <button className="border border-1.5 border-black btn btn-success px-5">Set Alert</button>
                </div>
            </form>
            <br />
            <br />

            {/* Code For Modal Below */}

            {/* <!-- Button trigger modal --> */}
            <button ref={openModalRef} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">{product.toUpperCase()} : {productType === "future" ? "Outrights" : "Spreads"}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <br />
                        <form onSubmit={fetchSearchedContracts} class="w-100 justify-content-around d-flex m-auto" role="search">
                            <BiSolidShow onClick={showSelections} className='mt-1' style={{ "cursor": "pointer" }} color={'black'} size={25} />
                            <input value={searchBox} name='searchBox' onChange={handleSearchBoxChange} class="w-50 form-control me-2" type="search" placeholder="What are you looking for?" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        <div onChange={handleDivChange} class="modal-body">
                            <div style={!loading && mainClassStyling} className='mainClass container d-flex flex-column'>

                                {!loading ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No.</th>
                                                <th scope="col">Contract Name</th>
                                                <th scope='col'>Subscribed</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {contractsToShow.map((contract, index) => (
                                                <>
                                                    <tr>
                                                        <td scope="row">{index + 1}</td>
                                                        <td >{contract.contractName}</td>
                                                        <td>
                                                            <div className="container form-check">
                                                                <input onChange={(e) => handleSubscriptionChange(contract.insID, index, e)} className="form-check-input m-sm-1" type="checkbox" id="flexCheckChecked" checked={contract.subscribed} style={{ "cursor": "pointer" }} name='contractCheckbox' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    // <p>No instruments subscribed yet.</p>
                                    <>
                                        <div className="container d-flex justify-content-center">
                                            <InfinitySpin
                                                visible={true}
                                                width="150"
                                                color="blue"
                                                ariaLabel="infinity-spin-loading"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <br />
                            <hr />
                            <div className="selectUnselect d-flex w-50 justify-content-between">
                                <div class="form-check">
                                    <input name='selectAll' class="form-check-input" type="checkbox" id="flexRadioDefault1" checked={selectAll} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        <strong>Select All</strong>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input name='unselectAll' class="form-check-input" type="checkbox" id="flexRadioDefault2" checked={unselectAll} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        <strong>Unselect All</strong>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button ref={closeModalRef} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handlecloseModalRef} type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal For Strategy Alert Begins */}
            <button ref={openStrategyAlertModalRef} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                Strategy Alert
            </button>

            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Prepare your strategy Alert...</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="w-100">
                                <thead>
                                    <tr>

                                        <th scope="col">Contract</th>
                                        <th scope="col">Multiplier</th>
                                    </tr>
                                </thead>
                                <br />
                                <tbody>


                                    <tr>
                                        {/* <form class="d-flex" role="search" > */}
                                        <td className='d-flex '>
                                            <select name='product' value={strategyProduct1} onChange={handleProduct1Change} className="form-select w-100" aria-label="select example" type="productType" placeholder="Product">
                                                <option selected>Product</option>
                                                {
                                                    products.map((product, index) => {
                                                        return <option key={index} value={product}>{product}</option>
                                                    })
                                                }
                                            </select>
                                            {/* <select name='productType' value={productType} onChange={handleProductTypeChange} className="form-select" aria-label="select example" type="productType" placeholder="Product Type">
                                                <option selected>Product Type</option>
                                                <option value="future">Outrights</option>
                                                <option value="multileginstrument">Spreads</option>
                                            </select> */}
                                            <button onClick={getContractsForStrategyAlert} class="btn btn-success w-25" type="submit">
                                                <FaSearchengin color='white' size={25} />
                                            </button>
                                        </td>

                                        <td><input type="text" class="form-control w-50" placeholder="Multiplier" aria-label="Username" aria-describedby="basic-addon1" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td className='d-flex '>
                                            <select name='product' value={strategyProduct2} onChange={handleProduct2Change} className="form-select w-100" aria-label="select example" type="productType" placeholder="Product">
                                                <option selected>Product</option>
                                                {
                                                    products.map((product, index) => {
                                                        return <option key={index} value={product}>{product}</option>
                                                    })
                                                }
                                            </select>
                                            <button onClick={getContracts} class="btn btn-success w-25" type="submit">
                                                <FaSearchengin color='white' size={25} />
                                            </button>

                                        </td>
                                        <td><input type="text" class="form-control w-50" placeholder="Multiplier" aria-label="Username" aria-describedby="basic-addon1" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td className='d-flex '>
                                            <select name='product' value={strategyProduct3} onChange={handleProduct3Change} className="form-select w-100" aria-label="select example" type="productType" placeholder="Product">
                                                <option selected>Product</option>
                                                {
                                                    products.map((product, index) => {
                                                        return <option key={index} value={product}>{product}</option>
                                                    })
                                                }
                                            </select>
                                            <button onClick={getContracts} class="btn btn-success w-25" type="submit">
                                                <FaSearchengin color='white' size={25} />
                                            </button>
                                        </td>
                                        <td><input type="text" class="form-control w-50" placeholder="Multiplier" aria-label="Username" aria-describedby="basic-addon1" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td className='d-flex '>
                                            <select name='product' value={strategyProduct4} onChange={handleProduct4Change} className="form-select w-100" aria-label="select example" type="productType" placeholder="Product">
                                                <option selected>Product</option>
                                                {
                                                    products.map((product, index) => {
                                                        return <option key={index} value={product}>{product}</option>
                                                    })
                                                }
                                            </select>
                                            <button onClick={getContracts} class="btn btn-success w-25" type="submit">
                                                <FaSearchengin color='white' size={25} />
                                            </button>
                                        </td>
                                        <td><input type="text" class="form-control w-50" placeholder="Multiplier" aria-label="Username" aria-describedby="basic-addon1" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td className='d-flex '>
                                            <select name='product' value={strategyProduct5} onChange={handleProduct5Change} className="form-select w-100" aria-label="select example" type="productType" placeholder="Product">
                                                <option selected>Product</option>
                                                {
                                                    products.map((product, index) => {
                                                        return <option key={index} value={product}>{product}</option>
                                                    })
                                                }
                                            </select>
                                            <button onClick={getContracts} class="btn btn-success w-25" type="submit">
                                                <FaSearchengin color='white' size={25} />
                                            </button>

                                        </td>
                                        <td><input type="text" class="form-control w-50" placeholder="Multiplier" aria-label="Username" aria-describedby="basic-addon1" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td className='d-flex '>
                                            <select name='product' value={strategyProduct6} onChange={handleProduct6Change} className="form-select w-100" aria-label="select example" type="productType" placeholder="Product">
                                                <option selected>Product</option>
                                                {
                                                    products.map((product, index) => {
                                                        return <option key={index} value={product}>{product}</option>
                                                    })
                                                }
                                            </select>
                                            <button onClick={getContracts} class="btn btn-success w-25" type="submit">
                                                <FaSearchengin color='white' size={25} />
                                            </button>

                                        </td>
                                        <td><input type="text" class="form-control w-50" placeholder="Multiplier" aria-label="Username" aria-describedby="basic-addon1" /></td>
                                    </tr>
                                    <br />
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal For Strategy Alert Ends */}

            <br /><br /><br />
            <div className='container'>
                {subscriptions.length > 0 && (
                    <>
                        {subscriptions.map((subs) => {
                            // Check if alertType is not "bidStrategyAlert"
                            if (subs.alertType !== "bidStrategyAlert" && subs.alertType !== "askStrategyAlert") {
                                const contracts = subs.details
                                    .map((detail) => detail.contractName)
                                    .join(", ");

                                console.log("SUBS " , subs)

                                return (
                                    <div
                                        key={subs._id}
                                        className="h-6 overflow-auto border border-success border-2 rounded p-3 d-flex flex-column mb-4 bg-white"
                                    >
                                        <div className="d-flex justify-content-between">
                                            <h5 className="text-monospace text-decoration-underline">
                                                {subs.alertName}
                                            </h5>
                                            <div
                                                style={{ width: "6rem" }}
                                                className="d-flex flex-row justify-content-around"
                                            >

                                                <FiEdit
                                                    onClick={() => updateAlert(subs)}
                                                    style={{ cursor: "pointer" }}
                                                    color="purple"
                                                    size="24px"
                                                />
                                                <VscDebugRestart
                                                    onClick={() => reactivateAlert(subs._id)}
                                                    style={{ cursor: "pointer" }}
                                                    color="brown"
                                                    size="25px"
                                                />
                                                <RiDeleteBin6Line
                                                    onClick={() => deleteAlert(subs._id)}
                                                    style={{ cursor: "pointer" }}
                                                    color="red"
                                                    size="25px"
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <h6 className="text-monospace">Product: {subs.product}</h6>
                                        <h6 className="text-monospace">
                                            Product Type:{" "}
                                            {subs.productType.charAt(0).toUpperCase() +
                                                subs.productType.slice(1)}
                                        </h6>
                                        <h6>
                                            Alert Type:{" "}
                                            {subs.alertType.charAt(0).toUpperCase() +
                                                subs.alertType.slice(1).toLowerCase()}
                                        </h6>
                                        <h6>Threshold: {subs.threshold}</h6>
                                        <h6>Contracts: {contracts}</h6>
                                    </div>
                                );
                            } else {
                                let StratDetails = subs.details;
                                let str = ""; 
                                StratDetails.map((eachContract => {
                                    str += eachContract.contractName + "(" + eachContract.mult + ") ,";
                                }))

                                return (
                                    <div
                                        key={subs.id}
                                        className="h-6 overflow-auto border border-success border-2 rounded p-3 d-flex flex-column mb-4 bg-white"
                                    >
                                        <div className="d-flex justify-content-between">
                                            <h5 className="text-monospace text-decoration-underline">
                                                {subs.alertName}
                                            </h5>
                                            <div
                                                style={{ width: "6rem" }}
                                                className="d-flex flex-row justify-content-around"
                                            >
                                                <VscDebugRestart
                                                    onClick={() => reactivateAlert(subs.id)}
                                                    style={{ cursor: "pointer" }}
                                                    color="brown"
                                                    size="25px"
                                                />
                                                <FiEdit
                                                    onClick={() => updateAlert(subs._id)}
                                                    style={{ cursor: "pointer" }}
                                                    color="purple"
                                                    size="24px"
                                                />
                                                <RiDeleteBin6Line
                                                    onClick={() => deleteAlert(subs._id)}
                                                    style={{ cursor: "pointer" }}
                                                    color="red"
                                                    size="25px"
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        {/* <h6 className="text-monospace">Product: {subs.product}</h6> */}
                                        {/* <h6 className="text-monospace">
                                            Product Type:{" "}
                                            {subs.productType.charAt(0).toUpperCase() +
                                                subs.productType.slice(1)}
                                        </h6> */}
                                        {
                                            // StratDetails.map((detail, i) => {
                                            //     return (
                                            //         <div key={i}>
                                            //             <h6 className="text-monospace">
                                            //                 Product: {detail.product}
                                            //             </h6>
                                            //             <h6 className="text-monospace">
                                            //                 Product Type:{" "}
                                            //                 {detail.productType.charAt(0).toUpperCase() +
                                            //                     detail.productType.slice(1)}
                                            //             </h6>
                                            //         </div>
                                            //     )
                                            // })
                                        }
                                        <h6>
                                            Alert Type:{" "}
                                            {subs.alertType.charAt(0).toUpperCase() +
                                                subs.alertType.slice(1).toLowerCase()}
                                        </h6>
                                        <h6>Threshold: {subs.threshold}</h6>
                                        <h6>Contracts: {str}</h6>
                                    </div>
                                );
                            }
                        })}
                    </>
                )}

            </div>



            {/* <!-- Button trigger modal --> */}

            {
                updateModalDetails
                &&
                <>
                    <button ref={openThresholdUpdateModal} type="button" class="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                        Modal for updating threshold
                    </button>

                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update {updateModalDetails.alertName}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <h6>Previous Threshold Value : {updateModalDetails.threshold}</h6><br />
                                    <div className="threshold d-flex">
                                        <h6 className='w-75'>New Threshold Value: </h6>
                                        {/* <label htmlFor="threshold">New Threshold</label> */}
                                        <input name='newThreshold' className='' onChange={handleNewThresholdChange} value={newThreshold} class="form-control me-2" type="productType" placeholder="Enter Threshold" aria-label="Search" />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button ref={closeThresholdUpdateModal} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={() => updateNewThreshold(updateModalDetails)} type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}