import { inngest } from "../client.js";
import { User } from "../../models/user.model.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";

export const onUsersignup = inngest.createFunction(
    { id: "on-user-signup"},
    { event: "user/signup" },
    async ({ event, step }) => {
        try {
            const {email} = event.data;
            console.log(email)
            const user = await step.run("get-user-email", async()=> {
                const userobject = await User.findOne({ email })
                if(!userobject) {
                    throw new NonRetriableError("User no longer exists")
                }
                return userobject;
            })
            console.log(user)
            await step.run("send-welcome-email", async () => {
                const subject = "Welcome to ProcessPilot"
                const message = `Hi, welcome to ProcessPilot!
                \n\n\n 
                Thanks for signing up. We're glad to have you`
                sendMail(user.email,subject,message)
                 
            })

            return {success: true}
        } catch (error) {
            console.error("Error running Step", error.message)
            return {success: false}
        }
    }
)