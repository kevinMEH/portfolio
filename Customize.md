# Customize

## Data

Below is a specification of all the fields you should supply inside
`custom/data.json`. We recommend you copy the `custom/data.example.json` file
into `custom/data.json` and start modifying from there in order to avoid typos
or value structuring errors.

Note: `data.json` is included as a source file for Tailwind CSS. Therefore, all
classes defined here are valid.

---

`websiteTitle: string` - The title of the website.

`websiteDescription: string` - SEO description for the website.

---

`tag: string` - The "@" tag which appears right below your profile picture.

`url: string, url` - The URL which the user should be taken to when the tag is
clicked.

`title: string` - The title, right below the tag.

`description: string` - The description, right below the title.

---

`technologiesDescription: string` - Description text for the technologies you
are capable of working with.

`technologies: Technologies[]` - A list of groups of `Technologies` that you can
work with. Each group of `Technologies` is defined as follows:

- `type Technologies = {`
- `    textStyle: string` - Tailwind CSS classes to apply to the text of each
    technology item.
- `    backgroundStyle: string` - Tailwind CSS classes to apply to the background
    of each technology item.
- `    items: string[]` - A list of string technology items.
- `}`

---

`projects: Project[]` - A list of featured `Project`s. Make sure that you supply
a project image for each project you display. A `Project` is defined as follows:

- `type Project = {`
- `    title: string` - The title of your project.
- `    description: string` - A short description of your project.
- `    url: string` - The link the user should be bought to when the project is
    clicked upon.
- `    overlayStyle: string` - Tailwind CSS classes to apply to the overlay div over
    the image. Used primarily to artifically darken the supplied project
    image and add a darken hover effect.
- `    imageQuality: number` - The quality of the project image to be served to
    the user. Adjust this image to make page loading faster and less bandwidth
    intensive.
- `}`

---

`contactText: string` - Contact section message.

`contacts: Contact[]` - A list of `Contact`s. Each `Contact` is defined as
follows:

- `type Contact = {`
- `    type: string` - The type of contact. The value supplied here dictates the
    icon that will be displayed next to the contact text. Currently, two values
    are available: "email" and "github". Any value other than these two will
    display a generic "link" icon. If you would like to add more values, please
    add more icons into `app/Contact.tsx` and appropriately update the
    `iconAssociations` set.
- `    text: string` - Text describing the contact, displayed next to the icon.
- `    href: string` - The link the user is brought to when the contact is
    clicked.
- `}`

---

`repository: string` - The URL to your portfolio's GitHub repository. The
    repository's name is automatically calculated from the URL. If planning to
    make your repository private, feel free to use my repository's URL.


## Images

Specifications for images in `public/images` are as follows:

Note: The minimum width values given below is the maximum displayed size of the
image on PCs with 1 DPR. However, certain mobile devices have a DPR of 2 or
greater, so you should strive to supply images with dimensions 3 to 4 times that
of the minimum width.

`banner.png`: The banner image on your profile.
- Recommended aspect ratio: 3:2 to 7:2
- Minimum width: 700px
- Note: The maximum size of the banner is 700px * 200px, although it is
    recommended to seek an aspect ratio slimmer than 7:2.

`profile.png`: Your profile picture.
- Aspect ratio: 1:1
- Minimum width: 140px

`project_x.png`: Project images. Make sure to supply an image for every project
you have in `data.json`.
- Recommended aspect ratio: 3:2 to 7:2
- Minimum width: 638px / 640px
- Note: The project images becomes shorter and wider the wider the resolution
    of the webpage. This is intentional. Make sure that the main contents of
    your project images do not take up significant amounts of height.

## Favicon

Specify a favicon for your website by modifying `public/favicon.ico`.
- Recommended dimensions: 64px x 64px
