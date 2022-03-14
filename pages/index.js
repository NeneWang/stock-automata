import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'


export default function Home() {

  const [stocks, setStocks] = useState({});

  function addStock(events) {
    const newStockList = stocks;
    // newStockList[symbol] = {}
    // setStocks(newStockList)
    // // setStocks(stocks.push({ "symbol": 'sadsa'}))
    // console.log((stocks))
    event.preventDefault()
    const symbol = events.target.symbol.value;
    console.log()
    stocks[symbol] = [{ "id": 1, "symbol": "FB", "data": "{\"Previous Close\":\"195.21\",\"Open\":\"192.63\",\"Bid\":\"186.99 x 900\",\"Ask\":\"187.00 x 800\",\"Days range\":\"186.67 - 193.56\",\"52 Week range\":\"186.11 - 384.33\",\"Volume\":\"34,694,534\",\"Avg. Volume\":\"34,323,913\",\"Market Cap\":\"510.663B\",\"Beta (5Y Monthly)\":\"1.39\",\"PE Ratio (TTM)\":\"13.62\",\"EPS (TTM)\":\"13.77\",\"Earnings Date\":\"Apr 26, 2022\",\"Forward Divident & Yield\":\"N\\\/A (N\\\/A)\",\"Ex-Dividend Date\":\"N\\\/A\",\"1y Target Est\":\"326.15\",\"symbol\":\"FB\"}", "created_at": null, "updated_at": "2022-03-14T03:23:35.000000Z" }]
    
    // fetch('https://admin.brooklynslcouncil.com/public/api/events-calendar').then((res) => res.json()).then((data) => {
    //   setData(data);
    //   // console.log(data);
    //   appendEvents(events, data)


    // })

  }

  // useEffect(() => {

  // }, []

  // )



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
          <div class="input-group-append">
            <button type="submit" class="btn btn-outline-secondary" >Add Stock</button>
          </div>
        </form>

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {/* <p>
              {stocks}
            </p>
            {Object.keys(stocks).forEach(function (idx) {
              <tr key={idx}>
                <th scope="row">1</th>
                <td>Mark</td>
              </tr>
            })} */}


            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
            </tr>
          </tbody>
        </table>

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
