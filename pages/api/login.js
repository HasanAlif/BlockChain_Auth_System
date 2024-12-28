import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

const secretKey = process.env.secretKey;

async function handler(req, res) {
    console.log(req.body);
  const { signedMessage, nonce, address } = req.body;
  const recoveredAddress = ethers.utils.verifyMessage(nonce, signedMessage);
  console.log(recoveredAddress);
  if (recoveredAddress !== address) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  
  const token = jwt.sign({ address }, secretKey, { expiresIn: '360s' });
  console.log(token);

  
  res.status(200).json({ token });
}

export default handler;