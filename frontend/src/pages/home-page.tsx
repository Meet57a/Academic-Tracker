import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown, Trash } from "lucide-react"
import AddSubject from "@/components/form/add"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { fetchSubjectAndTimeTable, fetchTask, taskUpdate } from "@/services/track"
import { toast } from "react-toastify"

type subject = {
  subject: string
}

type tasks = {
  subject: "",
  task: "",
  due: "",
  userId: "",
  done: ""
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
  const updateTask = async (value: string) => {
    const body = {
      donevalue: value === "Done" ? "true" : "false",
      id: localStorage.getItem('id')
    }
    const res = await taskUpdate(body);
    toast(res.msg)
  }

  useEffect(() => {
    fetchSubjects()
    fetchTaskk()
  }, []);

  return (
    <div className="min-md:mx-40 tracking-wider max-md:mx-2">
      <AddSubject />
      <div className="flex justify-between items-center my-4">Date Wise <Switch checked={switchh} onCheckedChange={setSwitchh} /> Subject With Date Wise</div>
      <div className="grid grid-cols-3 gap-4 my-4 max-sm:hidden max-xl:grid-cols-2">
        {subjects.map((value, index) => (
          <div className="border-2 border-accent py-2 px-4 flex items-center justify-between rounded-xl" key={index}>
            <div className="font-semibold">{value.subject}</div>
            <div className="flex gap-6 font-light">
              <div className="flex flex-col items-center">
                <div className="text-green-300">Done</div>
                <div>{ }</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-red-300">Pending</div>
                <div>{ }</div>
              </div>
              <div className="flex flex-col items-center">
                <div>Total</div>
                <div>{ }</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      {!switchh ? (
        <div>
          <div className="mt-4 flex justify-between">
            <div>Monday</div>
            <div>15-07-2025</div>
          </div>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2">
            <div className="mt-4 border-2 rounded-xl border-accent p-4 flex flex-col items-center gap-4">
              <div className="flex justify-between w-full">
                <div>Dmgt</div>
                <div className="text-yellow-300">Assignment 1</div>
              </div>
              <Select defaultValue="Done" onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Have you done your task?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"Done"}>Done</SelectItem>
                  <SelectItem value={"Pending"}>Pending</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex w-full justify-between">
                <div className="text-green-300">15-07-2025</div>
                <div>--------{'>'}</div>
                <div className="text-red-300">16-07-2025</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-4">
            Dmgt
          </div>
          <div className="mt-4 flex justify-between">
            <div>Monday</div>

            <div>15-07-2025</div>
          </div>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2">
            <div className="mt-4 border-2 rounded-xl border-accent p-4 flex flex-col items-center gap-4">
              <div className="flex justify-between w-full">
                <div>Dmgt</div>
                <div className="text-yellow-300">Assignment 1</div>
              </div>
              <DropdownMenu>
                <div className="w-full flex justify-between items-center gap-2">
                  <DropdownMenuTrigger className="border py-1 px-4 rounded w-full flex justify-between">
                    <div className={`text-green-300`}>Done</div>
                    <ChevronDown />
                  </DropdownMenuTrigger>
                  <Trash color="red" />
                </div>
                <DropdownMenuContent className="w-">
                  <DropdownMenuLabel>Select</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-green-300">Done</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-300">Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex w-full justify-between">
                <div className="text-green-300">15-07-2025</div>
                <div>--------{'>'}</div>
                <div className="text-red-300">16-07-2025</div>
              </div>
            </div>
          </div>
        </div>
      )
      }

    </div >
  )
}

export default HomePage