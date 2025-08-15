import SignInForm from "@/components/SignInForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function SignIn() {
    return (
        <Card className="max-w-[800px] mx-auto">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardContent>
                <SignInForm />
            </CardContent>
        </Card>
    )
}