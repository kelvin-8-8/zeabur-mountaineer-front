import React from 'react'

export default function Unauthorized() {

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <p className="py-6">
                        權限不足，請先登入後再重試
                    </p>
                </div>
            </div>
        </div>
    )
}
