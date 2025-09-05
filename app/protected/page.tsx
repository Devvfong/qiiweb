import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">User Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Email:</span> {data.user.email}
                </div>
                {profile?.first_name && (
                  <div>
                    <span className="font-medium">First Name:</span> {profile.first_name}
                  </div>
                )}
                {profile?.last_name && (
                  <div>
                    <span className="font-medium">Last Name:</span> {profile.last_name}
                  </div>
                )}
                {profile?.age && (
                  <div>
                    <span className="font-medium">Age:</span> {profile.age}
                  </div>
                )}
                {profile?.sex && (
                  <div>
                    <span className="font-medium">Sex:</span> {profile.sex}
                  </div>
                )}
                {profile?.date_of_birth && (
                  <div>
                    <span className="font-medium">Date of Birth:</span>{" "}
                    {new Date(profile.date_of_birth).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
