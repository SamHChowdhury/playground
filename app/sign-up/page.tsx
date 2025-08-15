import SignUpForm from "@/components/SignUpForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function SignUp() {
    return (
        <Card className="max-w-[800px] mx-auto">
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    )
}