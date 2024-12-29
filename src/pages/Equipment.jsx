import React, {useState,useEffect} from 'react'
import { isLogin } from '../services/authService';
import { getAllEquipment } from '../services/equipmentService';

export default function Equipment( {addToCart} ) {

    const [equips, setEquips] = useState([
        {
			"id": 1,
			"name": "犀牛 U300",
			"price": 30,
			"type": "TENT",
			"description": "4人帳",
			"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734938034/zkynxss8xchmuf8hmpsz.png"
		},
		{
			"id": 2,
			"name": "犀牛 X4",
			"price": 30,
			"type": "TENT",
			"description": "4人帳",
			"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734953660/aa9nwygubtgsy3b8uayc.png"
		},
		{
			"id": 3,
			"name": "犀牛 G33",
			"price": 10,
			"type": "TENT",
			"description": "3人帳",
			"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734953902/louk7oilyyxubwmrkppd.png"
		},
		{
			"id": 4,
			"name": "MSR Elixir",
			"price": 150,
			"type": "TENT",
			"description": "4人帳",
			"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734957271/ho6y9nry4mr574nxliwt.png"
		}
	]);

    const [filterEquip, setFilterEquip] = useState(equips);
    const [type, setType] = useState("ALL");

    //獲取所有裝備
    const loadProducts = async () => {
        try {
            const result = await getAllEquipment(); 
            setEquips(result.data);
            setFilterEquip(result.data);
            
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        
        if (type === 'ALL') {
            setFilterEquip(equips);
        } else {
            setFilterEquip(equips.filter((item) => item.type === type));
        }
        

    }, [type, equips])

    const handleAddToCart = async (item, quantity) => {
        
        try {
            const loginResponse = await isLogin();
            console.log(loginResponse);
            
        } catch {
            alert("請先登入")
            console.error("登入狀態檢查失敗", error, loginResponse);
        }

        console.log(item, quantity);
        if (quantity > 0) {
            addToCart({ id: item.id, name: item.name, price: item.price, quantity });
        }
    };


    return (

        <div className='flex flex-col items-center justify-center '>
            <div className='justify-center items-center content-center max-w-screen-xl'>
                {/* 篩選 */}
                <div className="card p-4 bg-base-100 rounded-md flex flex-wrap flex-row justify-center gap-6">
                    <input type="button" value="All" className="btn btn-md" onClick={() => setType('ALL')}/>
                    <input type="button" value="背包" className="btn btn-md" onClick={() => setType('BACKPACK')}/>
                    <input type="button" value="帳篷" className="btn btn-md" onClick={() => setType('TENT')}/>
                    <input type="button" value="睡袋" className="btn btn-md" onClick={() => setType('SLEEPING_BAG')}/>
                    <input type="button" value="其他" className="btn btn-md" onClick={() => setType('ELSE')}/>
                </div>

                <div className="divider"></div>

                {/* 裝備 */}
                <div className='min-h-800px'>
                    <div className='flex flex-row flex-wrap justify-center gap-6 align-center p-4 mt-4 '>

                    {/* Card樣式 */}
                    {filterEquip.map( (item) => (
                        <div key={item.id} className="card card-side bg-base-100 shadow-xl">
                            <figure>
                                <img 
                                    className='max-h-40 max-w-16'
                                    src={item.url} 
                                    alt="missing" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>$ {item.price}/day</p>
                                <p>{item.description}</p>
                                <div className="card-actions justify-between">
                                    <input type="number" placeholder="amount" className="input input-bordered input-sm max-w-24 mr-6" min="1"
                                    id={`equip-${item.id}`}/>
                                    <button className="btn btn-sm btn-primary" 
                                            onClick={ () =>
                                            handleAddToCart( item, parseInt(document.getElementById(`equip-${item.id}`).value) || 0)}
                                    >add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>

    )
}