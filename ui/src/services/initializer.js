import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

export default function initializer() {
    const baseSepolia = 84532;

    const sdk = new CoinbaseWalletSDK({
        appName: 'ThirdPersona',
        appChainIds: [baseSepolia]
    })
}