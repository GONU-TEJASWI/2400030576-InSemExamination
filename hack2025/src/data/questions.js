/*
 Tailored question sets keyed by interest area.
 Each question has: id (unique), text, trait (used for scoring).
*/

const questionBank = {
  Coding: [
    { id: "c1", text: "I enjoy solving algorithmic puzzles and logic problems.", trait: "Algorithms" },
    { id: "c2", text: "I like building full applications (frontend + backend).", trait: "Fullstack" },
    { id: "c3", text: "I am curious about data, statistics and ML.", trait: "Data" },
    { id: "c4", text: "I enjoy low-level systems and understanding performance.", trait: "System" },
  ],
  Hardware: [
    { id: "h1", text: "I enjoy designing circuits and working with electronics.", trait: "PCB" },
    { id: "h2", text: "I like writing firmware for microcontrollers.", trait: "Embedded" },
    { id: "h3", text: "I enjoy testing hardware and troubleshooting failures.", trait: "Test" },
  ],
  Technical: [
    { id: "t1", text: "I enjoy configuring and debugging networks or servers.", trait: "Networking" },
    { id: "t2", text: "I prefer hands-on mechanical or electrical troubleshooting.", trait: "Mechanical" },
    { id: "t3", text: "I like reading technical manuals and system specifications.", trait: "Electrical" },
  ],
  Management: [
    { id: "m1", text: "I enjoy coordinating teams to deliver projects on time.", trait: "Product" },
    { id: "m2", text: "I like planning, scheduling and optimizing processes.", trait: "Ops" },
    { id: "m3", text: "I enjoy mentoring and developing people.", trait: "HR" },
  ],
  Creative: [
    { id: "cr1", text: "I enjoy designing interfaces and user experiences.", trait: "Design" },
    { id: "cr2", text: "I like storytelling and producing content (writing/video).", trait: "Content" },
    { id: "cr3", text: "I enjoy visual arts, animation or multimedia.", trait: "Media" },
  ],
};

export default questionBank;
