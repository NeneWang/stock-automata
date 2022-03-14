import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import StockTable from '../components/StockTable'
import SettingToggler from '../components/SettingToggler'
import Button from '@mui/material/Button';
import { CSVLink } from "react-csv";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SelectTableToLoad from '../components/SelectTableToLoad'



export default function Home() {




  const [stocks, setStocks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [popMessage, setPopMessage] = useState("");
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


  const openSnackBar = (message) => {
    setPopMessage(message)
    setOpen(true);
  };


  const runInitState = () => {
    fetch('http://127.0.0.1:8000/api/stock/save/getids').then((res) => res.json()).then((data) => {
      setTablesData([...data]);
    })
  }
  const onTableSelected = (event) => {
    let tableSelectedID = event.target.value
    if (tableSelectedID > 0) {
      fetch(`http://127.0.0.1:8000/api/stock/save/load/${tableSelectedID}`).then((res) => res.json()).then((data) => {
        // console.log(data)
        setSettings(data["settings"]);
        // console.log(data["stocks"])
        setTableTitle(data["name"])
        // loop for each and add the stocks and add them
        // data["stocks"].forEach(stockName => {
        //   addStock(stockName)
        //   setTimeout(() => { console.log("ok")}, 2000);

        //   // delay(100)
        // })
      })

    }


  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
    event.preventDefault()


    const symbol = events.target.symbol.value.toUpperCase();

    events.target.reset();
    addStock(symbol)


  }

  function addStock(symbol) {
    fetch(`http://127.0.0.1:8000/api/stock/smartget/stocksymbol/${symbol}`).then((res) => res.json()).then((data) => {

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
        onClick={handleClose}
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

      <main className={styles.main}>
        <h1 className={styles.title}>
          Stock Automata
        </h1>

        <p className={styles.description}>
          {tableTitle}
        </p>
        <form onSubmit={formSubmitHandle}>

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
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
      </main>

      <CSVLink className='btn btn-outline-primary' data={getCsvPreparedStocksData()}>Download as CSV</CSVLink>
      {/* <Button onClick={getCsvPreparedStocksData} >Get CSV</Button> */}

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

