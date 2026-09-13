export type EditorialImage = {
  src: string;
  alt: string;
  source: string;
};

const unsplash = (id: string, width = 1400, height = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=88`;

export const editorialImages = {
  therapyRoom: {
    src: unsplash("photo-1497366811353-6870744d04b2", 1600, 1200),
    alt: "Refined modern therapy and consultation room",
    source: "https://unsplash.com/photos/green-leafed-plant-beside-brown-wooden-table-near-gray-sofa-6870744d04b2",
  },
  clinicInterior: {
    src: unsplash("photo-1497366754035-f200968a6e72", 1600, 1200),
    alt: "Light-filled contemporary clinic interior",
    source: "https://unsplash.com/photos/photo-1497366754035-f200968a6e72",
  },
  modernWorkspace: {
    src: unsplash("photo-1524758631624-e2822e304c36", 1600, 1100),
    alt: "Calm and collaborative modern workspace",
    source: "https://unsplash.com/photos/photo-1524758631624-e2822e304c36",
  },
  careTeam: {
    src: unsplash("photo-1521737711867-e3b97375f902", 1600, 1100),
    alt: "Professional care team collaborating around a table",
    source: "https://unsplash.com/photos/photo-1521737711867-e3b97375f902",
  },
  therapist: {
    src: unsplash("photo-1573496359142-b8d87734a5a2", 1000, 1300),
    alt: "Confident female mental healthcare professional",
    source: "https://unsplash.com/photos/photo-1573496359142-b8d87734a5a2",
  },
  specialistWoman: {
    src: unsplash("photo-1544005313-94ddf0286df2", 1000, 1300),
    alt: "Warm portrait of a female specialist",
    source: "https://unsplash.com/photos/photo-1544005313-94ddf0286df2",
  },
  specialistMan: {
    src: unsplash("photo-1507003211169-0a1dd7228f2d", 1000, 1300),
    alt: "Professional portrait of a male specialist",
    source: "https://unsplash.com/photos/photo-1507003211169-0a1dd7228f2d",
  },
  specialistWomanTwo: {
    src: unsplash("photo-1517841905240-472988babdf9", 1000, 1300),
    alt: "Friendly portrait of a care professional",
    source: "https://unsplash.com/photos/photo-1517841905240-472988babdf9",
  },
  lake: {
    src: unsplash("photo-1470770841072-f978cf4d019e", 1600, 1100),
    alt: "Peaceful mountain lake and forest landscape",
    source: "https://unsplash.com/photos/photo-1470770841072-f978cf4d019e",
  },
  botanical: {
    src: unsplash("photo-1497250681960-ef046c08a56e", 1200, 1200),
    alt: "Lush green botanical detail",
    source: "https://unsplash.com/photos/photo-1497250681960-ef046c08a56e",
  },
  calmLandscape: {
    src: unsplash("photo-1500530855697-b586d89ba3ee", 1600, 1100),
    alt: "Quiet landscape evoking calm and wellbeing",
    source: "https://unsplash.com/photos/photo-1500530855697-b586d89ba3ee",
  },
  forest: {
    src: unsplash("photo-1441974231531-c6227db76b6e", 1600, 1100),
    alt: "Sunlight filtering through a peaceful forest",
    source: "https://unsplash.com/photos/photo-1441974231531-c6227db76b6e",
  },
  refinedOffice: {
    src: unsplash("photo-1497366216548-37526070297c", 1600, 1100),
    alt: "Refined contemporary clinic workspace",
    source: "https://unsplash.com/photos/photo-1497366216548-37526070297c",
  },
  quietOffice: {
    src: unsplash("photo-1497366412874-3415097a27e7", 1400, 1100),
    alt: "Quiet light-filled professional office",
    source: "https://unsplash.com/photos/photo-1497366412874-3415097a27e7",
  },
  collaborativeTable: {
    src: unsplash("photo-1517245386807-bb43f82c33c4", 1600, 1100),
    alt: "Healthcare team collaborating at a table",
    source: "https://unsplash.com/photos/photo-1517245386807-bb43f82c33c4",
  },
  clinicLounge: {
    src: unsplash("photo-1497366858526-0766cadbe8fa", 1600, 1100),
    alt: "Welcoming premium clinic lounge",
    source: "https://unsplash.com/photos/photo-1497366858526-0766cadbe8fa",
  },
  businessMeeting: {
    src: unsplash("photo-1551836022-d5d88e9218df", 1600, 1100),
    alt: "Clinic leaders in a focused business meeting",
    source: "https://unsplash.com/photos/photo-1551836022-d5d88e9218df",
  },
  teamConversation: {
    src: unsplash("photo-1556761175-b413da4baf72", 1600, 1100),
    alt: "Professional team discussing patient operations",
    source: "https://unsplash.com/photos/photo-1556761175-b413da4baf72",
  },
  strategySession: {
    src: unsplash("photo-1517048676732-d65bc937f952", 1600, 1100),
    alt: "Care team in a strategic planning session",
    source: "https://unsplash.com/photos/photo-1517048676732-d65bc937f952",
  },
  diverseTeam: {
    src: unsplash("photo-1522071820081-009f0129c71c", 1600, 1100),
    alt: "Diverse and welcoming modern care team",
    source: "https://unsplash.com/photos/photo-1522071820081-009f0129c71c",
  },
  secureLaptop: {
    src: unsplash("photo-1516321318423-f06f85e504b3", 1600, 1100),
    alt: "Secure digital workspace on a laptop",
    source: "https://unsplash.com/photos/photo-1516321318423-f06f85e504b3",
  },
  analyticsDesk: {
    src: unsplash("photo-1454165804606-c3d57bc86b40", 1600, 1100),
    alt: "Operational analytics and planning desk",
    source: "https://unsplash.com/photos/photo-1454165804606-c3d57bc86b40",
  },
  workshop: {
    src: unsplash("photo-1552664730-d307ca884978", 1600, 1100),
    alt: "Team improving a healthcare service together",
    source: "https://unsplash.com/photos/photo-1552664730-d307ca884978",
  },
  peopleWorking: {
    src: unsplash("photo-1522202176988-66273c2fd55f", 1600, 1100),
    alt: "Friendly team working together",
    source: "https://unsplash.com/photos/photo-1522202176988-66273c2fd55f",
  },
  clinicianDetail: {
    src: unsplash("photo-1505751172876-fa1923c5c528", 1400, 1100),
    alt: "Clinician at work in a modern care setting",
    source: "https://unsplash.com/photos/photo-1505751172876-fa1923c5c528",
  },
  handsCare: {
    src: unsplash("photo-1516841273335-e39b37888115", 1400, 1100),
    alt: "Hands expressing reassurance and human care",
    source: "https://unsplash.com/photos/photo-1516841273335-e39b37888115",
  },
  hospitalHall: {
    src: unsplash("photo-1519494026892-80bbd2d6fd0d", 1600, 1100),
    alt: "Bright and calm healthcare interior",
    source: "https://unsplash.com/photos/photo-1519494026892-80bbd2d6fd0d",
  },
  careInterior: {
    src: unsplash("photo-1538108149393-fbbd81895907", 1600, 1100),
    alt: "Professional private healthcare interior",
    source: "https://unsplash.com/photos/photo-1538108149393-fbbd81895907",
  },
  wellbeing: {
    src: unsplash("photo-1511174511562-5f7f18b874f8", 1400, 1100),
    alt: "Wellbeing and human care detail",
    source: "https://unsplash.com/photos/photo-1511174511562-5f7f18b874f8",
  },
  doctorTablet: {
    src: unsplash("photo-1576091160399-112ba8d25d1d", 1400, 1100),
    alt: "Healthcare professional using a secure digital platform",
    source: "https://unsplash.com/photos/photo-1576091160399-112ba8d25d1d",
  },
  healthcareTeam: {
    src: unsplash("photo-1579684385127-1ef15d508118", 1600, 1100),
    alt: "Healthcare specialists working as one team",
    source: "https://unsplash.com/photos/photo-1579684385127-1ef15d508118",
  },
  doctorConsultation: {
    src: unsplash("photo-1532938911079-1b06ac7ceec7", 1400, 1100),
    alt: "Thoughtful consultation in a modern practice",
    source: "https://unsplash.com/photos/photo-1532938911079-1b06ac7ceec7",
  },
} satisfies Record<string, EditorialImage>;

export const pagePhotoSets = {
  home: [editorialImages.therapyRoom, editorialImages.therapist, editorialImages.botanical, editorialImages.careTeam],
  platform: [editorialImages.clinicInterior, editorialImages.modernWorkspace, editorialImages.therapist, editorialImages.lake],
  solutions: [editorialImages.careTeam, editorialImages.specialistWoman, editorialImages.specialistMan, editorialImages.therapyRoom],
  technology: [editorialImages.modernWorkspace, editorialImages.clinicInterior, editorialImages.forest, editorialImages.botanical],
  features: [editorialImages.refinedOffice, editorialImages.doctorTablet, editorialImages.quietOffice, editorialImages.clinicianDetail],
  pricing: [editorialImages.clinicLounge, editorialImages.businessMeeting, editorialImages.analyticsDesk, editorialImages.botanical],
  security: [editorialImages.secureLaptop, editorialImages.hospitalHall, editorialImages.doctorTablet, editorialImages.forest],
  about: [editorialImages.diverseTeam, editorialImages.strategySession, editorialImages.peopleWorking, editorialImages.handsCare],
  contact: [editorialImages.careInterior, editorialImages.doctorConsultation, editorialImages.wellbeing, editorialImages.calmLandscape],
  booking: [editorialImages.therapyRoom, editorialImages.botanical, editorialImages.lake, editorialImages.specialistWomanTwo],
  login: [editorialImages.therapist, editorialImages.clinicInterior, editorialImages.botanical, editorialImages.calmLandscape],
  admin: [editorialImages.specialistWoman, editorialImages.specialistMan, editorialImages.specialistWomanTwo, editorialImages.therapist],
};
