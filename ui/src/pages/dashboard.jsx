import { useEffect, useState } from "react";
import ThirdPersona from "../services/thirdpersona";


const TableOption = {
    Users: "Users",
    Events: "Events",
    Purchases: "Purchases"
}

const Dashboard = () => {

    const thirdPersona = new ThirdPersona();

    const [selectedTable, setSelectedTable] = useState(TableOption.Users)

    const usersTableColumns = ["Wallet Address", "Timestamp"]
    const eventsTableColumns = ["Event Name", "Event Type", "User", "Timestamp"]
    const purchasesTableColumns = ["Name", "User", "Timestamp"]
    
    const [selectedColumns, setSelectedColumns] = useState(usersTableColumns);

    const [tableData, setTableData] = useState([])

    const [users, setUsers] = useState([])
    const [events, setEvents] = useState([])
    const [purchases, setPurchases] = useState([])    
    
    async function setData() {
        const currUsers = await thirdPersona.getUsers();
        const currEvents = await thirdPersona.getEvents();
        const currPurchases = await thirdPersona.getEventsByType("Purchase");

        setUsers(currUsers);
        setEvents(currEvents);
        setPurchases(currPurchases);
    }

    useEffect(() => {
        setData()
    }, [])

    function selectTable(option) {
        if (option === TableOption.Users) {
            setSelectedTable(TableOption.Users);
            setSelectedColumns(usersTableColumns);
            setTableData(users)
        }

        if (option === TableOption.Events) {
            setSelectedTable(TableOption.Events);
            setSelectedColumns(eventsTableColumns);
            setTableData(events)
        }

        if (option === TableOption.Purchases) {
            setSelectedTable(TableOption.Purchases);
            setSelectedColumns(purchasesTableColumns);
            setTableData(purchases)
        }
    }

    return (
        <div className="flex-1 bg-gray-100 min-h-screen pb-10">
            <div className="w-3/4 mx-auto px-2 space-y-4">
                <header className="bg-gray-800 rounded-b-3xl shadow px-6 py-4 flex flex-row justify-between space-x-2">
                    <a href="/" className="text-3xl text-white font-bold">ThirdPersona</a>
                    <div className="flex flex-row items-center space-x-2">
                        <div className="text-white font-bold text-xl italic">Built with</div>
                        <img src="https://fleek.xyz/svg/fleek-logo.svg" alt="" />
                    </div>
                </header>   
                <div className="bg-white flex-1 p-8 border rounded-xl shadow">
                    <p className="text-gray-600">
                        ThirdPersona is a web3 analytics tool (like Mixpanel for web3) that that works seamlessly with SmartWallets & the web3 experience. ThirdPersona is built on the Fleek Platform utilizing Fleek Functions for its backend.
                    </p>

                    <div className="flex flex-row space-x-1 my-3">
                        <a href="/example/product" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                            Go to Example Product Page
                        </a>
                    </div>
                </div>                
                <div className="flex flex-row space-x-2">
                    <div className="bg-white flex-1 p-8 border rounded-xl shadow">
                        <h1 className="font-bold text-gray-500 text-lg">Total Visitors</h1>
                        <h2 className="font-bold text-2xl">{ users.length }</h2>
                    </div>
                    <div className="bg-white flex-1 p-8 border rounded-xl shadow">
                        <h1 className="font-bold text-gray-500 text-lg">Total Events</h1>
                        <h2 className="font-bold text-2xl">{ events.length }</h2>                        
                    </div>
                    <div className="bg-white flex-1 p-8 border rounded-xl shadow">
                        <h1 className="font-bold text-gray-500 text-lg">Total Purchases</h1>
                        <h2 className="font-bold text-2xl">{ purchases.length }</h2>      
                    </div>                                                          
                </div>     

                
                <div className="flex flex-row space-x-2">
                    <button className={`px-4 py-2 rounded-full ${selectedTable === TableOption.Users ? 'bg-blue-500 font-bold text-white' : ''}`} onClick={() => { selectTable(TableOption.Users) }}>Users</button>
                    <button className={`px-4 py-2 rounded-full ${selectedTable === TableOption.Events ? 'bg-blue-500 font-bold text-white' : ''}`} onClick={() => { selectTable(TableOption.Events) }}>Events</button>
                    <button className={`px-4 py-2 rounded-full ${selectedTable === TableOption.Purchases ? 'bg-blue-500 font-bold text-white' : ''}`} onClick={() => { selectTable(TableOption.Purchases) }}>Purchases</button>
                </div>                       

                <div className="bg-white flex-1 p-8 border rounded-xl shadow">
                    <h1 className="font-bold text-gray-500 text-lg">Total {selectedTable}</h1>
                    <table className="w-full odd:bg-gray-300 mt-4">
                        <thead>
                            <tr className="table-header rounded-xl">
                                {
                                    selectedColumns.map((c, i) => (
                                        <td key={i} className="border p-4">{c}</td>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (selectedTable === TableOption.Users) && 
                                users.map((u, i) => (
                                    <tr key={i}>
                                        <td className="border p-4">{ u.user }</td>
                                        <td className="border p-4">{ u.date }</td>                                        
                                    </tr>
                                ))
                            }

                            {
                                (selectedTable === TableOption.Events) && 
                                events.map((e, i) => (
                                    <tr key={i}>
                                        {
                                            (e.name.startsWith('https://')) ?
                                            <td className="border p-4">
                                                <img src={e.name} className="w-24 h-24"></img>
                                            </td>
                                            :
                                            <td className="border p-4">{ e.name }</td>
                                        }                                        
                                        <td className="border p-4">{ e.eventType }</td>
                                        <td className="border p-4">{ e.user }</td>
                                        <td className="border p-4">{ e.date }</td>
                                    </tr>
                                ))
                            }   
                            
                            {
                                (selectedTable === TableOption.Purchases) && 
                                purchases.map((p, i) => (
                                    <tr key={i}>
                                        <td className="border p-4">{ p.name.replace('Purchased', '') }</td>                                    
                                        <td className="border p-4">{ p.user }</td>
                                        <td className="border p-4">{ p.date }</td>
                                    </tr>
                                ))
                            }                                                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;