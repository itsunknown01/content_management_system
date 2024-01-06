import { auth } from "@/auth"

export const getUserId = async () => {
    const session = await auth()
    const userId = session?.user.id

    return userId;
}