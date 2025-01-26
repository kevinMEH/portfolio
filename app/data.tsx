import data from "@/custom/data.json";

export async function getWebsiteTitle() {
    return data.websiteTitle;
}

export async function getWebsiteDescription() {
    return data.websiteDescription;
}

export async function getTag() {
    return data.tag;
}

export async function getUrl() {
    return data.url;
}

export async function getTitle() {
    return data.title;
}

export async function getDescription() {
    return data.description;
}

export async function getTechnologiesDescriptions() {
    return data.technologiesDescription;
}

export async function getTechnologies() {
    return data.technologies;
}

export async function getProjects() {
    return data.projects;
}

export async function getContactText() {
    return data.contactText;
}

export async function getContacts() {
    return data.contacts;
}

export async function getRepository() {
    return data.repository;
}