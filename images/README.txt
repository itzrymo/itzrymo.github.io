REDLINE GITHUB WEBSITE
=======================

FOLDER STRUCTURE
----------------

redline-github-site/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── images/
    ├── image1.jpg
    ├── image2.jpg
    ├── image3.jpg
    ├── image4.jpg
    ├── image5.jpg
    ├── image6.jpg
    └── README.txt


ADDING YOUR PHOTOS
------------------

Put your pictures inside the "images" folder.

Name them:

image1.jpg
image2.jpg
image3.jpg
image4.jpg
image5.jpg
image6.jpg

OR edit the filenames in index.html.

The gallery is designed to automatically crop the pictures
to fit the layout.

OPTIONAL VIDEO BACKGROUND
-------------------------

You can also put a video named:

redline-bg.mp4

inside the images folder.

Then open index.html and uncomment the <video> section near
the top of the <body>.

The animated rain and red lighting will still work over the
video.


CHANGING THE MEET DATE
----------------------

Open:

js/script.js

Find:

const nextMeet = new Date("2026-09-26T19:00:00");

Change it to your next meet.

Example:

const nextMeet = new Date("2026-10-24T19:00:00");


CHANGING LINKS
--------------

Open index.html.

Change the href values for:

TikTok Page
Redline Merch
Discord
Meet Information


GITHUB PAGES
------------

Create a GitHub repository.

Upload the entire contents of this folder.

Make sure index.html is in the ROOT of the repository.

Then:

Settings
→ Pages
→ Deploy from a branch
→ main
→ / (root)
→ Save

Your site will be available at:

https://YOURUSERNAME.github.io/REPOSITORY-NAME/
