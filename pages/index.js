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
    try {
      
      if (!isMetamaskInstalled) {
        throw new Error('Metamask is not installed');
      }

      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      
      const response = await fetch('/api/nonce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
      }
      const resp = await response.json();
      const nonce = resp.message;
      console.log(nonce);

      const signedMessage = await signer.signMessage(nonce);
      const data = { signedMessage, nonce, address };
      const authResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      let token = await authResponse.json();
      console.log(token);

      
      localStorage.setItem(address, token.token);

      
      window.location.href = '/protected-route';
    } catch (error) {
      console.error(error);
      alert('Failed to login with Metamask');
    }
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