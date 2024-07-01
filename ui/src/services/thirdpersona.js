import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

export default class ThirdPersona {
    static sdk = new CoinbaseWalletSDK({
        appName: 'Third Persona',
        appLogoUrl: 'https://example.com/logo.png',
        appChainIds: [84532],
    });
    
    static provider = ThirdPersona.sdk.makeWeb3Provider();
    
    async getAccount() {
        try {
            const [address] = await ThirdPersona.provider.request({
                method: 'eth_requestAccounts',
                // method: 'eth_Accounts',
                
            });
            console.log(address);
            await this.logUser(address);
            return address;
        } catch (error) {
            console.error(error);
        }        

        return '';
    }

    async logUser(user) {
        const url = 'https://scrawny-machine-rhythmic.functions.on-fleek.app';

        try {
            await fetch(url, {
                method: "POST",
                body: JSON.stringify({ user, date: (new Date()).toISOString() })
            })
        } catch (err) {
            console.error(err)
        }

        return {};
    }

    async getUsers() {
        const url = 'https://hollow-belgium-quiet.functions.on-fleek.app';

        try {
            return (await fetch(url)).json()
        } catch (err) {
            console.error(err)
        }

        return [];
    } 

    async logEvent(name, eventType, user) {
        const url = 'https://slow-art-early.functions.on-fleek.app';

        try {
            await fetch(url, {
                method: "POST",
                body: JSON.stringify({ 
                    name,
                    user, 
                    eventType,                    
                    date: (new Date()).toISOString() 
                })
            })
        } catch (err) {
            console.error(err)
        }

        return {};
    }

    async getEvents() {
        const url = 'https://loud-art-tiny.functions.on-fleek.app';

        try {
            return (await fetch(url)).json()
        } catch (err) {
            console.error(err)
        }

        return [];
    }

    async getEventsByType(eventType) {
        let events = await this.getEvents();
                 
        events = events?.filter(e => e.eventType === eventType);

        return events;
    }
}