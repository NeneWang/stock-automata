import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import StockTable from '../components/StockTable'
import SettingToggler from '../components/SettingToggler'



export default function Home() {

  const [stocks, setStocks] = useState([]);
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
    console.log("add stock pressedn???")
    event.preventDefault()


    const symbol = events.target.symbol.value;
    let newInformation = { "id": 1, "symbol": "FB", "data": "{\"Previous Close\":\"195.21\",\"Open\":\"192.63\",\"Bid\":\"186.99 x 900\",\"Ask\":\"187.00 x 800\",\"Days range\":\"186.67 - 193.56\",\"52 Week range\":\"186.11 - 384.33\",\"Volume\":\"34,694,534\",\"Avg. Volume\":\"34,323,913\",\"Market Cap\":\"510.663B\",\"Beta (5Y Monthly)\":\"1.39\",\"PE Ratio (TTM)\":\"13.62\",\"EPS (TTM)\":\"13.77\",\"Earnings Date\":\"Apr 26, 2022\",\"Forward Divident & Yield\":\"N\\\/A (N\\\/A)\",\"Ex-Dividend Date\":\"N\\\/A\",\"1y Target Est\":\"326.15\",\"symbol\":\"FB\"}", "created_at": null, "updated_at": "2022-03-14T03:23:35.000000Z" }
    newInformation = { newInformation, ...JSON.parse(newInformation.data) };
    let newStockInfo = Object()
    newStockInfo[symbol] = newInformation;

    setStocks([...stocks, newStockInfo])

  }




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
          <input type="text" name='symbol' class="form-control" placeholder="Enter Stock Symbol" />
          {
            settings && Object.keys(settings).map(setting =>

              <SettingToggler settings={settings} setting={setting} toggleSetting={toggleSetting} />

            )
          }

          <div class="input-group-append">
            <button type="submit" class="btn btn-outline-secondary" >Add Stock</button>
          </div>
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
