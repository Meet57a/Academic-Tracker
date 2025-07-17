import { fetchSubjectAndTimeTable, fetchTask } from "@/services/track";
import { useEffect, useState } from "react";

type subject = {
    subject: string
}
type tasks = {
    subject: string,
    task: string,
    due: string,
    userId: string,
    done: boolean,
    createdAt: string,
    _id: string,
}

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState<subject[]>([]);
    const [tasks, setTasks] = useState<tasks[]>([]);
    const fetchTaskk = async () => {
        const res = await fetchTask();
        console.log(res);

        setTasks(res.tasks)
    }


    const fetchSubjects = async () => {
        const res = await fetchSubjectAndTimeTable();
        setSubjects(res.subjects)
    }

    useEffect(() => {
        fetchSubjects()
        fetchTaskk()
    }, []);
    return (
        <div className="min-md:mx-40 tracking-wider max-md:mx-2 grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4 max-sm:gap-0">
            {subjects.map((value, index) => (
                <div className="relative my-4 border-2 border-accent py-2 px-4 rounded-xl" key={index}>
                    <div className="absolute top-[-13px] font-semibold">
                        {value.subject}
                    </div>
                    <div className="flex font-light my-2 justify-between">
                        <div className="flex flex-col items-center">
                            <div className="text-green-300">Done</div>
                            {tasks.filter(task => task.subject === value.subject && task.done).length}
                        </div>
                        <div className="border-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="text-red-300">Pending</div>
                            {tasks.filter(task => task.subject === value.subject && !task.done).length}
                        </div>
                        <div className="border-2"></div>
                        <div className="flex flex-col items-center">
                            <div>Total</div>
                            {tasks.filter(task => task.subject === value.subject).length}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SubjectsPage