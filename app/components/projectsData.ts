import { ProjectData } from "./PolaroidCard";

/* 
  Central source of truth for all projects.
  Images are reused placeholders for now.
*/

export const NEED_TAGS = [
  "Intelligence", "Understand Something", "Interactive Experience",
  "Explain an Idea", "Immersive Environment", "Productivity",
  "Produce Visual Story", "Simulate Real World Systems", "Prototype Concept"
];

export const CONTEXT_TAGS = [
  "Education", "Product Prototype", "Research", "Training",
  "Behavioral Analysis", "Storytelling", "Marketing", "UX Design"
];

export const PLATFORM_TAGS = [
  "Real-Time System", "Web-App", "Simulation", "3D Environment",
  "XR (AR/VR)", "Video"
];

export const ALL_TAGS = [...NEED_TAGS, ...CONTEXT_TAGS, ...PLATFORM_TAGS];


export const PROJECTS: ProjectData[] = [
  {
    id: "ttt-othello",
    title: "TTT & Othello Player",
    rotation: "-rotate-2",
    synopsis: "A Unity WebGL app that lets users play against, train, and understand neural-network board game agents through interactive AI explanations and visualizations.",
    description: `Built a board-game AI-player as a unity-WebGL app to compete against DNN models that I trained along with a prof. Amrik at Plaksha University. It has:

- A feature for users to (modify hyperparameters and) train their own neural network opponent
- A 3D graph ( a projection) of the loss-function value across time
- A short slideshow of an explanation of how the data was generated and how the algorithm works.`,
    link: "#",
    tags: ["Intelligence", "Understand Something", "Interactive Experience", "Education", "Product Prototype", "Real-Time System", "Web-App"],
    importance: 1,
    imageUrl: "/images/projects/othello.webp",
    links: [
      "https://github.com/adharshg/ttt-othello",
      "https://example-demo.vercel.app/ttt-othello",
    ],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1200&auto=format&fit=crop" },
      { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
  {
    id: "car-well",
    title: "Car in a Well",
    rotation: "rotate-2",
    synopsis: "A real-time Unity simulation for designing and testing customizable vehicle pathways and physics using runtime-adjustable parameters.",
    description: `This was a ‘Pathway Banking Simulation’ built as a Desktop app.
The goal was to design a pathway as a frustum where its height and slope-angle can be modified using an interface, and have a car drive in it. The car’s velocity can also be modified in runtime using a slider.
Includes realistic environment, assets, and physics.
Behind the physics:

- physics-based forward motion
- using cos and sin for varying input
- using local axes
- steer using a proxy object
- using the generated mesh`,
    link: "#",
    tags: ["Interactive Experience", "Understand Something", "Explain an Idea", "Education", "Research", "Simulation", "3D Environment"],
    importance: 1,
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    links: ["https://github.com/adharshg/car-in-a-well"],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
  {
    id: "virtual-ot",
    title: "Virtual OT",
    rotation: "-rotate-1",
    synopsis: "A photorealistic VR operating theatre built in Unity for surgical training, accurately modeled after real-world operating rooms.",
    description: `Created an entire operating theater environment for a surgical-training VR prototype application. The medical equipments have all been modelled according to references from real operating theaters. multiple light sources, lighting bakes and reflection probes were using inside Unity to match the visual quality that Unreal Engine provides.`,
    link: "#",
    tags: ["Immersive Environment", "Interactive Experience", "Intelligence", "Productivity", "Research", "Training", "Behavioral Analysis", "Simulation", "XR (AR/VR)", "3D Environment"],
    importance: 1,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    links: [
      "https://github.com/adharshg/virtual-ot",
      "https://example-demo.vercel.app/virtual-ot",
      "https://vifrtech.com/virtual-ot",
    ],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" },
      { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
  {
    id: "leo-highway",
    title: "Leo Highway Chase",
    rotation: "rotate-3",
    synopsis: "A low-budget recreation of a CGI highway chase shot from Leo (2023), completed in under 12 hours to explore rapid cinematic VFX production.",
    description: `In an effort to replicate film-quality VFX on a low budget, I recreated a CGI-shot from a highway chase sequence in Leo (2023, Tamil) within 10-12 hours. Given the time and compute constraint, I’m proud of the result. Given another chance, I’d focus more on making the camera motion and the car’s path feel more natural.`,
    link: "#",
    tags: ["Immersive Environment", "Produce Visual Story", "Storytelling", "Marketing", "Video", "3D Environment"],
    importance: 1,
    imageUrl: "/images/projects/leo-highway-chase.webp",
  },
  {
    id: "warehouse",
    title: "Warehouse Simulation",
    rotation: "-rotate-3",
    synopsis: "A real-time warehouse simulation built in Unity to prototype and visualize industrial workflows in an interactive 3D environment.",
    description: `A simulation created for demonstrating a robotics company’s warehouse bots system at exhibitions and sales presentations. This project was a great exercise in balancing realism, immersion, and optimising for operating on VR headsets with very low computing capabilities. Satisfied and happy client at the end :)`,
    link: "#",
    tags: ["Immersive Environment", "Simulate Real World Systems", "Prototype Concept", "Explain an Idea", "Productivity", "Product Prototype", "Marketing", "Story Telling", "Real-Time System", "Simulation", "3D Environment", "XR (AR/VR)"],
    importance: 1,
    imageUrl: "/images/projects/warehouse-simulation.webp",
  },
  {
    id: "physics",
    title: "Suspension Simulation",
    rotation: "rotate-1",
    synopsis: "A physics-driven Unity simulation demonstrating the mechanics of a double wishbone suspension system using custom-modeled components and code-controlled motion.",
    description: `This desktop application is a realistic simulation of a double wishbone suspension system. A simple skeleton of the car with only the suspensions are used to demonstrate this clearly. All the system’s components were modelled on Blender and brought together on Unity within 6 days. The logic for its motion is completely controlled using code.`,
    link: "#",
    tags: ["Interactive Experience", "Understand Something", "Explain an Idea", "Education", "Product Prototype", "Simulation", "3D Environment", "Real-Time System"],
    importance: 1,
    imageUrl: "/images/projects/suspension-simulation.webp",
  },
  {
    id: "halara",
    title: "Halara",
    rotation: "-rotate-2",
    synopsis: "A VR-based screening tool for neurodevelopmental conditions that evolved from an early prototype into a clinically-oriented product through iterative research and testing.",
    description: `This is a VR product of Vifr Tech that I had first built, prototyped, and tested on neurodivergent children in Chennai for about 6 months before incorporating the product idea as a company and bringing in specialised talents to evolve the product further to its current state.
It is currently an screening tool that assesses the intensity of symptoms of ASD, ADHD, and learning disabilities. This reduces the testing-time and human errors involved in assessments.`,
    link: "#",
    tags: ["Interactive Experience", "Immersive Environment", "Intelligence", "Understand Something", "Research", "Education", "Behavioral Analysis", "XR (AR/VR)", "3D Environment", "Web-App"],
    importance: 1,
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "alfaleus",
    title: "VR Eye-Test Prototypes",
    rotation: "rotate-2",
    synopsis: "A series of VR healthcare prototypes for analysing visual field defects and assisting people with low vision, later developed into commercial products.",
    description: `Throughout 2020, worked with the leadership in a popular healthTech company to build prototype applications for VR headsets to conduct analyses of all potential eye-field defects.
The second prototype assists people with low vision disabilities using the cameras on VR headsets.
These have been actualised into products that have been popular in the market since 2022.`,
    link: "#",
    tags: ["Interactive Experience", "Intelligence", "Understand Something", "Research", "Behavioral Analysis", "XR (AR/VR)", "Real-Time System"],
    importance: 1,
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "chess-promo",
    title: "Chess Engine Promo",
    rotation: "-rotate-1",
    synopsis: "A fully CGI promotional video created during lockdown to market a board-game workshop using Blender's particle systems and procedural effects.",
    description: `Since the lockdown drastically reduced the opportunities for us to spread the word about a workshop we were conducting at the Board Games Club, which I was the design and marketing lead of, we brought out this CGI video that stood out among the posters that were posted on stories. Gave me the chance to try Blender’s particle system and turbulence on the potato-laptop I had then.`,
    link: "#",
    tags: ["Explain an Idea", "Produce Visual Story", "Storytelling", "Marketing", "Video", "3D Environment"],
    importance: 1,
    imageUrl: "/images/projects/chess-engine-promo.webp",
  },

  /* Importance 2 */

  {
    id: "mocap-ingame",
    title: "Motion Capture Anim. in Game",
    rotation: "rotate-1",
    synopsis: "A Unity prototype bringing AI-voiced NPCs to life using markerless motion capture, facial tracking, and Blender-based animation workflows.",
    description: `Using Blender plugins and AI-generated voice tracks, we brought multiple NPCs to life on a Unity application.
Separate clips for Face-tracking and the motion-capture for the bodies were shot and blended together since we could not 3D-print the face-rigs within the time limit. Despite that, the result came out as expected.`,
    link: "#",
    tags: ["Interactive Experience", "Produce Visual Story", "Prototype Concept", "Storytelling", "Product Prototype", "Video", "3D Environment"],
    importance: 2,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "virtual-production",
    title: "Virtual Production",
    rotation: "-rotate-2",
    synopsis: "A Unity virtual production pipeline using VR controller tracking as a handheld virtual camera to explore low-cost virtual cinematography.",
    description: `We wanted to recreate the idea that was used to shoot the 2019 Lion King movie to scope out possibilities of using it in our productions. The concept is to use the movement of a physical camera to shoot a completely CGI environment that existed only virtually.
Since VR headsets already track the position and rotation of its controllers, we fixed a virtual camera onto them inside Unity and exported its feed as a video.
This pipeline worked perfectly well. The limitation is that the tracking works only within a range of 5-6 feet around a Pico 3 headset.`,
    link: "#",
    tags: ["Interactive Experience", "Immersive Environment", "Produce Visual Story", "Prototype Concept", "Research", "Product Prototype", "Marketing", "Real-Time System", "XR (AR/VR)", "3D Environment"],
    importance: 2,
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "virtual-ot-promo",
    title: "Virtual OT - Promo",
    rotation: "rotate-1",
    synopsis: "A photorealistic VR operating theatre built in Unity for surgical training, accurately modeled after real-world operating rooms.",
    description: `Created an entire operating theater environment for a surgical-training VR prototype application. The medical equipments have all been modelled according to references from real operating theaters.`,
    link: "#",
    tags: ["Explain an Idea", "Produce Visual Story", "Marketing", "3D Environment"],
    importance: 2,
    imageUrl: "/images/projects/virtual-ot-promo.webp",
  },
  {
    id: "virtual-ot-render",
    title: "Virtual OT - Render",
    rotation: "-rotate-1",
    synopsis: "A photorealistic VR operating theatre built in Unity for surgical training, accurately modeled after real-world operating rooms.",
    description: `Created an entire operating theater environment for a surgical-training VR prototype application. The medical equipments have all been modelled according to references from real operating theaters.`,
    link: "#",
    tags: ["Explain an Idea", "Produce Visual Story", "Marketing", "3D Environment"],
    importance: 2,
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "transport",
    title: "Transport DigiTwin App Pitch",
    rotation: "rotate-3",
    synopsis: "A CGI concept video illustrating a city-scale transport super-app for public mobility, traffic, and infrastructure management.",
    description: `While in discussion with other stakeholders involved in the Sangam Initiative by the Dept. of telecomm., this CG-video was created to explain our idea for a super-app to track public transports, road conditions, and traffic in cities.`,
    link: "#",
    tags: ["Explain an Idea", "Produce Visual Story", "Product Prototype", "Marketing", "Storytelling", "Video", "3D Environment"],
    importance: 2,
    imageUrl: "/images/projects/transport-digitwin.webp",
  },
  {
    id: "nolimits",
    title: "NoLimits Reels",
    rotation: "-rotate-2",
    synopsis: "A series of engagement-focused social media reels created by combining audience-retention research with fast-paced editing techniques.",
    description: `Spent time understanding trends, editing for engagement-retention, and leaning into the niche of oddly-satisfying reels. Used that to make reels for an Australian moving company in 2023.`,
    link: "#",
    tags: ["Produce Visual Story", "Marketing", "Storytelling", "Video"],
    importance: 2,
    imageUrl: "/images/projects/no-limits-reels.webp",
  },
  {
    id: "halara-brand",
    title: "Halara Brand Study",
    rotation: "rotate-2",
    synopsis: "A complete research-driven branding exercise that translated Halara's vision into a cohesive identity system, positioning, and design language.",
    description: `All of us at the company knew what Halara meant and how it felt to say the name. But we agreed that the way we presented ourselves then did not match this one bit. So, I worked with a designer friend of mine for months on bringing the team’s collective emotions together to fit into the academic process of creating a brand, its positioning, ICP, fonts, colors, logos, spacing, guidelines, and persona from questionnaires, and mood &  inspiration boards. Safe to say, it resonates well with everyone involved till date.`,
    link: "#",
    tags: ["Explain an Idea", "Produce Visual Story", "UX Design", "Marketing"],
    importance: 2,
    imageUrl: "/images/projects/halara-brand-study.webp",
  },
  {
    id: "futuristic-skit",
    title: "Futuristic Skit",
    rotation: "-rotate-3",
    synopsis: "A green-screen CGI film produced for a school event exploring the evolution of computing and possible future technologies.",
    description: `Freelancing project for a popular high-school in Chennai. The video was played at an Annual function in the school for parents and chief guests present to explain the trajectory of growth in computing technology and its possible future.`,
    link: "#",
    tags: ["Explain an Idea", "Produce Visual Story", "Marketing", "Storytelling", "Video", "3D Environment"],
    importance: 2,
    imageUrl: "/images/projects/futuristic-skit.webp",
  },
  {
    id: "bharatanatyam",
    title: "MoCap Bharatanatyam",
    rotation: "rotate-1",
    synopsis: "A markerless motion-capture showcase transforming a single-camera Bharatanatyam performance into a cleaned and rendered digital animation.",
    description: `Another freelance video project for a high-school in Chennai. This was created to demonstrate the advancement in marker-less motion-capture tech in 2023. Video footage of the dance was shot from a single angle on a phone was processed, cleaned up, and rendered for this.`,
    link: "#",
    tags: ["Simulate Real World Systems", "Produce Visual Story", "Marketing", "Storytelling", "Video", "3D Environment"],
    importance: 2,
    imageUrl: "/images/projects/mocap-bharatanatyam.webp",
  },
  {
    id: "photogrammetry",
    title: "Photogrammetry",
    rotation: "-rotate-1",
    synopsis: "An early photogrammetry experiment reconstructing a detailed 3D model of a human head from photographs and animating it in Blender.",
    description: `At the start of 2021, used 10-12 photos of my face/head from different angles to stitch together a 3D-scanned model of it on Blender. Using my potato-laptop, made a simple animation to make my hair glow. If only I’d known techniques for face-animation then.`,
    link: "#",
    tags: ["Simulate Real World Systems", "Prototype Concept", "Research", "Product Prototype", "Simulation", "3D Environment"],
    importance: 2,
    imageUrl: "/images/projects/photogrammetry.webp",
  },
  {
    id: "popup-store",
    title: "Popup Store Mockup",
    rotation: "rotate-2",
    synopsis: "Photorealistic renders of a proposed retail kiosk used to communicate construction specifications before physical fabrication.",
    description: `Obviously, this is from a pre-AI era. To provide an idea to a mall’s management team and the workers about the exact specifications of the stall to be set up, various angles of the stall’s 3D-model were lit, rendered and composited into photographs of the spaces provided by the client.`,
    link: "#",
    tags: ["Prototype Concept", "Immersive Environment", "Marketing", "3D Environment"],
    importance: 2,
    imageUrl: "/images/projects/popup-store-mockup.webp",
  },

  /* Importance 3 */

  {
    id: "blackout",
    title: "Black-Out Game",
    rotation: "-rotate-2",
    synopsis: "A fully self-built puzzle game that taught valuable lessons in project architecture, optimization, and version control through experience.",
    description: `My first personal project that took me an entire winter vacation to write, design, model, and code from scratch. I stepped back and learned all about project file-management, optimisations, and version control only after the size of this project’s assets somehow crashed my laptop’s hard-disk entirely.`,
    link: "#",
    tags: ["Interactive Experience", "Produce Visual Story", "Storytelling", "3D Environment", "Real-Time System"],
    importance: 3,
    imageUrl: "/images/projects/black-out-game.webp",
  },
  {
    id: "loading-loop",
    title: "Seamless Loading Screen Loop",
    rotation: "rotate-1",
    synopsis: "A seamlessly looping animated sequence designed for use as a game's loading screen.",
    description: `Animated a loop-able animation clip to be used on the loading screens of a friend’s personal project.`,
    link: "#",
    tags: ["Produce Visual Story", "UX Design", "3D Environment", "Video"],
    importance: 3,
    imageUrl: "/images/projects/seamless-loading-screen.webp",
  },
  {
    id: "phone-ad",
    title: "Phone Concept Advert. Demo",
    rotation: "-rotate-3",
    synopsis: "A fully CGI concept advertisement created in Blender as part of a collaborative 10-day creative challenge.",
    description: `During the lockdown, a musician friend of mine and I challenged ourselves to post a work of art on Instagram (his music and my visuals) every day for 10 days. We wanted to give our best on the last day with this mock phone advertisement made only on Blender.`,
    link: "#",
    tags: ["Produce Visual Story", "Marketing", "Video", "3D Environment"],
    importance: 3,
    imageUrl: "/images/projects/phone-concept-advert.webp",
  },
  {
    id: "posters",
    title: "Posters (From College)",
    rotation: "rotate-2",
    synopsis: "A collection of promotional posters designed to maximize attention and communication through strong visual hierarchy and unconventional layouts.",
    description: `All of them were designed and posted during my tenure as a writer-designer at CodeChef-VIT and as the design head at the college’s board gamers’ club. The goal was always to engage any viewer’s attention using principally strong designs while twisting them a bit to stand out.`,
    link: "#",
    tags: ["Explain an Idea", "UX Design"],
    importance: 3,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "bgc",
    title: "BGC Promo",
    rotation: "-rotate-1",
    synopsis: "A fully CGI promotional film introducing the university's board games club through cinematic animation instead of conventional event footage.",
    description: `As a sequel to the workshop promo video, we needed a promotional video for the club to be used by the university at various avenues. Instead of stitching together photos and videos, and matching the transitions to beats of music tracks, I got everyone at the club on board this idea of using an entirely CGI videos to show what are and end with the photos. Was created entirely within a day on the potato.`,
    link: "#",
    tags: ["Produce Visual Story", "Marketing"],
    importance: 3,
    imageUrl: "/images/projects/bgc-demo.webp",
  },
  {
    id: "storefront",
    title: "Storefront Mockup",
    rotation: "rotate-3",
    synopsis: "A photorealistic Blender visualization of a retail storefront that was later constructed according to the rendered design.",
    description: `This 3D rendering of the store-front created with the exact specifications of the space on Blender has been constructed in real-life at a mall in Chennai.`,
    link: "#",
    tags: ["Prototype Concept", "Immersive Environment", "Marketing"],
    importance: 3,
    imageUrl: "/images/projects/storefront-mockup.webp",
  },
];

/* Unique tags derived from dataset */
export const TAGS = [
  "Interactive",
  "Simulation",
  "Real-Time",
  "Immersive",
  "Cinematic",
  "Cognitive",
  "Branding",
  "Content",
];