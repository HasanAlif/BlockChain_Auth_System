import Link from 'next/link';
import styles from '../styles/styles.module.css';
import { useEffect, useState } from 'react';
import {ethers} from 'ethers';

function Homepage(){
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  useEffect(() => {
    setIsMetamaskInstalled(!!window.ethereum);
  }, []);


  async function handleMetamaskLogin() {
    
  }


  return (
    <div className={styles.container}>
      <h1>Welcome to my site!</h1>
      <p>Please select an option below to continue:</p>
      <div>
      <button className={styles.btn} onClick={handleMetamaskLogin}>Login with Metamask</button>
      <br />
      <br />
    </div>
        <Link href="/signup">
          <button className={styles.btn}>Signup</button>
        </Link>
      </div>
  );
}

export default Homepage;