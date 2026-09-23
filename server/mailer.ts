// Define the Mailer type locally since "better-auth" does not export it
export interface Mailer {
    send: (message: {
        to: string;
        subject: string;
        text: string;
    }) => Promise<void>;
}

// Define the shape of the request body for the Royoltech Mail API
interface RoyoltechMailPayload {
    name: string;
    subject: string;
    intro: string;
    email: string; // The actual recipient of the email
    phone?: string; // Optional field
    to: string;    // The admin/notification email, as per your API structure
    key: string;
}

// Configuration options for our custom mailer
interface RoyoltechMailerConfig {
    apiKey: string;
    adminEmail: string; // The static "to" email address for your API
    fromName: string;   // The default "name" to use in the request
}

/**
 * Creates a custom mailer for better-auth that sends emails via the Royoltech Mail API.
 * @param {RoyoltechMailerConfig} config - Configuration for the mailer.
 * @returns {Mailer} A mailer object compatible with better-auth.
 */
export const royoltechMailer = (config: RoyoltechMailerConfig): Mailer => {
    return {
        // better-auth will call this `send` function to dispatch emails
        send: async (message) => {
            // The text content of the email from better-auth (e.g., "You can reset your password here: [link]")
            // will be used for the "intro" field in your API.
            const introContent = message.text;

            // Construct the payload exactly as the Royoltech API requires
            const payload: RoyoltechMailPayload = {
                name: config.fromName,
                subject: message.subject,
                intro: introContent,
                email: message.to, // The user's email address
                to: config.adminEmail,
                key: config.apiKey,
                // The 'phone' field is omitted as it's not provided by the auth system
            };

            try {
                console.log("Sending email with payload:", JSON.stringify(payload, null, 2));

                const response = await fetch("https://mail.royoltech.com/api/email", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errorBody = await response.text();
                    // Log the error and throw to notify better-auth of the failure
                    throw new Error(`Mail API request failed with status ${response.status}: ${errorBody}`);
                }

                console.log("Email sent successfully via Royoltech Mailer.");

            } catch (error) {
                console.error("Failed to send email via Royoltech Mailer:", error);
                // Re-throwing is important so the authentication flow can handle the failure
                throw error;
            }
        },
    };
};