"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useRouter } from "next/navigation";
interface ChatInputProps {
    name: string;
    type: "channel" | "conversation";
    apiUrl: string;
    query: Record<string, any>;
}

const formSchema = z.object({
    content: z.string().min(1),
});

export const ChatInput = ({
    name,
    type,
    apiUrl,
    query,
}: ChatInputProps) => {
    const {onOpen} = useModal();

    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });
            await axios.post(url, values);
            form.reset();
            router.refresh();
        } catch (error) {
            console.log("[MESSAGE_POST]", error);
        }
    }
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-16">
                                    <Button onClick={() => onOpen("messageFile", {
                                        apiUrl: apiUrl,
                                        query,
                                    })} type="button" className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 rounded-full p1 flex items-center justify-center">
                                        <Plus className="text-white dark:text-[#313338]"/>
                                    </Button>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                                        className="px-14 py-6 dark:bg-zinc-700/75 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                    />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker onChange={(emoji) => {
                                            field.onChange(`${field.value} ${emoji}`);
                                        }} />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}