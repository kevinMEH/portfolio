import data from "@/custom/data.json";

export async function getWebsiteTitle() {
    return data.websiteTitle;
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

export async function getContactOverlayStyle() {
    return data.contactOverlayStyle;
}

export async function getContactTitle() {
    return data.contactTitle;
}

export async function getContactButtonText() {
    return data.contactButtonText;
}