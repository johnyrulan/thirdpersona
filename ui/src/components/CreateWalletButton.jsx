import React, { useCallback, useEffect, useState } from 'react';
import ThirdPersona from '../services/thirdpersona';
// import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
 
const buttonStyles = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 200,
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: 18,
  backgroundColor: '#0052FF',
  paddingLeft: 15,
  paddingRight: 30,
  borderRadius: 10,
};
 
export function CreateWalletButton({ title, handleSuccess, handleError }) {
  const thirdPersona = new ThirdPersona();

  const [wallet, setWallet] = useState('')

  const createWallet = useCallback(async () => {
    await getWallet();
  }, [handleSuccess, handleError]);

  async function getWallet() {
    const address = await thirdPersona.getAccount();
    setWallet(address)
  }

  useEffect(() => {
    // getWallet()
  }, [])
 
  return (
    <button className='rounded-xl  
      transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-115 hover:bg-indigo-500 duration-300
      px-3 py-2 
      font-bold text-white' onClick={createWallet}>
      {/* <CoinbaseWalletLogo /> */}
      { wallet ? wallet : title }
    </button>
  );
}