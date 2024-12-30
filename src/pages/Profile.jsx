import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkRole } from '../services/authService';
import { changeProfile, logout } from '../services/authService';

export default function Profile( {updateAuthState} ) {

	const [username, setUsername] = useState("");
	const [trueName, setTrueName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const result = await checkRole();
				console.log(result.data);
				if (result.status === 200) {
					setUsername(result.data.username);
					setTrueName(result.data.truename);
					setEmail(result.data.email);
				}
			} catch (error) {
				console.error("Failed to fetch user data:", error);
				alert("獲取使用者資料失敗，請重新登入");
				navigate("/login");
			}
		};
		fetchUserData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const result = await changeProfile(username, trueName, email, password, newPassword);
			console.log("Register successful:", result);
			alert("修改成功,請重新登入");

			// 登出
			await logout();
			updateAuthState({ isLoggedIn: false, role: null })
			// TODO 重導到後台頁面
			navigate("/login");
		}
		catch (error) {
			console.log(error);
			alert("修改失敗");
			navigate("/");
		}
	}
	
	return (
		<div className="bg-base-100 flex items-center justify-center min-h-800px">
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl font-bold mb-6">Profile</h2>

					<form onSubmit={handleSubmit}>
						{/* 使用者 */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Username</span>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
									<path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z" /><circle cx="12" cy="6" r="6" />
								</svg>
								<input
									type="text"
									className="grow"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									disabled
								/>
							</label>
						</div>

						{/* 真實姓名 */}
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Real name</span>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
									<path d="M9,12c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6ZM2,24H11V14H5c-2.761,0-5,2.239-5,5v5H2ZM21.5,11h-6c-1.379,0-2.5,1.122-2.5,2.5v10.5h11V13.5c0-1.378-1.121-2.5-2.5-2.5Zm-.501,9h-5v-2h5v2Zm0-4.003h-5v-2h5v2Z" />
								</svg>
								<input
									type="text"
									className="grow"
									placeholder="Enter your real name"
									value={trueName}
									onChange={(e) => setTrueName(e.target.value)}
								/>
							</label>
						</div>

						{/* E-mail */}
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">E-mail</span>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path
										d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
									<path
										d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
								</svg>
								<input
									type="email"
									className="grow"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled
								/>
							</label>
						</div>

						{/* 舊密碼 */}
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="w-4 h-4 opacity-70"
								>
									<path
										fill-rule="evenodd"
										d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
										clip-rule="evenodd"
									/>
								</svg>
								<input
									type="password"
									className="grow"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</label>
						</div>

						{/* 新密碼 */}
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">New password</span>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="w-4 h-4 opacity-70"
								>
									<path
										fill-rule="evenodd"
										d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
										clip-rule="evenodd"
									/>
								</svg>
								<input
									type="password"
									className="grow"
									placeholder="Enter new password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</label>
						</div>


						<div className="form-control mt-10">
							<button type="submit" className="btn btn-outline btn-primary">Change</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
