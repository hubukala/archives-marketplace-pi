import { Resend } from "resend";
import EmailTemplate from "./email-template";

type SendEmailPropsType = {
    to: string;
    subject: string;
    text: string;
    html: string;
};

export const sendEmail = async ({
    to,
    subject,
    text,
    html,
}: SendEmailPropsType) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "no-reply@archivesmarketplace.site",
            to: to,
            subject: subject,
            html: html,
        });
        return {
            error: null,
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            error: (error as Error).message,
            success: false,
        };
    }
};
