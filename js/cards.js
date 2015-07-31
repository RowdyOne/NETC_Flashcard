//card library
var sortedCards={
    "easy":[],
    "hard":[
    {
        "image":"U S Navy Ships.jpg",
        "question":"Name 3 types of Navy Ships",
        "answer":"Surface Combatants, Submarines, Auxiliaries",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Langley.jpg",
        "question":"In 1922, what was the Navy's first commissioned aircraft carrier?",
        "answer":"USS Langley (CV-1)",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Ranger.jpg",
        "question":"In 1934, name the first commissioned carrier designed and built from the keel up as an aircraft carrier?",
        "answer":"USS Ranger CV-4",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS George HW Bush.jpg",
        "question":"What type of power is used in todays by U.S. Navy Carriers?",
        "answer":"Nuclear Power (CVN)",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"FA 18.jpg",
        "question":"What is the primary Weapon System of the Carrier?",
        "answer":"Aircraft",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Chicago.jpg",
        "question":"When did the ship type \"Cruiser\" evolve?",
        "answer":"1800's",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Chicago.jpg",
        "question":"The word \"Cruiser\" was first used by the English when referring to a ship in what year?",
        "answer":"1651",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Port Royal CG-73.jpg",
        "question":"What is the role of the \"Cruiser\"?",
        "answer":"Battle Force support",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Cruiser Weapons.jpg",
        "question":"Besides the Vertical Launch Missiles, what other type weapons do Cruisers use?",
        "answer":"Phalanx CIWS",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Bainbridge DD-1.jpg",
        "question":"In the late 1890's, what type of boat was created to counter the new \"Torpedo Boat\" threat to Battleships?",
        "answer":"Destroyers",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Gravely DDG-107.jpg",
        "question":"What is the role of todays Destroyer",
        "answer":"Perform patrol, search and rescue operations",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Destroyer - Weapons.jpg",
        "question":"Destroyer weapons include 80 AVLS cells for what 3 types of missiles?",
        "answer":"Tomahawk, ESSM, and Standard",
        "fun":"Other weapons include AGS 155 mm guns, Long-range land attack projectiles 155mm, and MK-46 close-in guns",
        "type":"Ships"
    },
    {
        "image":"USS Constitution.jpg",
        "question":"What is the 18th century term for ships built for speed with at least 28 carriage mounted guns?",
        "answer":"Frigates",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Constitution.jpg",
        "question":"What year was the USS Constitution commissioned?",
        "answer":"1794",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Frigate - Mission.jpg",
        "question":"What is the Frigate's primary mission?",
        "answer":"Protection of shipping",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Samuel B Roberts.jpg",
        "question":"The Frigate's weapon system includes which torpedoes?",
        "answer":"MK-46",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Freedom LCS-1.jpg",
        "question":"What is the mission of the Littoral Combat Ship Class (LCS)?",
        "answer":"Counter Submarine threats, mine threats, and small surface craft attacks.",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Independence LCS-2.jpg",
        "question":"What weapons do the LCS-1 and LCS-2 classes carry?",
        "answer":"57mm/70 MK BEA systems, RIM-116 Surface to Air missiles, Phalanx CIWS",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Lapwing.jpg",
        "question":"Name the first ship built and commissioned specifically to locate and destroy mines.",
        "answer":"The USS Lapwing",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS YMS-143.jpg",
        "question":"At the beginning of WW II, what was the wooden hulled minesweeper called?",
        "answer":"Auxiliary Motor Minesweeper (YMS)",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Chief MCM-14.jpg",
        "question":"When did the Navy develop the new Minesweeper as part of the Mine Countermeasures (MC) force?",
        "answer":"early 1980's",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Mine Warfare Ship Mission.jpg",
        "question":"Mine warfare ships use cable cutting, mine detonating devices video and ____________",
        "answer":"Sonar",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Mine Warfare Weapons.jpg",
        "question":"What type of grenade launcher is used on Mine Warfare ships?",
        "answer":"MK-19 grenade launchers",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Amphibious Ships Mission.jpg",
        "question":"Prior to WWII, what equipment was lacking onboard Navy ships,  preventing them from discharging tanks or heavy equipment?",
        "answer":"Cranes",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Amphibious Ships Mission.jpg",
        "question":"Within an Expeditionary Strike Group, what type ship is a key element in Seapower 21's Sea Strike and Sea Basing?",
        "answer":"Amphibious Assault Ships",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"LHA LHD Ships.jpg",
        "question":"Besides helicopters and landing craft what other vehicle is used  on LHA/LHD ships to transport/land Marines?",
        "answer":"amphibious vehicles",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS San Diego LPD-22.jpg",
        "question":"What other vehicle besides a helicopter is used to transport and land personnel and equipment via amphibious transport docks (LPD)?",
        "answer":"landing craft",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"RAM.jpg",
        "question":"What does RAM stand for when referring to the LHA/LHD/LPD weapons?",
        "answer":"Rolling Airframe Missile (RAM)",
        "fun":"LHA/LHD/LPD weapons include: Sea Sparrow, Phalanx, and Twin .50 cal. Machine guns",
        "type":"Ships"
    },
    {
        "image":"LCAC.jpg",
        "question":"What does LCAC stand for?",
        "answer":"Landing Craft Air Cushion",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Pearl Harbor LSD-52.jpg",
        "question":"Other than guns, what type weapons does the LSD have?",
        "answer":"Phalanx CIWS",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Alligator.jpg",
        "question":"Name the 1861 Union Navy's first submarine, 47 foot oar propelled?",
        "answer":"\"Alligator\"",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Holland.jpg",
        "question":"What was the name of the first submarine purchased and commissioned by the Navy.",
        "answer":"The USS Holland (SS-1)",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Blueback SS-581.jpg",
        "question":"When was the last diesel powered submarine decommissioned?",
        "answer":"1990",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Wyoming SSBN-742.jpg",
        "question":"What type submarine is the Ohio Class submarine?",
        "answer":"Ballistic and Cruise Missile",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS North Dakota SSN-742.jpg",
        "question":"What type submarine is the Virginia Class submarine?",
        "answer":"Attack",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Seawolf SSN-21.jpg",
        "question":"What type submarine is the Seawolf/Los Angles Class submarine?",
        "answer":"Fast Attack",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS North Dakota SSN-742.jpg",
        "question":"What type of Missiles does the Virginia Class carry?",
        "answer":"Tomahawk (12 vertical tubes)",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Seawolf SSN-21.jpg",
        "question":"What type of Missiles and Torpedoes do the Seawolf/Los Angles carry?",
        "answer":"Tomahawk missile and MK-48 torpedoes",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"Auxiliary.jpg",
        "question":"In 1948, all military sea transport was placed under Navy Command, what organization was created?",
        "answer":"Military Sea Transportation Service (MSTS)",
        "fun":"",
        "type":"Auxiliary"
    },
    {
        "image":"Auxiliary.jpg",
        "question":"What weapons are carried on the Auxiliary ships?",
        "answer":"20mm Phalanx CIWS and 7.62 MM machine guns",
        "fun":"",
        "type":"Auxiliary"
    },
    {
        "image":"Auxiliary.jpg",
        "question":"What is the purpose of the Fast Combat support Ships (T-AOE)?",
        "answer":"Carry fuel, ammunition and supplies",
        "fun":"",
        "type":"Auxiliary"
    },
    {
        "image":"Unmanned Surface Vessels.jpg",
        "question":"How are the four classes of Unmanned Surface Vessels (USV) determined?",
        "answer":"Size and Mission",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Rigid Inflatable Boat.jpg",
        "question":"The Harbor Class (USV) is what size Rigid inflatable boat (RIB)",
        "answer":"7 meters",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Snorkler Class.jpg",
        "question":"The Snorkler Class (USV) is a semi-submersible craft capable of what speeds?",
        "answer":"15+ knots",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Fleet Class.jpg",
        "question":"The Fleet Class (USV) is capable of  speeds up to?",
        "answer":"32-35 knots",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Unmanned Underwater Vehicles.jpg",
        "question":"What does REMUS stand for when referring to Unmanned Underwater Vehicles (UUV)?",
        "answer":"Remote Environmental Monitoring Unit System",
        "fun":"",
        "type":"Unmanned Underwater Vehicles"
    },
    {
        "image":"FA-18 Super Hornet.jpg",
        "question":"Evolution of warfare and conflict areas require what type capability?",
        "answer":"multi-role",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"FA-18 Super Hornet2.jpg",
        "question":"F/A-18 Super Hornet is capable of in-flight _______?",
        "answer":"fueling",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"FA 18 Super Hornet Weapons.jpg",
        "question":"Name the 2 types of bombs on the F/A-18 Super Hornet?",
        "answer":"Laser Guided and General Purpose",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"P-3 Orion.jpg",
        "question":"What aircraft replaced the P-3 Orion?",
        "answer":"P-8 Poseidon",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"P-8 Poseidon.jpg",
        "question":"Other missions of the P-8 Poseidon includes Maritime Patrol, Littoral Operations, Anti-surface Warfare, and ______________.",
        "answer":"Reconnaissance",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"C-2 Greyhound.jpg",
        "question":"Name Three Transport Aircraft?",
        "answer":"C-130, KC-130, and C-2",
        "fun":"KC-130 Hercules - configured as inflight refueling platform (K)",
        "type":"Aircraft"
    },
    {
        "image":"Transport Weapons.jpg",
        "question":"Which of the 3 Transport Aircraft is unarmed?",
        "answer":"C-2",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"EA-18G Growler.jpg",
        "question":"Name the tactical jamming system on the EA-18G Growler?",
        "answer":"ALQ-99",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"E2 Hawkeye.jpg",
        "question":"The E2 Hawkeye is responsible for combat search and ________",
        "answer":"rescue",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"Helicopter.jpg",
        "question":"What are the 3 types of H-60 helicopters and primary mission?",
        "answer":"SH-60 Anti-submarine, \nHH-60 Search and Rescue, \nMH-60 VERTREP",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"AGM-119 missile.jpg",
        "question":"What type of machine gun does the H-60 carrry? ",
        "answer":"GAU-21 .50 cal.",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"MH-53 Sea Dragon.jpg",
        "question":"The MH-53 Sea Dragon provides ___________ support.",
        "answer":"Assault",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"MQ-4C Triton.jpg",
        "question":"What is the mission of the MQ-4C Triton?",
        "answer":"Real time intelligence reconnaissance, maritime surveillance, and search and rescue",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"X-47B Unmanned Combat Air System.jpg",
        "question":"What type of drone is the X-47B UCAS?",
        "answer":"Strike Fighter",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"MQ-8C Fire Scout.jpg",
        "question":"What is the mission of the MQ-8C Fire Scout unmanned helicopter?",
        "answer":"Ship based intelligence gathering",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"USS Langley.jpg",
        "question":"Prior to conversion to a carrier, what type of a ship was the USS Langley?",
        "answer":"Collier",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Ranger.jpg",
        "question":"During WWII, the aircraft carrier became the backbone of Navy Task Forces.  What ship did it replace?",
        "answer":"Battleship",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS George HW Bush.jpg",
        "question":"What is the carriers mission? ",
        "answer":"Carry, Launch, and Retrieve Aircraft Quickly, Efficiently and Safely.",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"FA 18.jpg",
        "question":"What does CIWS stand for in Phalanx CIWS?",
        "answer":"Close in Weapons System",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Chicago.jpg",
        "question":"What changed, requiring the need for a middle sized ship (Cruiser)?",
        "answer":"Emerging change in Naval strategy.",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Chicago.jpg",
        "question":"What were negative factors for early armored steel ships? ",
        "answer":"The were slow with limited endurance. ",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Port Royal CG-73.jpg",
        "question":"True or False: The cruiser has the capability of supporting carrier battle groups, amphibious forces and operating independently",
        "answer":"TRUE",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Bainbridge DD-1.jpg",
        "question":"After WWII, what changed the Destroyers role as a counter to Torpedo Boats?",
        "answer":"Introduction of Guided Missiles",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Gravely DDG-107.jpg",
        "question":"At the start of the 21st century, what three countries operate the heavier class Destroyer?",
        "answer":"United States, Russia and Peru",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Constitution.jpg",
        "question":"By the end of 2015, what Force will the remaining Frigates be part of? ",
        "answer":"Acrive Reserve",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Constitution.jpg",
        "question":"When commissioned why was the USS Constitution considered a \"Frigate\"?",
        "answer":"Because principle armament was still mounted on a single deck.",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Freedom LCS-1.jpg",
        "question":"How was the multi-mission capability achieved on the LCS? ",
        "answer":"Introduction of the module concept, allowing the ship to change mission packages.",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Independence LCS-2.jpg",
        "question":"Which LCS class is larger in size?",
        "answer":"LCS 2",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS Lapwing.jpg",
        "question":"Prior to 1917, what type Navy ships were used to locate and destroy mines? ",
        "answer":"Sloops and Tugs",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"USS YMS-143.jpg",
        "question":"How are mines detonated on the Avenger class mine sweeper?",
        "answer":"Remote Control",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Amphibious Ships Mission.jpg",
        "question":" What forced the Navy to focus on developing specific mission ships.",
        "answer":"The need to land troops and equipment from the sea",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"LHA LHD Ships.jpg",
        "question":"Which Amphibious ship primarily uses the the LCAC to move heavy equipment and troops.",
        "answer":"Dock Landing Ship (LSD)",
        "fun":"",
        "type":"Ships"
    },
    {
        "image":"Alligator.jpg",
        "question":"Why was the Alligator was unable to finish it's first mission?  ",
        "answer":"Because it was underpowered, unwieldy and unsafe",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Holland.jpg",
        "question":"How many torpedoes was the USS Holland (SS-1) able to carry?",
        "answer":"Three",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Blueback SS-581.jpg",
        "question":"Which war did submarines see their greatest success?",
        "answer":"a. WW I\nb. WW II (correct)\nc. Korea\nd. Vietnam",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Wyoming SSBN-742.jpg",
        "question":"Where are the \"sail planes\" located on the Ohio Class submarine?",
        "answer":"Conning Tower",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS North Dakota SSN-742.jpg",
        "question":"What was the name of the last diesel submarine decommissioned in 1990?",
        "answer":"USS Blue Back (SS-581)",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS North Dakota SSN-742.jpg",
        "question":"What is the primary mission of the Virginia Class Submarine? ",
        "answer":"Seek and destroy enemy submarine and surface ships",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"USS Seawolf SSN-21.jpg",
        "question":"Which class of submarine is the Seawolf replacing?",
        "answer":"Los Angeles",
        "fun":"",
        "type":"Submarine"
    },
    {
        "image":"Auxiliary.jpg",
        "question":"In 1970, the Military Sea Transportation Service (MSTS) was rename ____________________. ",
        "answer":"Military Sealift Command (MSC)",
        "fun":"",
        "type":"Auxiliary"
    },
    {
        "image":"Auxiliary.jpg",
        "question":"What type of auxiliary ship is an \"AS\"?",
        "answer":"Submarine Tender",
        "fun":"",
        "type":"Auxiliary"
    },
    {
        "image":"Unmanned Surface Vessels.jpg",
        "question":"What is the maximum size of the X-class USV?",
        "answer":"3 meters.",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Rigid Inflatable Boat.jpg",
        "question":"True or False, The Harbor Class USV is capable of speeds not to exceed 35 knots.",
        "answer":"False, can exceed 35 knots",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Snorkler Class.jpg",
        "question":"What is the speed of the Snorkler Class USV?",
        "answer":"15 plus knots",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Fleet Class.jpg",
        "question":"The Fleet Class USV is an 11 meter, planeing and _____________hull craft.",
        "answer":"Semi-planeing",
        "fun":"",
        "type":"Unmanned Surface Vessels"
    },
    {
        "image":"Unmanned Underwater Vehicles.jpg",
        "question":"What class UUV is designed to search, classify and map shallow water",
        "answer":"Swordfish/Kingfish",
        "fun":"",
        "type":"Unmanned Underwater Vehicles"
    },
    {
        "image":"FA-18 Super Hornet2.jpg",
        "question":"What type aircraft is a Day/night precision strike, all weather fighter/attack aircraft",
        "answer":"F/A-18",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"FA 18 Super Hornet Weapons.jpg",
        "question":"The F/A-18 Super Hornet can conduct ________________ and air defense suppression",
        "answer":"Close air support",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"P-3 Orion.jpg",
        "question":"What is the primary mission of the P-8 Poseidon? ",
        "answer":"Submarine Patrol (P)",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"Transport Weapons.jpg",
        "question":"The C-130 and KC-130 are not normally armed, but can be configured to _________________.",
        "answer":"Launch missiles",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"EA-18G Growler.jpg",
        "question":"The EA-18G Growler has the capability to launch Air to Air Missiles & ____________________.",
        "answer":"AGM-88 missiles",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"E2 Hawkeye.jpg",
        "question":"True or False, the E2 Hawkeye carries no offensive weapons",
        "answer":"TRUE",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"AGM-119 missile.jpg",
        "question":"What other weapons can the H-60 carry? ",
        "answer":"Hellfire missiles, Rockets, AGM-119 Anti-ship missiles",
        "fun":"",
        "type":"Aircraft"
    },
    {
        "image":"MQ-4C Triton.jpg",
        "question":"Which aircraft is considered \"The Future\" of Unmanned Aircraft?",
        "answer":"Triton",
        "fun":"",
        "type":"Aircraft"
    }
    ]
};