import React, { useState, useEffect } from 'react'
import { getAllEquipment, changeEquipment, deleteEquipment } from '../services/equipmentService';
import { addEquipment } from '../services/equipmentService';
import axios from 'axios';

export default function CreateEquipment() {

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

    // 初始化
    const loadEquipment = async () => {
        try {
            const result = await getAllEquipment();
            setEquips(result.data);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    useEffect(() => {
        loadEquipment();
    }, [])

    // 篩選
    useEffect(() => {
        if (type === 'ALL') {
            setFilterEquip(equips);
        } else {
            setFilterEquip(equips.filter((item) => item.type === type));
        }
    }, [type, equips])

    // 修改
    const updateEquipment = async (updatedItem) => {

        console.log("準備傳給後端的更正資料", updatedItem);
        try {
            const response = await changeEquipment(updatedItem);
            console.log("Update successful:", response.data);
            loadEquipment(); // 更新後重新載入資料
        } catch (error) {
            console.error("Error updating equipment:", error);
        }
    };

    // 刪除
    const updateDeleteEquipment = async (deleteItem) => {

        console.log("準備傳給後端的刪除資料", deleteItem);
        try {
            const response = await deleteEquipment(deleteItem);
            console.log("Delete successful:", response.data);
            loadEquipment(); // 更新後重新載入資料
        } catch (error) {
            console.error("Error deleting equipment:", error);
        }
    }

    // 新增
    // 上傳圖片
    const [image, setImage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleFileChange = (files) => {
        if (files[0]) {
            const file = files[0];
            setSelectedFile(file);
            // 創建預覽 URL
            console.log(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // 上傳圖片
    const uploadImage = () => {

        if (!selectedFile) {
            alert("請先選擇一張圖片！");
            return;
        }
        console.log(selectedFile);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "cloudineer");
        formData.append("cloud_name", "duco3iisc")

        axios
            .post("https://api.cloudinary.com/v1_1/duco3iisc/image/upload", formData)
            .then((response) => {
                setImage(response.data.url);
                console.log(response);
                console.log(response.data.url);
                console.log(image);

            })
            .catch((error) => {
                console.error("上傳圖片時發生錯誤：", error);
            });
    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [newType, setNewType] = useState("");

    useEffect( () => {
        if (!image) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
        
    }, [image])

    const handleCreate = async (e) => {
        e.preventDefault();

        if(!image) {
            setShowAlert(true);
            return
        }
        

        const addItem = {
            name,
            description,
            price: parseInt(price, 10),
            type,
            image, // 圖片 URL
        };

        console.log(addItem);
        

        // try {
        //     const response = await addEquipment(addItem);
        //     console.log("新增成功", response.data);
        //     loadEquipment(); // 更新資料
        //     document.getElementById("create_modal").close(); // 關閉 modal
        // } catch {
        //     console.error("新增失敗", error);
        // }
    }
    


    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='justify-center items-center content-center max-w-screen-xl'>
                <div className="card p-4 bg-base-100 rounded-md flex flex-wrap flex-row justify-center gap-6">
                    <input type="button" value="All" className="btn btn-md" onClick={() => setType('ALL')} />
                    <input type="button" value="背包" className="btn btn-md" onClick={() => setType('BACKPACK')} />
                    <input type="button" value="帳篷" className="btn btn-md" onClick={() => setType('TENT')} />
                    <input type="button" value="睡袋" className="btn btn-md" onClick={() => setType('SLEEPING_BAG')} />
                    <input type="button" value="其他" className="btn btn-md" onClick={() => setType('ELSE')} />
                    <input type="button" value="+ Add new Equipment" className="btn btn-md" onClick={() => document.getElementById('create_modal').showModal()} />
                </div>

                {/* 分隔 */}
                <div className="divider"></div>
                {/* 分隔 */}

                {/* 表格部分 */}
                <div className='text-center min-h-800px'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>name</th>
                                    <th>description</th>
                                    <th>price</th>
                                    <th>type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {/* body */}
                            <tbody>
                                {/* row 1 */}
                                {filterEquip.map((items) => (
                                    <tr className='hover'>
                                        <th>{items.id}</th>
                                        <td>{items.name}</td>
                                        <td>{items.description}</td>
                                        <td>{items.price}</td>
                                        <td>{items.type}</td>
                                        <td>
                                            {/* 編輯按鈕 */}
                                            <input type="button" value="EDIT" className="btn btn-outline btn-success btn-sm" onClick={() => document.getElementById(`editmodal-${items.id}`).showModal()} />
                                            {/* Modal 編輯*/}
                                            <dialog id={`editmodal-${items.id}`} className="modal" >
                                                <div className="modal-box w-7/12 md:max-w-5xl">
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault();

                                                        const updatedItem = {
                                                            id: items.id,
                                                            name: e.target.name.value,
                                                            description: e.target.description.value,
                                                            price: parseInt(e.target.price.value, 10),
                                                            type: e.target.type.value
                                                        };
                                                        updateEquipment(updatedItem);
                                                        document.getElementById(`editmodal-${items.id}`).close();
                                                    }}>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th className='pl-6'>name</th>
                                                                    <th>description</th>
                                                                    <th>price</th>
                                                                    <th className='pl-6'>type</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {/*  */}
                                                                    <th>
                                                                        <input type="text" name="id" placeholder={items.id} value={items.id} className="input input-ghost input-xs max-w-10" disabled />
                                                                    </th>
                                                                    <th>
                                                                        <input type="text" name="name" placeholder={items.name} defaultValue={items.name} className="input input-ghost input-xs max-w-24" />
                                                                    </th>
                                                                    <th>
                                                                        <input type="text" name="description" placeholder={items.description}
                                                                            defaultValue={items.description} className="input input-ghost input-xs max-w-20" />
                                                                    </th>
                                                                    <th>
                                                                        <input type="text" name="price" placeholder={items.price}
                                                                            defaultValue={items.price} className="input input-ghost input-xs max-w-12" />
                                                                    </th>
                                                                    <th>
                                                                        <select className="select select-xs max-w-24 max-w-xs" name="type" defaultValue={items.type}>
                                                                            <option disabled selected value="">Select a type</option>
                                                                            <option value="BACKPACK">BACKPACK</option>
                                                                            <option value="TENT">TENT</option>
                                                                            <option value="SLEEPING_BAG">SLEEPING_BAG</option>
                                                                            <option value="ELSE">ELSE</option>
                                                                        </select>
                                                                    </th>
                                                                    <th>
                                                                        <input type="submit" value="SEND" className='btn btn-xs btn-outline btn-success md:btn-xs"' />
                                                                    </th>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </form>

                                                </div>
                                                <form method="dialog" className="modal-backdrop">
                                                    <button>close</button>
                                                </form>
                                            </dialog>
                                            {/* 刪除按鈕 */}
                                            <input type="button" value="DELETE" className="btn btn-outline btn-error btn-sm mx-2" onClick={() => document.getElementById(`deletemodal-${items.id}`).showModal()} />
                                            {/* Modal 刪除*/}
                                            <dialog id={`deletemodal-${items.id}`} className="modal">
                                                <div className="modal-box max-w-xs">
                                                    <h3 className="font-bold text-lg">你確定要刪除 &nbsp; <br /><span className='text-error'>{items.name}</span>？</h3>
                                                    <div className='flex flex-row justify-start space-x-28'>
                                                        <p className="py-4">按 ESC 離開</p>
                                                        <input type="button" value="DELETE" className='self-center btn btn-outline btn-sm btn-error'
                                                            onClick={() => {

                                                                const deleteItem = {
                                                                    id: items.id,
                                                                    name: items.name,
                                                                    description: items.description,
                                                                    price: parseInt(items.price),
                                                                    type: items.type
                                                                };
                                                                updateDeleteEquipment(deleteItem);
                                                                document.getElementById(`deletemodal-${items.id}`).close();
                                                            }} />
                                                    </div>

                                                </div>
                                                <form method="dialog" className="modal-backdrop">
                                                    <button>close</button>
                                                </form>
                                            </dialog>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* 新增裝備 modal */}
            <dialog id="create_modal" className="modal">
                <div className="modal-box">
                    <div className='flex flex-col items-center justify-center'>
                        <h3 className="font-bold text-2xl mb-8">新增裝備</h3>
                        {/* 圖片預覽區域 */}
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="預覽圖片"
                                className="max-h-96 max-w-96"
                            />
                        )}
                        <div className='flex flex-row items-center justify-center mt-12'>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={(e) => handleFileChange(e.target.files)} />
                            <button className="btn btn-outline btn-primary ml-6" onClick={uploadImage}>上傳圖片</button>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className='flex flex-col items-center justify-center'>
                        <input
                            type="text"
                            placeholder="name"
                            className="input input-bordered input-md mb-6 w-full max-w-xs"
                            onChange={(e) => setName(e.target.value)}/>
                        <input
                            type="text"
                            placeholder="description"
                            className="input input-bordered input-md mb-6 w-full max-w-xs"
                            onChange={(e) => setDescription(e.target.value)}/>
                        <input
                            type="text"
                            placeholder="price"
                            className="input input-bordered input-md mb-6 w-full max-w-xs" 
                            onChange={(e) => setPrice(e.target.value)}/>
                        <select className="select max-w-24 max-w-xs mb-6" name="type" onChange={(e) => setNewType(e.target.value)}>
                            <option disabled selected value="">Select a type</option>
                            <option value="BACKPACK">BACKPACK</option>
                            <option value="TENT">TENT</option>
                            <option value="SLEEPING_BAG">SLEEPING_BAG</option>
                            <option value="ELSE">ELSE</option>
                        </select>
                        
                        <button className="btn btn-outline btn-success mb-6" onClick={handleCreate}>確認送出</button>
                        {showAlert && (
                            <div role="alert" className="alert alert-warning">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <span className='text-center'>警告！ 先上傳圖片，再按確認送出</span>
                            </div>
                        )}
                    </div>


                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}
