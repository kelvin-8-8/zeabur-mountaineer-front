import React, { useState, useEffect } from 'react'
import { getYourOrder } from '../services/orderService';

export default function Order() {

    const ROLE_LABELS = {
        "ROLE_GUEST": "會員",
        "ROLE_MEMBER": "隊員",
        "ROLE_ADMIN": "管理員"
    };

    const STATUS_LABELS = {
        "STATUS_WAIT": "待審核",
        "STATUS_CANCEL": "已取消",
        "STATUS_SUCCESS": "待領取",
        "STATUS_BORROW": "出借中",
        "STATUS_COMPLETE": "已歸還"
    };

    const [orders, setOrders] = useState([]);
    const [filterOrder, setFilterOrder] = useState(orders);
    const [status, setStatus] = useState("ALL");

    const loadOrders = async () => {
        try {
            const result = await getYourOrder();
            setOrders(result.data);
            setFilterOrder(result.data);

            console.log(filterOrder);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        if (status === 'ALL') {
            setFilterOrder(orders);
        } else {
            setFilterOrder(orders.filter((item) => item.status === status));
        }
    }, [status, orders])

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='justify-center items-center content-center max-w-screen-xl'>
                <div className="card p-4 bg-base-100 rounded-md flex flex-wrap flex-row justify-center gap-6">
                    <input type="button" value="All" className="btn btn-md" />
                    <input type="button" value="待審核" className="btn btn-md" />
                    <input type="button" value="已取消" className="btn btn-md" />
                    <input type="button" value="待領取" className="btn btn-md" />
                    <input type="button" value="出借中" className="btn btn-md" />
                    <input type="button" value="已歸還" className="btn btn-md" />
                </div>

                <div className="divider"></div>


                <div className='text-center min-h-800px'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Items</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {/* body */}
                            <tbody>
                                {/* row 1 */}
                                {
                                    filterOrder.map((item) => (
                                        <tr className='hover' key={item.id}>
                                            <th>{item.id}</th>
                                            <td>{item.startDate}</td>
                                            <td>{new Date(new Date(item.startDate).getTime() + item.duration * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}</td>
                                            <td>{item.user.username}&nbsp;({item.user.trueName})<br />{ROLE_LABELS[item.user.role] || item.user.role}</td>
                                            <td>{STATUS_LABELS[item.status] || item.status}</td>
                                            <td>{item.items.map((subItem) => (
                                                <div className="flex justify-between min-w-32" key={subItem.id}>
                                                    <span className="text-left">{subItem.equipment.name}</span>
                                                    <span className="text-right"> x {subItem.quantity}</span>
                                                </div>
                                            ))}
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
