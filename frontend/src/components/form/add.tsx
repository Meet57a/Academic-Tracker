import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjectCreate, createTask, fetchSubjectAndTimeTable } from "@/services/track"
import { toast } from 'react-toastify';
import { createTable } from "@/services/time-table"
import { useEffect, useState } from "react"



const subjectFormSchema = z.object({
    subject: z.string().min(2).max(50).nonempty({ "error": "Enter Subject" }),

})

const itemFormSchema = z.object({
    subject: z.string().min(2).max(50).nonempty(),
    task: z.string().min(2).max(50).nonempty({ "error": "Enter Task" }),
    due: z.string().min(1),
    userId: z.string()
})

const timeTableFormSchema = z.object({
    subject: z.string().min(2).max(50).nonempty(),
    day: z.string().min(2),
    location: z.string().min(2),
    startTime: z.string().min(2),
    endTime: z.string().min(2)
})
type subject = {
    subject: string
}

const AddSubject = () => {
    const subjectForm = useForm<z.infer<typeof subjectFormSchema>>({
        resolver: zodResolver(subjectFormSchema),
        defaultValues: {
            subject: "",
        },
    })
    const itemForm = useForm<z.infer<typeof itemFormSchema>>({
        resolver: zodResolver(itemFormSchema),
        defaultValues: {
            subject: "",
            task: "",
            due: "",
            userId: ""
        },
    })
    const timeTableForm = useForm<z.infer<typeof timeTableFormSchema>>({
        resolver: zodResolver(timeTableFormSchema),
        defaultValues: {
            subject: "",
            day: "",
            endTime: "",
            location: "",
            startTime: ""

        },
    })

    async function subjectOnSubmit(values: z.infer<typeof subjectFormSchema>) {
        const res = await subjectCreate(values);
        toast(res.msg)
    }
    async function itemOnSubmit(values: z.infer<typeof itemFormSchema>) {
        values.userId = localStorage.getItem("id") ?? ""
        const res = await createTask(values);
        toast(res.msg)
    }
    async function timeTableOnSubmit(values: z.infer<typeof timeTableFormSchema>) {
        console.log(values);
        
        const res = await createTable(values)
        toast(res.msg)

    }

    const [subjects, setSubjects] = useState<subject[]>([]);

    const fetchSubjects = async () => {
        const res = await fetchSubjectAndTimeTable();
        setSubjects(res.subjects)
    }

    useEffect(() => {
        fetchSubjects()
    }, []);
    return (
        <Dialog >
            <DialogTrigger className="w-full"><Button className="w-full border-2 border-zinc-600" variant={"outline"}>+ Add</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList className="min-md:w-full mb-2">
                                <TabsTrigger value="items">Task</TabsTrigger>
                                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                                <TabsTrigger value="timetable">Time Table</TabsTrigger>

                            </TabsList>
                            <TabsContent value="items">
                                <Form {...itemForm}>
                                    <form onSubmit={itemForm.handleSubmit(itemOnSubmit)} className="space-y-4 max-sm:w-60">
                                        <FormField
                                            control={itemForm.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Subject" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {subjects.map((Value, index) => (
                                                                    <SelectItem value={Value.subject} key={index}>{Value.subject}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={itemForm.control}
                                            name="task"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Task</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Task" {...field} />
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={itemForm.control}
                                            name="due"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Due</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Due" type="date" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </TabsContent>

                            <TabsContent value="subjects">
                                <Form {...subjectForm}>
                                    <form onSubmit={subjectForm.handleSubmit(subjectOnSubmit)} className="space-y-4 mt-4 max-sm:w-60">
                                        <FormField
                                            control={subjectForm.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Subject" {...field} />
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="max-sm:w-60">Submit</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                            <TabsContent value="timetable">
                                <Form {...timeTableForm}>
                                    <form onSubmit={timeTableForm.handleSubmit(timeTableOnSubmit)} className="space-y-4 mt-4 max-sm:w-60">
                                        <FormField
                                            control={timeTableForm.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Subject" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {subjects.map((Value, index) => (
                                                                    <SelectItem value={Value.subject} key={index}>{Value.subject}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={timeTableForm.control}
                                            name="day"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Day</FormLabel>
                                                    <FormControl>
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Day" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Monday">Monday</SelectItem>
                                                                <SelectItem value="Tuesday">Tuesday</SelectItem>
                                                                <SelectItem value="Wednesday">Wednesday</SelectItem>
                                                                <SelectItem value="Thursday">Thursday</SelectItem>
                                                                <SelectItem value="Friday">Friday</SelectItem>
                                                                <SelectItem value="Saturday">Saturday</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={timeTableForm.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Location" {...field} />
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={timeTableForm.control}
                                            name="startTime"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>Start Time</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Start Time" type="time" {...field} />
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={timeTableForm.control}
                                            name="endTime"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel>End Time</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="End Time" type="time" {...field} />
                                                    </FormControl>
                                                    <FormDescription>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="max-sm:w-60">Submit</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                        </Tabs>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddSubject