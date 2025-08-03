'use client'

import { signIn } from "@/api/auth"
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SignInButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {pending ? "Signing In..." : "Sign In"}
        </button>
    );
}

export default function SignInForm() {
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async (formData: FormData) => {
        const signedIn = await signIn(formData);
        if (!signedIn.success) {
            setError("Sign-in failed. Please check your credentials.")
        } else {
            setError(null);
        }
    };

    return (
        <form action={handleSignIn}>
            {error && <p style={{color: "red"}}>{error}</p>}
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
            <SignInButton />
        </form>
    )
}