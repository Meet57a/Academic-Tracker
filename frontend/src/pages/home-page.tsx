import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash } from "lucide-react"
import AddSubject from "@/components/form/add"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { fetchSubjectAndTimeTable, fetchTask, taskUpdate, deleteTask } from "@/services/track"
import { toast } from "react-toastify"
import Auth from "@/components/form/auth"


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

const HomePage = () => {
  const [switchh, setSwitchh] = useState(false);
  const [subjects, setSubjects] = useState<subject[]>([]);
  const [tasks, setTasks] = useState<tasks[]>([]);


  const fetchSubjects = async () => {
    const res = await fetchSubjectAndTimeTable();
    setSubjects(res.subjects)
  }

  const fetchTaskk = async () => {
    const res = await fetchTask();
    console.log(res);

    setTasks(res.tasks)
  }
  const updateTask = async (value: string, id: string) => {
    const body = {
      donevalue: value === "Done" ? true : false,
      id: id
    }
    const res = await taskUpdate(body);
    const updatedTasks = tasks.map(task =>
      task._id === id ? { ...task, done: body.donevalue } : task
    );
    setTasks(updatedTasks);
    toast(res.msg)
  }

  const handleDeleteTask = async (id: string) => {
    const res = await deleteTask(id);
    if (res && res.status) {
      setTasks(tasks.filter(task => task._id !== id));
      toast("Task deleted successfully");
    } else {
      toast.error("Failed to delete task");
    }
  }

  useEffect(() => {
    fetchSubjects()
    fetchTaskk()
    setSwitchh(JSON.parse(localStorage.getItem("hideDoneTasks") || "false"));
  }, []);

  const getDayNameById = (id: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[id] || "";
  }

  const hideTasksIfDone = (task: tasks) => {
    if (switchh && task.done) {
      return false;
    }
    return true;
  }

  const storeSwitchState = (value: boolean) => {
    setSwitchh(value);
    localStorage.setItem("hideDoneTasks", JSON.stringify(value));
  }

  const groupedTasks = tasks.reduce<Record<string, tasks[]>>((acc, task) => {
    const date = task.createdAt.substring(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTasks).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  return (
    <div className="min-md:mx-40 tracking-wider max-md:mx-2">
      <div className="min-md:hidden w-full mb-4 flex justify-center ">
        <Auth />
      </div>
      <AddSubject />
      <div className="flex justify-between items-center my-4">Task done hide <Switch checked={switchh} onCheckedChange={(val) => { storeSwitchState(val) }} /></div>
      <div className="grid grid-cols-3 gap-4 my-4 max-sm:hidden max-xl:grid-cols-2">
        {subjects.map((value, index) => (
          <div className="border-2 border-accent py-2 px-4 flex items-center justify-between rounded-xl" key={index}>
            <div className="font-semibold">{value.subject}</div>
            <div className="flex gap-6 font-light">
              <div className="flex flex-col items-center">
                <div className="text-green-300">Done</div>
                {tasks.filter(task => task.subject === value.subject && task.done).length}
              </div>
              <div className="flex flex-col items-center">
                <div className="text-red-300">Pending</div>
                {tasks.filter(task => task.subject === value.subject && !task.done).length}
              </div>
              <div className="flex flex-col items-center">
                <div>Total</div>
                {tasks.filter(task => task.subject === value.subject).length}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      {
       tasks ? sortedDates.map((date) => (
          <div key={date}>
            <div className="mt-4 flex justify-between">
              <div className="font-semibold">{date}</div>
              <div>{getDayNameById(new Date(date).getDay())}</div>
            </div>
            <div>
              <div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4">
                {/* Map through tasks for the current date  */}
                {groupedTasks[date].map((task) => (
                  hideTasksIfDone(task)  && <div className="mt-4 border-2 rounded-xl border-accent p-4 flex flex-col items-center gap-4" key={task._id}> {/* Use a unique ID like _id for key */}
                    <div className="flex justify-between w-full">
                      <div>{task.subject}</div>
                      <div className="text-yellow-300">{task.task}</div> {/* This seems static, you might want to adjust it */}
                    </div>
                    <div className="w-full flex justify-between items-center gap-2">
                      <Select defaultValue={task.done ? "Done" : "Pending"} onValueChange={(valuee) => updateTask(valuee, task._id)}>
                        <SelectTrigger className={`w-full ${task.done ? "text-green-300" : "text-red-300"}`} >
                          <SelectValue placeholder="Have you done your task?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"Done"} className="text-green-300">Done</SelectItem>
                          <SelectItem value={"Pending"} className="text-red-300">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <Trash color="red" onClick={() => handleDeleteTask(task._id)} className="cursor-pointer" />
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="text-green-300">{task.createdAt.substring(0, 10)}</div>
                      <div>--------{'>'}</div>
                      <div className="text-red-300">{task.due}</div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="border-2 mt-4" />
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 mt-4">Loading...</div>
        )
      }

    </div >
  )
}

export default HomePage