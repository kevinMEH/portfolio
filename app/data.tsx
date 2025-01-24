import data from "@/custom/data.json";

export async function getTitle() {
    return data.title;
}

export async function getDescription() {
    return data.description;
}
