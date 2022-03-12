import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
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

        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Enter Stock Symbol" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">Add Stock</button>
          </div>
        </div>

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
            </tr>
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
