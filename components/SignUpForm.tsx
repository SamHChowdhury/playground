'use client'

import { signUp } from "@/api/auth"
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
})

function SignUpButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full text-xl py-8">
            {pending ? "Signing Up..." : "Sign Up"}
        </Button>
    );
}

export default function SignUpForm() {
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof signUpSchema>>({
        defaultValues: {
        name: "",
        email: "",
        password: "",
        },
    })

    const handleSignUp = async (formData: FormData) => {
        const signedUp = await signUp(formData);
        if (!signedUp.success) {
            setError("Sign-ups failed. Please check your credentials.")
        } else {
            setError(null);
        }
    };

    return (
        <Form {...form}>
            <form action={handleSignUp} className="flex flex-col gap-8 max-w-[650px] mx-auto my-8">
                {error && <p style={{color: "red"}}>{error}</p>}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <SignUpButton />
            </form>
        </Form>
    )
}