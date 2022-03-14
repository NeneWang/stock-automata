import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import StockTable from '../components/StockTable'
import SettingToggler from '../components/SettingToggler'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export default function Home() {

  const [stocks, setStocks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [popMessage, setPopMessage] = useState("");

  const openSnackBar = (message) => {
    setPopMessage(message)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // const inputChange = 

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


  function toggleSetting(settingName) {
    let newSetting = Object()
    newSetting[settingName] = !settings[settingName]
    setSettings({ ...settings, ...newSetting })
    return false
  }

  function addStock(events) {
    event.preventDefault()


    const symbol = events.target.symbol.value.toUpperCase();
    
    events.target.reset();


    fetch(`http://127.0.0.1:8000/api/stock/smartget/stocksymbol/${symbol}`).then((res) => res.json()).then((data) => {

      if (data["stock_stat"] == "FALSE") {
        console.log("hmmm... I don't think that symbol name is correct")
      }
      if (data["stock_stat"] == "RESEARCHING") {
        console.log("Stock under research, it will be available next iteration")
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
          Untitled Save
        </p>
        <form onSubmit={addStock}>

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={popMessage}
            action={action}
          />
          <input type="text" name='symbol' class="form-control" placeholder="Enter Stock Symbol" />
          {
            settings && Object.keys(settings).map(setting =>

              <SettingToggler settings={settings} setting={setting} toggleSetting={toggleSetting} />

            )
          }
{/* 
          <div class="input-group-append">
            <button type="submit" class="btn btn-outline-secondary" >Add Stock</button>
          </div> */}
        </form>
        <StockTable stocks={stocks} settings={settings} />
      </main>


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
