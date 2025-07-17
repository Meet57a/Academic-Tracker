import { fetchTable } from '@/services/time-table';
import  { useEffect, useState } from 'react'

type timeTable = {
    subject: ""
    day: "",
    location: "",
    starttime: "",
    endtime: ""
}

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurshday",
    "Friday",
    "Saturday"
]

const TimeTable = () => {

    const [timeTable, settimeTable] = useState<timeTable[]>([]);

    const fetchTimeTable = async () => {
        const res = await fetchTable();
        console.log(res);

        settimeTable(res.table)
    }

    useEffect(() => {
        fetchTimeTable()
    }, []);

    return (
        <div className='min-md:mx-40 tracking-wider max-md:mx-2'>
            <div>
                {days.map((valuee, index) => (
                    <div>
                        <div key={index} className='mt-2'>{valuee}</div>
                        <div className='grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-sm:gap-0'>
                            {timeTable.map((value, index) => (
                                value.day === valuee && <div className='my-2 border-2 border-accent py-2 px-4 rounded-xl' key={index}>
                                    <div>{value.subject}</div>
                                    <div className='flex justify-between mt-2'>
                                        <div className='text-green-300'>{new Date("2 " + value.starttime).toLocaleTimeString().replace(":00", "  ")}</div>
                                        <div>--------{'>'}</div>
                                        <div className='text-red-300'>{new Date("2 " + value.endtime).toLocaleTimeString().replace(":00", "  ")}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TimeTable