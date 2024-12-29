import React, { useState, useEffect } from 'react'
import { confirmOrder, cancelOrder, getAllOrder } from '../services/orderService';

export default function OrderEquipment() {

  const ROLE_LABELS = {
    "ROLE_GUEST": "會員",
    "ROLE_MEMBER": "隊員",
    "ROLE_ADMIN": "管理員"
  };

  const STATUS_LABELS = {
    "STATUS_WAIT":"待審核",
    "STATUS_CANCEL":"已取消",
    "STATUS_SUCCESS":"待領取",
    "STATUS_BORROW":"出借中",
    "STATUS_COMPLETE":"已歸還"
  };

  const [orders, setOrders] = useState( [
		{
			"id": 1,
			"startDate": "2025-01-19",
			"duration": 6,
			"createdAt": "2024-12-26T00:20:01.175734",
			"status": "STATUS_WAIT",
			"user": {
				"id": 12,
				"username": "b",
				"password": "b",
				"trueName": "bbb",
				"email": "b@b",
				"role": "ROLE_GUEST",
				"createdAt": "2024-12-22T16:30:11"
			},
			"items": [
				{
					"id": 1,
					"quantity": 3,
					"equipment": {
						"id": 3,
						"name": "犀牛 G33",
						"price": 30,
						"type": "TENT",
						"description": "3人帳",
						"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734953902/louk7oilyyxubwmrkppd.png"
					}
				}
			]
		},
		{
			"id": 2,
			"startDate": "2025-01-01",
			"duration": 5,
			"createdAt": "2024-12-27T02:07:57.17161",
			"status": "STATUS_WAIT",
			"user": {
				"id": 12,
				"username": "b",
				"password": "b",
				"trueName": "bbb",
				"email": "b@b",
				"role": "ROLE_GUEST",
				"createdAt": "2024-12-22T16:30:11"
			},
			"items": [
				{
					"id": 2,
					"quantity": 1,
					"equipment": {
						"id": 4,
						"name": "MSR Elixir",
						"price": 150,
						"type": "TENT",
						"description": "4人帳",
						"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734957271/ho6y9nry4mr574nxliwt.png"
					}
				},
				{
					"id": 3,
					"quantity": 2,
					"equipment": {
						"id": 5,
						"name": "迪卡儂 MT500 Air",
						"price": 30,
						"type": "BACKPACK",
						"description": "50+10L",
						"url": "http://res.cloudinary.com/duco3iisc/image/upload/v1735131607/kcgfeeievkrxhncuwev9.png"
					}
				}
			]
		},
		{
			"id": 3,
			"startDate": "2025-01-12",
			"duration": 5,
			"createdAt": "2024-12-27T02:22:15.805962",
			"status": "STATUS_WAIT",
			"user": {
				"id": 12,
				"username": "b",
				"password": "b",
				"trueName": "bbb",
				"email": "b@b",
				"role": "ROLE_GUEST",
				"createdAt": "2024-12-22T16:30:11"
			},
			"items": [
				{
					"id": 4,
					"quantity": 1,
					"equipment": {
						"id": 1,
						"name": "犀牛 U300",
						"price": 30,
						"type": "TENT",
						"description": "4人帳",
						"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734938034/zkynxss8xchmuf8hmpsz.png"
					}
				},
				{
					"id": 5,
					"quantity": 2,
					"equipment": {
						"id": 6,
						"name": "迪卡儂 MT900",
						"price": 60,
						"type": "BACKPACK",
						"description": "70+10L",
						"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1735138691/tzdwfrbs2ikbadigfzho.png"
					}
				}
			]
		},
		{
			"id": 4,
			"startDate": "2025-01-10",
			"duration": 2,
			"createdAt": "2024-12-27T02:31:18.534501",
			"status": "STATUS_WAIT",
			"user": {
				"id": 11,
				"username": "a",
				"password": "a",
				"trueName": "Mr. a",
				"email": "a@a",
				"role": "ROLE_GUEST",
				"createdAt": "2024-12-16T00:29:40"
			},
			"items": [
				{
					"id": 6,
					"quantity": 1,
					"equipment": {
						"id": 2,
						"name": "犀牛 X4",
						"price": 30,
						"type": "TENT",
						"description": "4人帳",
						"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734953660/aa9nwygubtgsy3b8uayc.png"
					}
				}
			]
		},
		{
			"id": 5,
			"startDate": "2025-01-08",
			"duration": 2,
			"createdAt": "2024-12-27T16:18:40.368984",
			"status": "STATUS_WAIT",
			"user": {
				"id": 11,
				"username": "a",
				"password": "a",
				"trueName": "Mr. a",
				"email": "a@a",
				"role": "ROLE_GUEST",
				"createdAt": "2024-12-16T00:29:40"
			},
			"items": [
				{
					"id": 7,
					"quantity": 2,
					"equipment": {
						"id": 4,
						"name": "MSR Elixir",
						"price": 150,
						"type": "TENT",
						"description": "4人帳",
						"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1734957271/ho6y9nry4mr574nxliwt.png"
					}
				},
				{
					"id": 8,
					"quantity": 2,
					"equipment": {
						"id": 6,
						"name": "迪卡儂 MT900",
						"price": 60,
						"type": "BACKPACK",
						"description": "70+10L",
						"url": "https://res.cloudinary.com/duco3iisc/image/upload/v1735138691/tzdwfrbs2ikbadigfzho.png"
					}
				}
			]
		}
	]);
  const [filterOrder, setFilterOrder] = useState(orders);
  const [statusFilters, setStatusFilters] = useState(['STATUS_WAIT', 'STATUS_SUCCESS', 'STATUS_BORROW']);


  const loadOrders = async () => {
    try {
      const result = await getAllOrder();
      setOrders(result.data);
      setFilterOrder(result.data.filter((order) => !['STATUS_CANCEL', 'STATUS_COMPLETE'].includes(order.status)));
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    
    console.log(statusFilters.length);
    setFilterOrder(orders.filter((order) => statusFilters.includes(order.status)));
    
  }, [statusFilters, orders]);

  const handleStatusFilter = (status) => {
    setStatusFilters((prev) => {
      
      if (status === 'ALL') {
        return prev.length === 5 ? [] : ['STATUS_WAIT', 'STATUS_SUCCESS', 'STATUS_BORROW', 'STATUS_CANCEL', 'STATUS_COMPLETE'];
      }
      if (prev.includes(status)) {
        // 移除已存在的篩選條件
        return prev.filter((s) => s !== status);
      }
      // 新增篩選條件
      return [...prev, status];
    });
  };

  const handleApprove = async(orderId) => {
    try {
      const response = await confirmOrder(orderId);

      loadOrders();
    } catch (error) {
      console.error("Error approve order:", error);
    }
  }

  const handleDismiss = async(orderId) => {
    try {
      const response = await cancelOrder(orderId);

      loadOrders()
    } catch (error) {
      console.error("Error dismiss order:", error);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='justify-center items-center content-center max-w-screen-xl'>
        <div className="card p-4 bg-base-100 rounded-md flex flex-wrap flex-row justify-center gap-6">
          <input type="button" value="All" className={`btn btn-md ${statusFilters.length === 5 ? 'text-warning' : ''}`} onClick={() => handleStatusFilter('ALL')}/>
          <input type="button" value="待審核" className={`btn btn-md ${statusFilters.includes('STATUS_WAIT') ? 'text-warning' : ''}`} onClick={() => handleStatusFilter('STATUS_WAIT')}/>
          <input type="button" value="已取消" className={`btn btn-md ${statusFilters.includes('STATUS_CANCEL') ? 'text-warning' : ''}`} onClick={() => handleStatusFilter('STATUS_CANCEL')}/>
          <input type="button" value="待領取" className={`btn btn-md ${statusFilters.includes('STATUS_SUCCESS') ? 'text-warning' : ''}`} onClick={() => handleStatusFilter('STATUS_SUCCESS')}/>
          <input type="button" value="出借中" className={`btn btn-md ${statusFilters.includes('STATUS_BORROW') ? 'text-warning' : ''}`} onClick={() => handleStatusFilter('STATUS_BORROW')}/>
          <input type="button" value="已歸還" className={`btn btn-md ${statusFilters.includes('STATUS_COMPLETE') ? 'text-warning' : ''}`} onClick={() => handleStatusFilter('STATUS_COMPLETE')}/>
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
                    filterOrder.map( (item) => (
                      <tr className='hover' key={item.id}>
                          <th>{item.id}</th>
                          <td>{item.startDate}</td>
                          <td>{new Date(new Date(item.startDate).getTime() + item.duration * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}</td>
                          <td>{item.user.username}&nbsp;({item.user.trueName})<br/>{ROLE_LABELS[item.user.role] || item.user.role}</td>
                          <td>{STATUS_LABELS[item.status] || item.status}</td>
                          <td>{item.items.map( (subItem) => (
                            <div className="flex justify-between min-w-32" key={subItem.id}>
                              <span className="text-left">{subItem.equipment.name}</span>
                              <span className="text-right"> x {subItem.quantity}</span>
                            </div>
                          ))}
                          </td>
                          <td>
                            {/* 按鈕僅在非 STATUS_CANCEL 和 STATUS_COMPLETE 狀態時顯示 */}
                            {!['STATUS_CANCEL', 'STATUS_COMPLETE'].includes(item.status) && (
                              <>
                                <input
                                  type="button"
                                  value="APPROVE"
                                  className="btn btn-outline btn-success btn-sm"
                                  onClick={ () => handleApprove(item.id)}
                                />
                                <input
                                  type="button"
                                  value="DISMISS"
                                  className="btn btn-outline btn-error btn-sm mx-2"
                                  onClick={ () => handleDismiss(item.id)}
                                />
                              </>
                            )}
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
