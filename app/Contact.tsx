import { JSX } from "react";
import Link from "next/link";
import { getContacts, getContactText } from "./data";

export default async function Contact() {
    const [ contactTitle, contacts ] = await Promise.all([
        getContactText(),
        getContacts()
    ]);

    const iconAssociations: Map<string, (props: IconParameters) => JSX.Element> = new Map();
    iconAssociations.set("email", EmailIcon);
    iconAssociations.set("github", GithubIcon);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-sub font-bold font-mono sm:text-lg">
                Contact
            </h2>
            <p className="text-sm lg:text-base pb-2 md:pb-3">
                {contactTitle}
            </p>
            <div className="flex gap-4">
                {
                    contacts.map(contact => {
                        const Icon = iconAssociations.get(contact.type) ?? LinkIcon;
                        return <>
                            <Link
                                key={contact.type}
                                className="flex gap-2 items-center font-mono text-sm lg:text-base border-b"
                                href={contact.href}
                                target="_blank"
                            >
                                <Icon className="size-[14px] lg:size-4" />
                                <span className="leading-tight">{contact.text}</span>
                            </Link>
                            <span key={contact.type + "/"} className="last:hidden">/</span>
                        </>
                    })
                }
            </div>
        </div>
    );
}

type IconParameters = {
    size?: number,
    className?: string
}

// Supplied by Hero Icons
function EmailIcon({ size, className }: IconParameters) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width={size}
            height={size}
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
        </svg>
    );
}

// Supplied by Feather Icons
function GithubIcon({ size, className }: IconParameters) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            width={size}
            height={size}
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            />
        </svg>
    );
}

// Supplied by Hero Icons
function LinkIcon({ size, className }: IconParameters) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width={size}
            height={size}
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
        </svg>
    );
}