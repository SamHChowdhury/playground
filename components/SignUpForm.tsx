'use client'

import { signUp } from "@/api/auth"
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SignUpButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {pending ? "Signing Up..." : "Sign Up"}
        </button>
    );
}

export default function SignUpForm() {
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (formData: FormData) => {
        const signedUp = await signUp(formData);
        if (!signedUp.success) {
            setError("Sign-ups failed. Please check your credentials.")
        } else {
            setError(null);
        }
    };

    return (
        <form action={handleSignUp}>
            {error && <p style={{color: "red"}}>{error}</p>}
            <fieldset>
                <label>
                    Name
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
                    />
                </label>
            </fieldset>
            <fieldset>
                <label>
                    Email
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                </label>
                <label>
                    Password
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </label>
            </fieldset>
            <SignUpButton />
        </form>
    )
}