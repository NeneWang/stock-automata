import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import StockTable from '../components/StockTable'
import SettingToggler from '../components/SettingToggler'
import { CSVLink } from "react-csv";
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SelectTableToLoad from '../components/SelectTableToLoad'



export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [popMessage, setPopMessage] = useState("");
  const [tableID, setTableID] = useState(-99);
  const [tableTitle, setTableTitle] = useState("Untitled")
  const [tablesData, setTablesData] = useState([])
  const [settings, setSettings] = useState(
    {
      "1y Target Est": true,
      "52 Week range": false,
      "Avg. Volume": true,
      "Beta (5Y Monthly)": true,
      "Days range": true,
      "EPS (TTM)": true,
      "Earnings Date": true,
      "Ex-Dividend Date": true,
      "Market Cap": true,
      "Open": true,
      "PE Ratio (TTM)": true,
      "Previous Close": true,
      "Volume": true
    }
  );
  const [openModalSave, setOpenModalSave] = React.useState(false);
  const handleOpenModalSave = () => setOpenModalSave(true);
  const handleCloseModalSave = () => setOpenModalSave(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const openSnackBar = (message) => {
    setPopMessage(message)
    setOpenSnack(true);
  };


  const runInitState = () => {
    fetch('https://codex-chan.wangnelson.xyz/public/api/stock/save/getids').then((res) => res.json()).then((data) => {
      setTablesData([...data]);
    })
  }
  const onTableSelected = (event) => {
    let tableSelectedID = event.target.value
    setTableID(tableSelectedID)

    if (tableSelectedID > 0) {
      fetch(`https://codex-chan.wangnelson.xyz/public/api/stock/save/load/${tableSelectedID}`).then((res) => res.json()).then((data) => {

        setSettings(data["settings"]);
        setTableTitle(data["name"]);
        let formattedStockInformation = [];
        data["stockData"].forEach(stockData => {
          let stockObject = Object()
          let stockDataObject = JSON.parse(stockData["data"]);
          stockObject[stockData["symbol"]] = { ...stockData, ...stockDataObject };

          formattedStockInformation.push(stockObject)
        })
        setStocks(formattedStockInformation)
      })
    }else{
      setTableID(-99)
    }
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const getCsvPreparedStocksData = () => {
    // Preepare the csv for this.
    // Get the settings first

    let namesrow = ["Symbol"], dataRows = []
    {
      settings && Object.keys(settings).map((setting) => {
        if (settings[setting] == true) {
          namesrow.push(setting)
        }
      })
    }

    {
      stocks && Object.values(stocks).map(stock => {
        const stockData = Object.values(stock)[0];
        let newRow = [stockData["symbol"]]
        // For each row of the data
        {
          settings && Object.keys(settings).map(
            // console.log(setting)
            setting => {
              // return <th scope="col">{settings[setting] &&
              //   <td>{stockData[setting]}</td>}</th>

              if (settings[setting]) newRow.push(stockData[setting])
            }
          )
        }

        dataRows.push(newRow)
      })
    }
    console.log([namesrow, ...dataRows]);
    return [namesrow, ...dataRows]
  }




  function toggleSetting(settingName) {
    let newSetting = Object()
    newSetting[settingName] = !settings[settingName]
    setSettings({ ...settings, ...newSetting })
    return false
  }

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

  function formSubmitHandle(events) {
    events.preventDefault()


    const symbol = events.target.symbol.value.toUpperCase();

    events.target.reset();
    addStock(symbol)


  }

  function saveUpdateForm() {

    let requestObject = {}

    let stockList = [];

    Object.values(stocks).forEach(stock => {
      stockList.push(Object.values(stock)[0].symbol);
    })

    requestObject["stocks"] = stockList;
    requestObject["settings"] = settings;
    requestObject["id"] = tableID;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestObject)
    };

    console.log(requestObject)
    console.log(tablesData)

    fetch("https://codex-chan.wangnelson.xyz/public/api/stock/save/save", requestOptions)


  }

  function saveFormSubmitHandle(events) {
    events.preventDefault()
    const saveName = events.target.savename.value;

    let requestObject = {}
    requestObject["name"] = saveName;
    requestObject["settings"] = settings;

    let stockList = [];

    Object.values(stocks).forEach(stock => {
      stockList.push(Object.values(stock)[0].symbol);
    })

    requestObject["stocks"] = stockList;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestObject)
    };

    fetch("https://codex-chan.wangnelson.xyz/public/api/stock/save/savenew", requestOptions)

    // console.log(events)
    events.target.reset();
    handleCloseModalSave()

  }

  function addStock(symbol) {
    fetch(`https://codex-chan.wangnelson.xyz/public/api/stock/smartget/stocksymbol/${symbol}`).then((res) => res.json()).then((data) => {

      if (data["stock_stat"] == "FALSE") {
        openSnackBar(`hmmm... ${symbol} doesn't exists in our records, is the symbol correctly spelled?`)
      }
      if (data["stock_stat"] == "RESEARCHING") {
        openSnackBar(`${symbol} under research, it will be available between 24 hours`)
      }
      if (data["stock_stat"] == "TRUE") {
        openSnackBar(`${symbol} added`)
        // console.log(

        let newInformation = data[0]
        newInformation = { newInformation, ...JSON.parse(newInformation.data) };
        let newStockInfo = Object()
        newStockInfo[symbol] = newInformation;

        setStocks([...stocks, newStockInfo])
      }
    })
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    runInitState()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Stock Automata</title>
        <meta name="description" content="Automatically produce a spreadsheet containing your favorite stocks information." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        Stock Automata
      </h1>

      <p className={styles.description}>
        {tableTitle}
      </p>
      <form onSubmit={formSubmitHandle}>

        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message={popMessage}
          action={action}
        />

        <SelectTableToLoad tables={tablesData} onSelect={onTableSelected} />
        <input type="text" name='symbol' class="form-control" placeholder="Enter Stock Symbol" />
        {
          settings && Object.keys(settings).map(setting =>

            <SettingToggler settings={settings} setting={setting} toggleSetting={toggleSetting} />

          )
        }
      </form>
      <CSVLink className='btn btn-outline-primary' data={getCsvPreparedStocksData()}>Download as CSV</CSVLink>
      {/* <Button onClick={getCsvPreparedStocksData} >Get CSV</Button> */}
      <Modal
        open={openModalSave}
        onClose={handleCloseModalSave}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <form onSubmit={saveFormSubmitHandle}>
            <h3>Save as</h3>
            <input type="text" class="form-control" name="savename" placeholder='untitled' />
            <button className='btn' type="submit">Save</button>
          </form>
        </Box>
      </Modal>
      <button className='btn btn-outline-primary' onClick={saveUpdateForm}  > Save </button>
      <button className='btn btn-outline-primary' onClick={handleOpenModalSave}> Save as </button>


      <StockTable stocks={stocks} settings={settings} />
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >

        </a>
      </footer>
    </div>
  )
}

