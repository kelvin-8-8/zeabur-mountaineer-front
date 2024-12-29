import React, {useState} from 'react'
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import "datatables.net";

export default function AdminPage() {

    const [items, setItems] = useState();

  return (
    <div className='flex flex-col items-center justify-center'>
            <div className='justify-center items-center content-center max-w-screen-xl'>
                <div className="card p-4 bg-base-100 rounded-md flex flex-wrap flex-row justify-center gap-6">
                    <input type="button" value="~~" className="btn btn-md" />
                    <input type="button" value="~~~" className="btn btn-md" />
                </div>

                <div className="divider"></div>


                <div className='text-center min-h-700px'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Real name</th>
                                    <th>username</th>
                                    <th>email</th>
                                    <th>role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {/* body */}
                            <tbody>
                                {/* row 1 */}
                                <tr className="hover">
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>Blue</td>
                                    <td>
                                        <input type="button" value="EDIT" className="btn btn-xs md:btn-sm" />
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="hover">
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                    <td>Blue</td>
                                </tr>
                                {/* row 3 */}
                                <tr className="hover">
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                    <td>Blue</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
  )
}
