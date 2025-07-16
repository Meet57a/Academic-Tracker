import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
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
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { login, register } from "@/services/auth"
import { toast } from 'react-toastify';


const schema = z.object({
    code: z.string().min(2).max(50),
})


const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            code: "",
        },
    })


    async function onSubmit(values: z.infer<typeof schema>) {
        if (isRegister) {
            const res = await register(values)
            toast(res.msg)
        } else {
            const res = await login(values)
            localStorage.setItem('token', res.token)
            localStorage.setItem('id', res.userId)

            toast(res.msg)

        }
    }


    return (
        <Dialog>
            <DialogTrigger className="absolute right-4"><Button className='w-20 hover:w-40 max-sm:hidden' variant={'outline'}>Log in</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center pr-2">
                        <div>Login</div>
                        <div className="font-normal text-[12px] flex items-center gap-2">
                            Register <Switch checked={isRegister} onCheckedChange={setIsRegister} />
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Code" {...field} />
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
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Auth