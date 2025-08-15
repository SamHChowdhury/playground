'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signIn } from "@/api/auth"
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

function SignInButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full text-xl py-8">
            {pending ? "Signing In..." : "Sign In"}
        </Button>
    );
}

export default function SignInForm() {
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof signInSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleSignIn = async (formData: FormData) => {
        const signedIn = await signIn(formData);
        if (!signedIn.success) {
            setError("Sign-in failed. Please check your credentials.")
        } else {
            setError(null);
        }
    };

    return (
        <Form {...form}>
            <form action={handleSignIn} className="flex flex-col gap-8 max-w-[650px] mx-auto my-8">
                {error && <p style={{color: "red"}}>{error}</p>}
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
                <SignInButton />
            </form>
        </Form>
        )
}