import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiUser } from "react-icons/hi";

function CarListItem({ car, distance }) {
    const [calculatedDistance, setCalculatedDistance] = useState(0);

    useEffect(() => {
        // Ensure distance is a valid number before performing calculations
        if (typeof distance === 'string') {
            const numericDistance = parseFloat(distance);
            setCalculatedDistance(isNaN(numericDistance) ? 0 : numericDistance);
        } else if (typeof distance === 'number') {
            setCalculatedDistance(distance);
        } else {
            setCalculatedDistance(0); // Fallback for unexpected types
        }
    }, [distance]);

    const calculatedAmount = (car.amount * calculatedDistance).toFixed(2);

    return (
        <div>
            <div className='flex items-center justify-between mt-5'>
                <div className='flex items-center gap-5'>
                    <Image src={car.image} width={100} height={100} alt={car.name} />
                    <div>
                        <h2 className='font-semibold text-[18px] flex gap-3 items-center'>
                            {car.name}
                            <span className='flex gap-2 font-normal text-[14px] items-center'>
                                <HiUser />{car.seat}
                            </span>
                        </h2>
                        <p>{car.desc}</p>
                    </div>
                </div>
                <div>
                    <h2 className='text-[18px] font-semibold'>${calculatedAmount}</h2>
                </div>
            </div>
        </div>
    );
}

export default CarListItem;
