import { useEffect, useState } from "react";
import { CreateWalletButton } from "../components/CreateWalletButton";
import ThirdPersona from "../services/thirdpersona";

const Product = () => {
    const images = [
        "https://jcpenney.scene7.com/is/image/JCPenney/DP0504202307535693M?hei=1500&wid=1500&op_usm=.4%2C.8%2C0%2C0&resmode=sharp2&op_sharpen=1",
        "https://slimages.macysassets.com/is/image/MCY/products/5/optimized/20337865_fpx.tif?op_sharpen=1&wid=1200&fit=fit,1&$filtersm$&fmt=webp",
        "https://jcpenney.scene7.com/is/image/JCPenney/DP0504202307535590M?hei=1500&wid=1500&op_usm=.4%2C.8%2C0%2C0&resmode=sharp2&op_sharpen=1",
        "https://slimages.macysassets.com/is/image/MCY/products/4/optimized/20337864_fpx.tif?op_sharpen=1&wid=1200&fit=fit,1&$filtersm$&fmt=webp",
        "https://jcpenney.scene7.com/is/image/JCPenney/DP0215202409171421M?hei=1500&wid=1500&op_usm=.4%2C.8%2C0%2C0&resmode=sharp2&op_sharpen=1"    
    ];

    const [selectedImg, setSelectedImg] = useState(images[0])

    const [isSignedIn, setIsSignedIn] = useState(false)

    const [isPurchased, setIsPurchased] = useState(false)

    const thirdPersona = new ThirdPersona();
    
    useEffect(() => {
        console.log(thirdPersona)
        // ThirdPersona.provider.on('accountsChanged', () => {
        //     setIsSignedIn(true)
        // })
        ThirdPersona.provider.on('connect', () => {
            setIsSignedIn(true)
        })
    }, [])

    async function purchase() {
        setIsPurchased(true); 
        thirdPersona.logEvent("Purchased Relaxed Fit Jeans", "Purchase", await thirdPersona.getAccount())
    }

    return (
        <div className="flex-1">
            <div className="w-3/4 mx-auto px-2">
                <header className="py-2 border-b border-gray-200 px-4 py-4  flex flex-row justify-between items-center">
                    <a href="/" className="font-bold text-3xl">Web3Store</a>
                    <div>
                        <CreateWalletButton title='Connect Wallet (15% Off)'/>
                    </div>
                </header>

                <div className="flex flex-row space-x-4">
                    <div className="w-1/2">
                        <img src={selectedImg} className="w-full" style={{ aspectRatio: 1 }}/>
                        <div className="flex flex-row items-center gap-2 flex-wrap mt-4">
                            {
                                images.map((i, index) => (
                                    <div key={index} className="w-20 h-20 cursor-pointer" onClick={() => { setSelectedImg(i) }}>
                                        <img className="w-20 h-20" src={i}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="pt-6">
                        <h2 className="font-bold text-2xl">Men's Relaxed Fit Tapered Blue Jeans</h2>
                        <p className="text-gray-500 italic">
                            A comfortable classic, introduced in 1985 and loved ever since. After the '70s were over, things got more relaxed, including levi's® jeans. Our 550™ relaxed fit features extra room throughout with a slight, tailor-like taper at the leg.
                        </p>
                        <h3 className="font-bold text-xl">$69.99</h3>
                        <div className="mt-4">
                            {
                                !isSignedIn &&
                                <button className="px-4 py-3 rounded-xl bg-orange-600 text-white font-bold" disabled>
                                    Sign In to Purchase Product
                                </button>
                            }
                            {
                                (isSignedIn && !isPurchased) &&
                                <button className="px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold"
                                    onClick={purchase}
                                >
                                    Purchase Product
                                </button>                                
                            }

                            {
                                isPurchased &&
                                <button className="px-4 py-3 rounded-xl bg-lime-500 text-white font-bold">
                                    🎉 Congrats! You've successfully purchased the product
                                </button>                                
                            }                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Product;

const style = {
    // backgroundColor: 'blue',
    width: '100%',
    height: '100vh',
    margin: 0,
    padding: 0
}