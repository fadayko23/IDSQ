(function () {
  const DEFAULT_CONFIG = {
    mountSelector: '#idsq-root',
    introVariant: 'classic', // 'classic' | 'guide-panel'
    brand: {
      primaryColor: '#363636',
      accentColor: '#363636',
      textColor: '#363636',
      fontFamily: "'Montserrat', sans-serif",
      fontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap',
      logoUrl: null,
    },
    copy: {
      introTitle: 'Interior Design Style Quiz',
      introDescription: 'Hi! I\'m Clara, your interior design expert from JL Coates.',
      introDescriptionLine2: 'Let me guide you through a personalized quiz to discover your unique design style and curate the perfect space for you.',
      claraProfileUrl: 'https://cdn.prod.website-files.com/642ba20158f55771b829e704/6901933410173c0b15007271_Clara%20Headshot.webp', // Clara's circular profile picture
      startButton: 'Start Quiz',
      namePromptTitle: 'Let\'s get started!',
      namePromptDescription: 'I\'d love to personalize this experience for you. What\'s your first name?',
      namePlaceholder: 'Name (Optional)',
      nameSkip: 'Continue without name',
      spaceSelectionTitle: 'What space are you designing?',
      spaceSelectionDescription: 'Select the area you\'d like to style. This helps us curate visuals tailored to your project.',
      nextButton: 'Next',
      submitButton: 'See My Style',
      loadingMessage: 'Saving your selections…',
      successTitle: 'Your Interior Design Style',
      successDescription: 'Based on your picks, this is the style that suits you best.',
      retryButton: 'Restart Quiz',
      errorTitle: 'Something went wrong',
      errorDescription: 'We were unable to save your result. Please try again.',
      wordAssociationTitle: 'Which word resonates with you?',
      wordAssociationDescription: 'Take a moment and let your intuition guide you—choose the word that speaks to your heart.',
      scheduleCTATitle: 'Ready to bring your vision to life?',
      scheduleCTADescription: 'Schedule a complimentary discovery call with our team.',
      scheduleButton: 'Schedule Your Complimentary Call',
    },
    webhook: {
      url: null, // Set this in Webflow when initializing the quiz
      headers: { 'x-make-apikey': null }, // Set this in Webflow when initializing the quiz
      enable: true,
    },
    leadCapture: {
      enable: true,
      requireEmail: true,
    },
    wordAssociation: {
      words: [
        { word: 'Serene', styleIds: ['coastal', 'traditional'], size: 'large' },
        { word: 'Bold', styleIds: ['modern', 'industrial'], size: 'medium' },
        { word: 'Warm', styleIds: ['farmhouse', 'rustic'], size: 'small' },
        { word: 'Timeless', styleIds: ['traditional', 'transitional'], size: 'large' },
        { word: 'Sleek', styleIds: ['modern', 'contemporary'], size: 'medium' },
        { word: 'Organic', styleIds: ['coastal', 'rustic'], size: 'small' },
        { word: 'Elegant', styleIds: ['traditional', 'contemporary'], size: 'large' },
        { word: 'Minimal', styleIds: ['modern', 'contemporary'], size: 'medium' },
        { word: 'Raw', styleIds: ['industrial', 'modern'], size: 'small' },
        { word: 'Cozy', styleIds: ['rustic', 'farmhouse'], size: 'medium' },
        { word: 'Refined', styleIds: ['traditional', 'midcentury'], size: 'large' },
        { word: 'Natural', styleIds: ['coastal', 'rustic'], size: 'small' },
        { word: 'Classic', styleIds: ['traditional', 'rustic'], size: 'medium' },
        { word: 'Chic', styleIds: ['modern', 'contemporary'], size: 'small' },
        { word: 'Textured', styleIds: ['rustic', 'farmhouse'], size: 'large' },
        { word: 'Sophisticated', styleIds: ['traditional', 'contemporary'], size: 'large' },
        { word: 'Bright', styleIds: ['coastal', 'contemporary'], size: 'medium' },
        { word: 'Comfortable', styleIds: ['farmhouse', 'traditional'], size: 'large' },
        { word: 'Structured', styleIds: ['modern', 'industrial'], size: 'small' },
        { word: 'Luxurious', styleIds: ['traditional', 'transitional'], size: 'medium' },
        { word: 'Nautical', styleIds: ['coastal', 'rustic'], size: 'small' },
        { word: 'Vintage', styleIds: ['rustic', 'farmhouse'], size: 'large' },
        { word: 'Clean', styleIds: ['modern', 'contemporary'], size: 'medium' },
        { word: 'Inviting', styleIds: ['coastal', 'farmhouse'], size: 'small' },
      ].sort(() => Math.random() - 0.5), // Randomize order
    },
    // Space-specific word association vocabulary
    wordAssociationBySpace: {
      'living-room': {
        prompt: 'Which word best captures the vibe of your ideal living room?',
        words: ['Serene','Inviting','Eclectic','Polished','Grounded','Sun-kissed','Warm','Streamlined','Effortless','Vibrant','Refined','Rustic','Harmonious','Sophisticated','Breezy','Centered','Layered','Minimal','Playful','Balanced','Moody','Natural','Textural','Bright']
      },
      bedroom: {
        prompt: 'Your dream bedroom feels…',
        words: ['Tranquil','Romantic','Cozy','Airy','Dramatic','Uncluttered','Soulful','Balanced','Intimate','Glamorous','Grounded','Pure','Nostalgic','Polished','Calm','Expressive','Earthy','Structured','Serene','Warm','Luxurious','Inviting','Effortless','Mindful']
      },
      kitchen: {
        prompt: 'When I imagine my kitchen, it feels…',
        words: ['Refreshing','Grounded','Vibrant','Timeless','Minimal','Robust','Earthy','Sophisticated','Inviting','Natural','Crisp','Mediterranean','Warm','Centered','Playful','Elegant','Honest','Functional','Refined','Sunlit','Comforting','Expressive','Balanced','Textural']
      },
      bathroom: {
        prompt: 'Your bathroom should feel like a place to…',
        words: ['Recenter','Refresh','Indulge','Simplify','Escape','Restore','Ground','Awaken','Soothe','Recharge','Pamper','Cleanse','Unwind','Glow','Balance','Renew','Elevate','Nurture','Reflect','Calm','Invigorate','Rejuvenate','Breathe']
      },
      office: {
        prompt: 'When I’m in my ideal office, I feel…',
        words: ['Inspired','Grounded','Clear','Driven','Calm','Focused','Energized','Balanced','Creative','Composed','Minimal','Productive','Elevated','Organized','Tranquil','Sun-lit','Cozy','Visionary','Warm','Refreshing','Centered','Expressive','Natural','Mindful']
      },
      general: {
        prompt: 'If your home had a soul, it would be…',
        words: ['Harmonious','Collected','Earthbound','Breezy','Elevated','Organic','Nostalgic','Intentional','Minimal','Glamorous','Relaxed','Mediterranean','Centered','Balanced','Playful','Warm','Sophisticated','Luminous','Textured','Bold','Serene','Refined','Vibrant','Natural']
      }
    },
    spaceTypes: [
      { 
        id: 'living-room', 
        name: 'Living Room',
        icon: '🛋️',
        description: 'Social spaces for gathering and relaxation'
      },
      { 
        id: 'bedroom', 
        name: 'Bedroom',
        icon: '🛏️',
        description: 'Personal retreat and rest spaces'
      },
      { 
        id: 'kitchen', 
        name: 'Kitchen',
        icon: '🍳',
        description: 'Culinary spaces and dining areas'
      },
      { 
        id: 'bathroom', 
        name: 'Bathroom',
        icon: '🛁',
        description: 'Wellness and rejuvenation spaces'
      },
      { 
        id: 'office', 
        name: 'Office',
        icon: '💼',
        description: 'Productive and inspiring work spaces'
      },
      { 
        id: 'general', 
        name: 'Whole Home',
        icon: '🏠',
        description: 'Overall design aesthetic across all spaces'
      },
    ],
    stepsBySpace: {},
    styleLibrary: {
      coastal: {
        styleName: 'Coastal',
        description: 'In the simplest definition, coastal is beachy. Through use of natural light, soft tones, and a clean aesthetic, it\'s meant to evoke the breeziness of the beach. Basically, it feels like summer year-round inside your house.',
        dna: [
          'Palette: white, sand, driftwood, sea‑glass, soft navy',
          'Materials: slipcovered linen, woven fibers, bleached oak, zellige tile',
          'Mood: breezy, bright, unfussy—no kitsch',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d4ca4e33e9a1def6e_img_coastal_calm_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483ee16912d63c48c2e_img_coastal_calm_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056546f32278db08e27bab_img_coastal_calm_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652eed6893053524abe1_img_coastal_calm_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563c1d0ca349e8dfef6_img_coastal_calm_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578af055fb069a380bb_img_coastal_calm_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644cc9aae0ebc6e9c9a9_img_coastal_calm_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644cdf0aeff5e0965fc8_img_coastal_calm_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648388ab8f08dc40b941_img_coastal_calm_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483d9f948e913aedafc_img_coastal_calm_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905654847fdcc9099936907_img_coastal_calm_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905654891b42069ab00276f_img_coastal_calm_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e3869f6df4427d2d0_img_coastal_calm_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652cf1275ff75918a5b4_img_coastal_calm_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565625445a6ffd8d860a9_img_coastal_calm_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565620246e7da092ecd50_img_coastal_calm_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578682db18ae5840eec_img_coastal_calm_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565788741ca49d89b0959_img_coastal_calm_whole_home_2.webp'
          ]
        },
      },
      farmhouse: {
        styleName: 'Farmhouse',
        description: 'Defined by practicality and comfort, relying on readily available materials and colors. Wood elements and white tones are indicative of farmhouse style. Timber was the easiest to come by, which is why there\'s such an emphasis on wood elements.',
        dna: [
          'Palette: warm whites, oat, inky black accents, honey oak',
          'Materials: shaker profiles, oak, linen, matte black metal, stone',
          'Details: vintage/heritage pieces, lantern lighting, practical layouts',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d22c96660e3b45224_img_modern_farmhouse_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648345aaebb925bfa843_img_modern_farmhouse_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905654628b0a2b4b21b3d2a_img_modern_farmhouse_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e9cc5800d63b3a111_img_modern_farmhouse_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565637fd213ececfb4f10_img_modern_farmhouse_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565772a91dc8d9d0d3d21_img_modern_farmhouse_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644cba4f34fd81ecf144_img_modern_farmhouse_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644ce1d1a44fead88092_img_modern_farmhouse_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564822ffa012eed107a9c_img_modern_farmhouse_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648323267fc0429161c0_img_modern_farmhouse_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548acf6ee79cde1b461_img_modern_farmhouse_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548a50647edced43b83_img_modern_farmhouse_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e052d6cf87d655b3b_img_modern_farmhouse_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e78b00d1adcf012d9_img_modern_farmhouse_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565626d1cdc06e03f756b_img_modern_farmhouse_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056562ec21d6240a006345_img_modern_farmhouse_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578488f2efb9b63b432_img_modern_farmhouse_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578d35ab9e355e5174a_img_modern_farmhouse_whole_home_2.webp'
          ]
        },
      },
      transitional: {
        styleName: 'Transitional',
        description: 'Reflective of a room\'s meshing of modern and traditional elements — essentially, combining two styles in one space, resulting in a cohesive design.',
        dna: [
          'Palette: warm neutrals with navy/moss accents',
          'Materials: oak, walnut, marble, unlacquered brass, polished nickel',
          'Silhouettes: tailored upholstery, eased corners, symmetry',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644c1cf8ea6387ddf911_img_transitional_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648322c96660e3b454dd_img_transitional_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565478f2f646d197e5d4e_img_transitional_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e61bc414e8b9a96d2_img_transitional_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565631cf8ea6387de103a_img_transitional_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565785f034ebae2383152_img_transitional_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644c6baea1b9e4248640_img_transitional_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d3472b1a5d793f491_img_transitional_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056481052d6cf87d654c06_img_transitional_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056482df0aeff5e0966380_img_transitional_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565482a9d46ce477fb32d_img_transitional_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056547e3adb40b14375e61_img_transitional_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652efba942ab18dfc674_img_transitional_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652c6b937486632b7337_img_transitional_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565630bf9cf1d37ae594c_img_transitional_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905656223267fc0429180a1_img_transitional_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578e255a5bd04b4ae4f_img_transitional_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056577c37bb9990473eacb_img_transitional_whole_home_2.webp'
          ]
        },
      },
      organic: {
        styleName: 'Organic Modern',
        description: 'Warm minimalism with tactile stone, wood, plaster and textiles. Clean lines, soft curves and quiet luxury that feels human.',
        dna: [
          'Palette: oat, toffee, chalky whites with black accents',
          'Materials: limewash/plaster, travertine/soapstone, linen, patinated metals',
          'Forms: soft curves, radius corners, fluted details',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644ce5db4eec07fa934e_img_organic_modern_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564837def701a5474520d_img_organic_modern_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548e232d26519badea8_img_organic_modern_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ebe1d329070b6de1c_img_organic_modern_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056562a2f8dc978c4f86ca_img_organic_modern_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565781f5f5634c747bf1a_img_organic_modern_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644ceeeac73af8da7f04_img_organic_modern_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644dee34987375c5e8d3_img_organic_modern_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056484ba5b322c920cd8a2_img_organic_modern_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483f81dfc4feb786ba8_img_organic_modern_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056547d3cf4b078dab054b_img_organic_modern_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548e922510d6f884dcf_img_organic_modern_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ef32278db08e27a88_img_organic_modern_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e186df51a95830a9a_img_organic_modern_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563f4b0cf99ff13c62e_img_organic_modern_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563abe48fbb717dda02_img_organic_modern_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565783db7147ec8b48551_img_organic_modern_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056577de4d90e37b78b319_img_organic_modern_whole_home_2.webp'
          ]
        },
      },
      japandi: {
        styleName: 'Japandi',
        description: 'Serene fusion of Japanese and Scandinavian design: crafted, nature‑centric, calm lines and negative space.',
        dna: [
          'Palette: mushroom, ecru, carbon, muted indigo, warm timber',
          'Materials: ash/oak, rattan/paper, linen/wool, stone',
          'Principles: restraint, craftsmanship, nature indoors',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644dbb522b18602b8cc7_img_japandi_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483556e431556827ee4_img_japandi_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548bc69da848bb0919a_img_japandi_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e7e5e0806c770d399_img_japandi_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565621f1312a7bd7f3d9f_img_japandi_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565784ca4e33e9a1e0358_img_japandi_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644deee3583ada22795d_img_japandi_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644e2b54031d3354d5b2_img_japandi_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564832b05f733a3982158_img_japandi_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648328b23d42c0af2ac3_img_japandi_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056546c9aae0ebc6e9dc8e_img_japandi_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905654672b17aa602622ffc_img_japandi_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ef75a34290bbb61e2_img_japandi_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e9f51f3e56dfc7ea2_img_japandi_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056562df0aeff5e0967298_img_japandi_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056562d72d3e3dcc0f5be4_img_japandi_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905657847fdcc9099936c82_img_japandi_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056577ffba28009d56168b_img_japandi_whole_home_2.webp'
          ]
        },
      },
      wabi: {
        styleName: 'Wabi‑Sabi',
        description: 'Beauty in imperfection—patina, asymmetry and restraint. Quiet, soulful materials and organic forms.',
        dna: [
          'Palette: tea‑stain, clay, stone, soot',
          'Materials: rough linen, hand‑thrown ceramics, reclaimed woods',
          'Mindset: repair over replace; local craft',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644eeeeac73af8da7f23_img_wabi_sabi_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564845acce4f55c5bd3fa_img_wabi_sabi_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565484de1a6dd1f18c5da_img_wabi_sabi_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056530548d3ac7520871f8_img_wabi_sabi_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056564647345b1ca35ad28_img_wabi_sabi_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565780d29e8d7ca09fe4e_img_wabi_sabi_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644de9fbe88b3dadbdea_img_wabi_sabi_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d0769ba82a5aec96c_img_wabi_sabi_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648340cf156c83719948_img_wabi_sabi_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648361bc414e8b9a873d_img_wabi_sabi_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565482d04d5b7b8f342e9_img_wabi_sabi_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905654872b17aa602623037_img_wabi_sabi_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e00e0c50f6fc304d7_img_wabi_sabi_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ed664fcab5451a967_img_wabi_sabi_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565633bebda64d9d6482d_img_wabi_sabi_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565626baea1b9e424989c_img_wabi_sabi_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905657e07f4bf8b0fd72605_img_wabi_sabi_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578e6c53609af204401_img_wabi_sabi_whole_home_2.webp'
          ]
        },
      },
      mediterranean: {
        styleName: 'Modern Mediterranean',
        description: 'Sun‑washed plaster, terracotta, travertine and linen with breezy indoor‑outdoor flow and relaxed luxe.',
        dna: [
          'Palette: chalk white, sand, terracotta, olive, sea‑blue',
          'Materials: tadelakt, hand‑formed tile, rustic woods, cane',
          'Lifestyle: cross‑breeze, light control, shaded terraces',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644edfcd1933b904b05c_img_modern_mediterranean_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056484601d387663e98bc5_img_modern_mediterranean_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565466f14f0635ab7d9fb_img_modern_mediterranean_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e6b937486632b7365_img_modern_mediterranean_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563c37bb9990473e714_img_modern_mediterranean_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905657875439e0ace2cba64_img_modern_mediterranean_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644df0a3628b67ac8641_img_modern_mediterranean_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d647345b1ca359622_img_modern_mediterranean_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648355c4891bc6fc24b2_img_modern_mediterranean_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648388b63b9e3883dc26_img_modern_mediterranean_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905654857c9dd69f39c3388_img_modern_mediterranean_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548654b10c032d03fa7_img_modern_mediterranean_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e0c2d304a9bd91d92_img_modern_mediterranean_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905653040df4b8d354dd95f_img_modern_mediterranean_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905656355c4891bc6fc3662_img_modern_mediterranean_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563bb522b18602b9d5d_img_modern_mediterranean_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578e765194fb8e71d6f_img_modern_mediterranean_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565788a5b750db27df959_img_modern_mediterranean_whole_home_2.webp'
          ]
        },
      },
      scandinavian: {
        styleName: 'Scandinavian',
        description: 'Cozy function with pale woods, artisan textiles and light. New Nordic brings folk color and layered warmth.',
        dna: [
          'Palette: warm neutrals, sky/ink blues; moss/rust accents',
          'Materials: oiled oak, wool, paper lamps, artisan rugs',
          'Approach: modular/repairable pieces, soft curves',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d052d6cf87d65484e_img_scandinavian_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564832b05f733a398215b_img_scandinavian_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548c43bef500a13f792_img_scandinavian_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e52f4b87e64b58494_img_scandinavian_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056562bb522b18602b9d16_img_scandinavian_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056577a6b6e302b44ab9ba_img_scandinavian_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d4c9d7d9d3867142c_img_scandinavian_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644c0c2d304a9bd90d19_img_scandinavian_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056482af055fb069a35ea0_img_scandinavian_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056482069324b2f04d63a8_img_scandinavian_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565482ffa012eed108c20_img_scandinavian_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056547fba942ab18dfc7f9_img_scandinavian_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e9c62aaf4a58a10cd_img_scandinavian_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e0fe986a737a46d55_img_scandinavian_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563ef0897619476f39f_img_scandinavian_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905656245aaebb925bfb527_img_scandinavian_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578906a44a312a4d487_img_scandinavian_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565788a94bcf8e61a05e6_img_scandinavian_whole_home_2.webp'
          ]
        },
      },
      artdeco: {
        styleName: 'Art Deco Revival',
        description: 'Geometry, symmetry and luxurious tactility—flutes, scallops, lacquer and jewel tones refined for today.',
        dna: [
          'Palette: emerald, teal, wine, navy, champagne, black',
          'Materials: velvet, lacquer, inlay marbles, ribbed glass, brass',
          'Motifs: scallops, flutes, stepped geometry',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d329fc367a02d716e_img_art_deco_revival_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056482d9ccaebd1b9fbb42_img_art_deco_revival_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548488f2efb9b63b0e0_img_art_deco_revival_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e0d3181fca448f08f_img_art_deco_revival_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565620769ba82a5aedf1d_img_art_deco_revival_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905657800e0c50f6fc30a52_img_art_deco_revival_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d8a94bcf8e619f294_img_art_deco_revival_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d1872352a506bd301_img_art_deco_revival_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483258ec2d0514d75bc_img_art_deco_revival_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564830c2d304a9bd912ca_img_art_deco_revival_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548a1ff08ac3c2141cd_img_art_deco_revival_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565480b60d29505e38c15_img_art_deco_revival_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e0468f4ae1479094e_img_art_deco_revival_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ec43bef500a13f620_img_art_deco_revival_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565628d1306fee09e6b58_img_art_deco_revival_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905656332e527952e2edda3_img_art_deco_revival_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565787e772d34c47ddcfb_img_art_deco_revival_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905657897c499392e4c4253_img_art_deco_revival_whole_home_2.webp'
          ]
        },
      },
      eclectic: {
        styleName: 'Eclectic Maximalism',
        description: 'Curated abundance—pattern‑mixing, heirlooms and saturated color, edited to feel intentional and joyful.',
        dna: [
          'Palette: layered mid‑tones with strategic brights',
          'Materials: chintz/stripes, trims, lacquer accents, gallery walls',
          'Habit: source vintage; re‑frame, re‑lacquer, re‑use',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644de3adb40b14374cbc_img_eclectic_maximalism_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564842086651fc2117fb9_img_eclectic_maximalism_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056547e255a5bd04b4a937_img_eclectic_maximalism_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e15ff0e6642bdd30b_img_eclectic_maximalism_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563dedc9102a6605d09_img_eclectic_maximalism_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056579e255a5bd04b4ae78_img_eclectic_maximalism_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d87f704505c7daec8_img_eclectic_maximalism_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d0fe986a737a45afc_img_eclectic_maximalism_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056484e39e220d3a4ba8c6_img_eclectic_maximalism_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483441e06e62cdb1efa_img_eclectic_maximalism_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565485389d91970a2c001_img_eclectic_maximalism_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565488aa7b8a2f0e776bc_img_eclectic_maximalism_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ecd32c2cba44d090a_img_eclectic_maximalism_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ee3385c218a4b0d70_img_eclectic_maximalism_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565638f2f646d197e62c0_img_eclectic_maximalism_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563e9fbe88b3dadceda_img_eclectic_maximalism_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565783db7147ec8b48555_img_eclectic_maximalism_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565785acce4f55c5be0df_img_eclectic_maximalism_whole_home_2.webp'
          ]
        },
      },
      softindustrial: {
        styleName: 'Soft Industrial',
        description: 'Warm minimalism with tactile stone, wood, plaster and textiles. Clean lines, soft curves and quiet luxury that feels human.',
        dna: [
          'Palette: oat, toffee, chalky whites with black accents',
          'Materials: limewash/plaster, travertine/soapstone, linen, patinated metals',
          'Forms: soft curves, radius corners, fluted details',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d1f5f5634c747a4ca_img_soft_industrial_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564827e772d34c47dcb3f_img_soft_industrial_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548588147c00035b3aa_img_soft_industrial_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652edfcd1933b904bdcf_img_soft_industrial_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565620913a6148c9baefa_img_soft_industrial_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905657a4e4ab9220fbff6b4_img_soft_industrial_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644e906a44a312a4c5ac_img_soft_industrial_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d1627c6b8ea3f8fa9_img_soft_industrial_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564831d08a4863fa4a590_img_soft_industrial_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483de4d90e37b78a40d_img_soft_industrial_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565462a91dc8d9d0d38e5_img_soft_industrial_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056548bb1224bc043048c1_img_soft_industrial_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652e86dd50aa280bb680_img_soft_industrial_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905652ed35ab9e355e512e3_img_soft_industrial_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905656397c499392e4c410f_img_soft_industrial_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056564ceb9830c2cbf1513_img_soft_industrial_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056579d430f4ac28075ccd_img_soft_industrial_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905657928b0a2b4b21b3eef_img_soft_industrial_whole_home_2.webp'
          ]
        },
      },
      desert: {
        styleName: 'Desert Modern',
        description: 'Southwestern minimalism—sun‑washed clay tones, sage greens, oxidized metals and indoor‑outdoor continuity.',
        dna: [
          'Palette: sun‑washed clay, sand, sage, oxidized metal',
          'Materials: limewash/clay plaster, travertine/cantera stone, warm woods, woven wool',
          'Ambiance: filtered desert light, indoor‑outdoor continuity, artisanal craft',
        ],
        finalImages: [
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644c474d15cd18c55ec0_img_desert_modern_living_room_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648372b17aa6026222df_img_desert_modern_bedroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905654878b00d1adcf015ce_img_desert_modern_kitchen_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483186df51a9582fe26_img_desert_modern_bathroom_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565634d6e8805f3875e36_img_desert_modern_office_3.webp',
          'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565781c5ca3e74c516c2f_img_desert_modern_whole_home_3.webp'
        ],
        imagesByRoom: {
          'living-room': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d3869f6df4427c121_img_desert_modern_living_room_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905644d7538ea5c8755b908_img_desert_modern_living_room_2.webp'
          ],
          'bedroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483a44ad1c6defeb0f8_img_desert_modern_bedroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056483abe48fbb717dcbe2_img_desert_modern_bedroom_2.webp'
          ],
          'kitchen': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565487def701a54745f14_img_desert_modern_kitchen_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565480246e7da092ecb97_img_desert_modern_kitchen_2.webp'
          ],
          'bathroom': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690564838741ca49d89af3c9_img_desert_modern_bathroom_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/6905648433139381a6ee791c_img_desert_modern_bathroom_2.webp'
          ],
          'office': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056563069324b2f04d74b0_img_desert_modern_office_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565632d48ef2a51151135_img_desert_modern_office_2.webp'
          ],
          'whole-home': [
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/690565785445a6ffd8d86313_img_desert_modern_whole_home_1.webp',
            'https://s3.amazonaws.com/webflow-prod-assets/642ba20158f55771b829e704/69056578654b10c032d04865_img_desert_modern_whole_home_2.webp'
          ]
        },
      },
    },
  };

  // Build dynamic 4-round step set covering 12 styles (3 options x 4 rounds)
  function buildDynamicStepsFromLibrary(library, spaceId = 'general') {
    // Map space IDs to match style library room keys
    const spaceMap = {
      'general': 'whole-home'  // Whole Home option maps to whole-home images
    };
    const mappedSpaceId = spaceMap[spaceId] || spaceId;
    
    const styleKeys = Object.keys(library);
    // Prefer the 12 target styles when present
    const preferred = ['transitional','organic','japandi','wabi','mediterranean','scandinavian','artdeco','eclectic','softindustrial','coastal','farmhouse','desert'];
    const ordered = preferred.filter(k => library[k]).concat(styleKeys.filter(k => !preferred.includes(k)));
    const twelve = ordered.slice(0, 12);
    const rounds = [];
    for (let r = 0; r < 4; r++) {
      const options = [];
      for (let c = 0; c < 3; c++) {
        const key = twelve[r * 3 + c];
        const def = library[key];
        if (!def) continue;
        
        // Get room-specific image from imagesByRoom
        let img = null;
        if (def.imagesByRoom && def.imagesByRoom[mappedSpaceId] && def.imagesByRoom[mappedSpaceId].length > 0) {
          // Use first image from the room-specific array (_1 or _2)
          img = def.imagesByRoom[mappedSpaceId][0];
        } else {
          // Fallback to living-room if space not available
          if (def.imagesByRoom && def.imagesByRoom['living-room'] && def.imagesByRoom['living-room'].length > 0) {
            img = def.imagesByRoom['living-room'][0];
          } else {
            // Final fallback to first finalImages
            img = def.finalImages && def.finalImages[0];
          }
        }
        
        options.push({
          id: `${key}-${r+1}-${c+1}`,
          styleId: key,
          title: def.styleName,
          imageUrl: img || 'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?auto=format&fit=crop&w=900&q=80',
        });
      }
      rounds.push({ id: `round-${r+1}`, prompt: r===0 ? 'Which look pulls you in?' : r===1 ? 'Which space feels right?' : r===2 ? 'Which aesthetic speaks to you?' : 'Which style feels most like home?', options });
    }
    return rounds;
  }

  function deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  function getOrCreateSessionId() {
    try {
      const key = 'idsq-session-id';
      let id = localStorage.getItem(key);
      if (!id) {
        id = Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem(key, id);
      }
      return id;
    } catch (e) {
      return 'unknown';
    }
  }

  function buildWebhookPayload(config, state) {
    const spaceDef = (config.spaceTypes || []).find(s => s.id === state.selectedSpace);
    const selections = (state.choices || []).map((opt, idx) => opt ? ({
      round: idx + 1,
      optionId: opt.id || '',
      styleId: opt.styleId || '',
      styleName: (config.styleLibrary[opt.styleId]?.styleName) || opt.styleId || '',
      imageUrl: opt.imageUrl || ''
    }) : null).filter(Boolean);

    // Ensure all 12 style keys exist with numeric values
    const styleKeys = ['transitional','organic','japandi','wabi','mediterranean','scandinavian','artdeco','eclectic','softindustrial','coastal','farmhouse','desert'];
    const normalizedScores = {};
    styleKeys.forEach((k) => { normalizedScores[k] = 0; });
    if (state.styleScores) {
      Object.keys(state.styleScores).forEach((k) => {
        const v = Number(state.styleScores[k]);
        if (!Number.isNaN(v)) normalizedScores[k] = v;
      });
    }

    // Build payload matching Make's expected structure
    // If Make expects nested, keep nested; if flat, we'll adjust based on errors
    const payload = {
      meta: {
        quizId: 'idsq-v1',
        version: '1.0.0',
        timestampIso: new Date().toISOString(),
        sessionId: getOrCreateSessionId(),
      },
      participant: {
        name: state.leadData?.participantName || state.participantName || null,
        email: state.leadData?.email || null,
        newsletter: !!state.newsLetterSignup,
        invited: false,
        rid: null,
        cp: null,
      },
      context: {
        spaceId: state.selectedSpace || null,
        spaceName: spaceDef?.name || null,
        wordAssociation: {
          word: state.wordChoice?.word || null,
          styleIds: Array.isArray(state.wordChoice?.styleIds) ? state.wordChoice.styleIds : [],
},
      },
      selections: {
        rounds: selections,
      },
      results: {
        finalStyle: state.finalStyle ? {
          styleId: state.finalStyle.styleId || state.finalStyle.styleName,
          styleName: state.finalStyle.styleName,
          description: state.finalStyle.description || '',
          dna: Array.isArray(state.finalStyle.dna) ? state.finalStyle.dna : [],
          images: Array.isArray(state.finalStyle.finalImages) ? state.finalStyle.finalImages : [],
        } : {
          styleId: null,
          styleName: null,
          description: null,
          dna: [],
          images: [],
},
      },
    };

    // Ensure all required fields are present and properly formatted
    // Don't prune - Make needs all fields even if null/empty
    // But ensure arrays are always arrays (not null) and required fields exist
    if (!payload.results.finalStyle) {
      payload.results.finalStyle = null;
    }
    
    // Ensure arrays are never null
    if (!Array.isArray(payload.context.wordAssociation.styleIds)) {
      payload.context.wordAssociation.styleIds = [];
    }
    if (payload.results.finalStyle) {
      if (!Array.isArray(payload.results.finalStyle.dna)) {
        payload.results.finalStyle.dna = [];
      }
      if (!Array.isArray(payload.results.finalStyle.images)) {
        payload.results.finalStyle.images = [];
      }
    }
    if (!Array.isArray(payload.selections.rounds)) {
      payload.selections.rounds = [];
    }

    return payload;
  }

  async function sendToWebhook(config, payload) {
    if (!config.webhook || !config.webhook.enable || !config.webhook.url) return { ok: true, skipped: true };
    try {
      const headers = Object.assign({ 'Content-Type': 'application/json' }, config.webhook.headers || {});
      const res = await fetch(config.webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const text = await res.text().catch(() => '');
      return { ok: res.ok, status: res.status, body: text };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  }

  function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  function createElement(tag, className, attrs = {}) {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        el.setAttribute(key, value);
      }
    });
    return el;
  }

  function injectFont(config) {
    if (!config.brand || !config.brand.fontUrl) return;
    const existing = document.querySelector(`link[href="${config.brand.fontUrl}"]`);
    if (existing) return;
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = config.brand.fontUrl;
    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(link);
  }

  function showSection(mount, section) {
    const previous = mount.firstElementChild;
    if (!previous) {
      mount.innerHTML = '';
      mount.appendChild(section);
      requestAnimationFrame(() => section.classList.add('idsq-animate-in'));
      return;
    }
    previous.classList.remove('idsq-animate-in');
    previous.classList.add('idsq-animate-out');
    previous.addEventListener(
      'animationend',
      () => {
        mount.innerHTML = '';
        mount.appendChild(section);
        requestAnimationFrame(() => section.classList.add('idsq-animate-in'));
      },
      { once: true }
    );
  }

  function renderIntro(config, mount, handlers) {
    if (config.introVariant === 'guide-panel') {
      const section = createElement('section', 'idsq-quiz-hero');

      const header = createElement('header', 'idsq-hero-header');
      const eyebrow = createElement('p', 'idsq-eyebrow');
      eyebrow.textContent = 'JL Coates Interior Design Studio';
      const h1 = createElement('h1', 'idsq-hero-title');
      h1.textContent = 'Interior Design Style Quiz';
      const subtitle = createElement('p', 'idsq-subtitle');
      subtitle.textContent = 'Discover your signature style in minutes—guided by our design expert.';
      header.appendChild(eyebrow);
      header.appendChild(h1);
      header.appendChild(subtitle);

      // Start Quiz button positioned top right
      const ctaWrap = createElement('div', 'idsq-cta-wrap');
      const cta = createElement('button', 'idsq-button idsq-button-primary', { type: 'button', 'aria-label': 'Start the Interior Design Style Quiz' });
      cta.textContent = config.copy.startButton || 'Start Quiz';
      cta.addEventListener('click', handlers.onStart);
      ctaWrap.appendChild(cta);

      const guidePanel = createElement('div', 'idsq-guide-panel');
      const avatar = createElement('img', 'idsq-guide-avatar', {
        src: config.copy.claraProfileUrl,
        alt: 'Clara, your JL Coates interior design guide',
        width: '112',
        height: '112',
        loading: 'eager',
        decoding: 'async',
        draggable: 'false',
      });
      avatar.addEventListener('contextmenu', (e) => e.preventDefault());
      const guideCopy = createElement('div', 'idsq-guide-copy');
      const introLine = createElement('p', 'idsq-guide-intro');
      introLine.innerHTML = 'Hi! I\'m <strong>Clara</strong>, your interior design expert at <strong>JL Coates</strong>.';
      const followLine = createElement('p');
      followLine.innerHTML = 'I\'ll walk you through a <strong>personalized quiz</strong> to reveal your unique design style and curate a space you\'ll love—from finishes and furnishings to flow.';
      guideCopy.appendChild(introLine);
      guideCopy.appendChild(followLine);
      guidePanel.appendChild(avatar);
      guidePanel.appendChild(guideCopy);

      section.appendChild(header);
      section.appendChild(guidePanel);
      section.appendChild(ctaWrap);
      showSection(mount, section);
      return;
    }

    // classic (existing) intro
    const intro = createElement('section', 'idsq-intro');
    const claraWrapper = createElement('div', 'idsq-clara-profile-wrapper');
    const claraProfile = createElement('img', 'idsq-clara-profile', {
      src: config.copy.claraProfileUrl,
      alt: 'Clara - Your Interior Design Expert',
      draggable: 'false',
    });
    claraProfile.addEventListener('contextmenu', (e) => e.preventDefault());
    claraWrapper.appendChild(claraProfile);
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.introTitle;
    const description = createElement('p', 'idsq-description');
    description.innerHTML = 'Hi! I\'m <strong>Clara</strong>, your interior design expert from JL Coates.';
    const descriptionLine2 = createElement('p', 'idsq-description');
    descriptionLine2.innerHTML = 'Let me guide you through a <strong>personalized quiz</strong> to discover your unique design style and curate the perfect space for you.';
    const button = createElement('button', 'idsq-button idsq-button-primary');
    button.textContent = config.copy.startButton;
    button.addEventListener('click', handlers.onStart);
    intro.appendChild(claraWrapper);
    intro.appendChild(title);
    intro.appendChild(description);
    intro.appendChild(descriptionLine2);
    intro.appendChild(button);
    if (config.brand.logoUrl) {
      const logo = createElement('img', 'idsq-logo', {
        src: config.brand.logoUrl,
        alt: 'Brand logo',
        draggable: 'false',
      });
      logo.addEventListener('contextmenu', (e) => e.preventDefault());
      intro.insertBefore(logo, intro.firstChild);
    }
    showSection(mount, intro);
  }

  function isNameValid(name) {
    // Basic validation: check for length and structure
    if (!name || name.length < 2 || name.length > 50) {
      return false;
    }
    
    // Check for only whitespace
    if (name.trim().length === 0) {
      return false;
    }
    
    // Allow list of common legitimate names to reduce false positives
    const allowedNames = [
      'alex', 'sarah', 'david', 'michael', 'jennifer', 'james', 'mary', 'john', 'patricia',
      'robert', 'linda', 'william', 'barbara', 'richard', 'elizabeth', 'joseph', 'susan',
      'thomas', 'jessica', 'christopher', 'karen', 'charles', 'nancy', 'daniel', 'lisa',
      'matthew', 'betty', 'anthony', 'helen', 'mark', 'sandra', 'donald', 'donna',
      'steven', 'carol', 'paul', 'ruth', 'andrew', 'sharon', 'joshua', 'michelle',
      'kenneth', 'laura', 'kevin', 'sarah', 'brian', 'kimberly', 'george', 'deborah',
      'edward', 'jessica', 'ronald', 'stephanie', 'timothy', 'rebecca', 'jason', 'virginia',
      'jeremy', 'kathleen', 'ryan', 'pamela', 'jacob', 'martha', 'gary', 'debra',
      'nicholas', 'janet', 'eric', 'racha', 'jonathan', 'cynthia', 'stephen', 'mary',
      'larry', 'amy', 'justin', 'shirley', 'scott', 'angela', 'brandon', 'anna',
      'benjamin', 'brenda', 'samuel', 'pamela', 'frank', 'nicole', 'gregory', 'virginia',
      'raymond', 'samantha', 'alexander', 'katherine', 'patrick', 'emily', 'jack', 'melissa',
      'dennis', 'harold', 'joan', 'todd', 'amanda', 'wesley', 'kelly', 'sean', 'ashley'
    ];
    
    // If it's a common name, allow it
    if (allowedNames.includes(name.toLowerCase().trim())) {
      return true;
    }
    
    // Comprehensive NSFW profanity filter - extensive list of inappropriate words
    const inappropriateWords = [
      // Sexual explicit content
      'penis', 'vagina', 'dick', 'cock', 'pussy', 'cunt', 'clit', 'asshole', 'butthole', 'boob', 'boobs', 'tit', 'tits',
      'breast', 'nipple', 'dildo', 'vibrator', 'masturbate', 'orgasm', 'ejaculate', 'ejaculation', 'semen',
      'sex', 'fuck', 'cum', 'jizz', 'porn', 'porno', 'xxx', 'hentai', 'erotic', 'intercourse',
      'motherfucker', 'motherfuck', 'motherfucking', 'fucker', 'fucking', 'fucked', 'fucks', 'fuckin',
      
      // Body parts (vulgar)
      'vag', 'piss', 'pee', 'poop', 'shit', 'turd', 'fart',
      'ass', 'butt', 'booty', 'buttocks', 'anus',
      
      // Profanity and vulgar language
      'shit', 'bitch', 'bastard', 'slut', 'whore', 'hoe', 'prostitute', 'hooker',
      'crap', 'damn', 'hell', 'jerk', 'suck', 'dumb', 'stupid',
      'asshole', 'shithead', 'dickhead', 'cockhead', 'bastard', 'motherfucker',
      'screw', 'screwed', 'screwyou',
      
      // Hate speech and slurs
      'nigger', 'nigga', 'nazi', 'kkk', 'retard', 'retarded', 'autistic', 'spastic',
      'fag', 'faggot', 'fagot', 'homo', 'lesbian', 'dyke',
      'chink', 'gook', 'spic', 'wop', 'dago', 'kike', 'sheeny', 'wetback',
      
      // Sexual acts
      'masturbation', 'masturbating', 'blowjob', 'handjob', 'rimjob', 'gangbang',
      'orgy', 'threesome', 'anal', 'oral', 'bdsm', 'bondage',
      
      // Drug references
      'cocaine', 'heroin', 'meth', 'methamphetamine', 'crack', 'dope', 'weed',
      'marijuana', 'cannabis', 'coke', 'drug', 'drugs', 'stoned', 'high',
      'lsd', 'ecstasy', 'acid',
      
      // Violence and threats
      'kill', 'killing', 'killyou', 'murder', 'murderer', 'suicide', 'terrorist',
      'bomb', 'killmyself', 'killyourself', 'bombthreat',
      
      // Internet slang/vulgar
      'stfu', 'gtfo', 'wtf', 'omfg', 'lmfao', 'lmao', 'rofl',
      'noob', 'newb', 'stfu',
      
      // Body parts (explicit)
      'pen1s', 'd1ck', 'p3nis', 'dicksucker', 'cocksucker',
      'balls', 'scrotum', 'testicle', 'buttcheeks', 'tits',
      
      // Censored variations
      'f*ck', 'sh*t', 'b*tch', 'a**', 'd*ck', 'c*ck', 'p*ssy', 'c*nt',
      's**t', 'f**k', 'bi**h', 'd**k', 'c**k',
      'fu**', 'sh**', 'bi***', '***',
      
      // Compound vulgar words
      'fuckyou', 'fukyou', 'screwyou', 'eatme', 'suckmy',
      'pieceofshit', 'sonofbitch', 'motherfucker',
    ];
    
    // Normalize name for checking (remove special characters and numbers)
    const normalizedName = name.toLowerCase()
      .replace(/[@#$%!*0-9]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Check if name contains explicit inappropriate words
    for (let word of inappropriateWords) {
      const lowerWord = word.toLowerCase();
      
      // Check if the word appears anywhere in the name (catches compounds like "motherfucker")
      if (name.toLowerCase().includes(lowerWord) || normalizedName.includes(lowerWord)) {
        return false;
      }
      
      // Also check as whole word boundary match
      const wordPattern = new RegExp('\\b' + lowerWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      if (wordPattern.test(name) || wordPattern.test(normalizedName)) {
        return false;
      }
    }
    
    // Check for leetspeak variations of common vulgar words only
    const leetspeakPatterns = [
      /\b[fp][*u]*[ck]+\b/gi,
      /\b[sh][*i]*[t]+\b/gi,
      /\bb[*i]*[tc]*[h]+\b/gi,
    ];
    
    for (let pattern of leetspeakPatterns) {
      if (pattern.test(name.toLowerCase())) {
        return false;
      }
    }
    
    // Check for all special characters only
    if (/^[^a-zA-Z\s]+$/.test(name)) {
      return false;
    }
    
    return true;
  }
  
  function showInputError(input, message) {
    let errorMsg = input.parentElement.querySelector('.idsq-input-error');
    if (!errorMsg) {
      errorMsg = createElement('p', 'idsq-input-error');
      input.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }
  
  function renderNameCapture(config, mount, handlers) {
    const section = createElement('section', 'idsq-intro');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.namePromptTitle;
    const description = createElement('p', 'idsq-description');
    description.textContent = config.copy.namePromptDescription;

    const form = createElement('form', 'idsq-form');
    
    const input = createElement('input', 'idsq-input', {
      type: 'text',
      placeholder: config.copy.namePlaceholder,
      maxlength: '50',
      required: 'true',
    });
    
    const buttonContainer = createElement('div', 'idsq-name-buttons');
    
    const submitButton = createElement('button', 'idsq-button idsq-button-primary idsq-hidden', { type: 'submit' });
    submitButton.textContent = 'Continue';
    submitButton.disabled = true;
    submitButton.style.display = 'none';
    
    // Check URL parameters for pre-filled name (for invited users)
    const urlParams = new URLSearchParams(window.location.search);
    const urlName = urlParams.get('name');
    if (urlName && urlName.trim()) {
      input.value = decodeURIComponent(urlName.trim());
      // Show and enable Continue button if name is pre-filled
      submitButton.style.display = '';
      submitButton.disabled = false;
      submitButton.classList.remove('idsq-hidden');
    }
    
    const skipButton = createElement('button', 'idsq-button idsq-button-secondary', { type: 'button' });
    skipButton.textContent = config.copy.nameSkip;
    
    form.appendChild(input);
    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(skipButton);
    form.appendChild(buttonContainer);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = input.value.trim();
      
      if (!name) {
        return; // require value or use Skip
      }
      // Validate name for inappropriate content
      if (name && !isNameValid(name)) {
        showInputError(input, 'Please enter a name that is respectful and appropriate.');
        return;
      }
      
      handlers.onSubmitName(name || null);
    });

    // Block Enter when empty
    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const current = input.value.trim();
        if (!current) {
          e.preventDefault();
        }
      }
    });

    skipButton.addEventListener('click', () => {
      handlers.onSubmitName(null);
    });
    
    // Real-time validation and button toggle
    input.addEventListener('input', () => {
      const current = input.value.trim();
      const hasValue = current.length > 0;
      submitButton.disabled = !hasValue;
      submitButton.style.display = hasValue ? '' : 'none';
      if (hasValue) {
        submitButton.classList.remove('idsq-hidden');
      } else {
        submitButton.classList.add('idsq-hidden');
      }
      if (current && !isNameValid(current)) {
        input.style.borderColor = '#ef4444';
      } else {
        input.style.borderColor = '';
      }
    });

    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(form);

    showSection(mount, section);
    input.focus();
  }

  function renderSpaceSelection(config, mount, handlers) {
    const section = createElement('section', 'idsq-intro');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.spaceSelectionTitle;
    const description = createElement('p', 'idsq-description');
    description.textContent = config.copy.spaceSelectionDescription;

    const grid = createElement('div', 'idsq-option-grid');

    config.spaceTypes.forEach((space) => {
      const card = createElement('button', 'idsq-option-card', {
        type: 'button',
      });
      card.addEventListener('click', () => handlers.onSelectSpace(space.id));
      
      card.classList.add('idsq-space-card');

      const icon = createElement('div', 'idsq-space-icon');
      icon.textContent = space.icon;
      const label = createElement('div', 'idsq-option-label');
      const spaceTitle = createElement('h3', 'idsq-option-title');
      spaceTitle.textContent = space.name;
      const spaceDescription = createElement('p', 'idsq-option-description');
      spaceDescription.textContent = space.description;

      label.appendChild(spaceTitle);
      label.appendChild(spaceDescription);
      card.appendChild(icon);
      card.appendChild(label);
      grid.appendChild(card);
    });

    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(grid);

    showSection(mount, section);
  }

  function renderWordAssociation(config, mount, state, handlers) {
    const section = createElement('section', 'idsq-step');
    
    // Add Clara avatar
    const claraWrapper = createElement('div', 'idsq-clara-mini-wrapper');
    const claraMini = createElement('img', 'idsq-clara-mini', {
      src: config.copy.claraProfileUrl,
      alt: 'Clara',
      draggable: 'false',
    });
    claraMini.addEventListener('contextmenu', (e) => e.preventDefault());
    const claraInfo = createElement('p', 'idsq-clara-info');
    claraInfo.innerHTML = '<span class="idsq-clara-info-name">Clara</span> · Interior Design Expert';
    claraWrapper.appendChild(claraMini);
    claraWrapper.appendChild(claraInfo);
    
    const title = createElement('h2', 'idsq-title');
    // Choose prompt based on selected space, fallback to general
    const waSpaceKey = state && state.selectedSpace ? state.selectedSpace : 'general';
    const waConfig = (config.wordAssociationBySpace && config.wordAssociationBySpace[waSpaceKey])
      ? config.wordAssociationBySpace[waSpaceKey]
      : (config.wordAssociationBySpace?.general || { prompt: config.copy.wordAssociationTitle, words: [] });
    title.textContent = waConfig.prompt || config.copy.wordAssociationTitle;
    const description = createElement('p', 'idsq-description');
    if (state.participantName) {
      description.textContent = `Trust your intuition, ${state.participantName}—choose the word that speaks to you.`;
    } else {
      description.textContent = config.copy.wordAssociationDescription;
    }
    
    section.appendChild(claraWrapper);

    const wordContainer = createElement('div', 'idsq-word-container');

    // Position words organically with random sizes - container flows naturally
    const sizes = ['large','medium','small'];
    const words = (waConfig.words && waConfig.words.length) ? waConfig.words.slice() : (config.wordAssociation.words || []).map(w => w.word);
    words.sort(() => Math.random() - 0.5);
    words.forEach((word, index) => {
      const card = createElement('button', 'idsq-word-card');
      const size = sizes[index % sizes.length];
      card.classList.add(`idsq-word-${size}`);
      card.textContent = typeof word === 'string' ? word : word.word;
      const payload = typeof word === 'string' ? { word, styleIds: [] } : word;
      card.addEventListener('click', () => handlers.onSelectWord(payload));
      wordContainer.appendChild(card);
    });

    const navigation = createElement('div', 'idsq-step-navigation');
    const restartButton = createElement('button', 'idsq-button idsq-button-secondary idsq-restart-btn');
    restartButton.textContent = 'Start Over';
    restartButton.addEventListener('click', handlers.onRestart);
    navigation.appendChild(restartButton);
    const spacer = createElement('div', 'idsq-step-spacer');
    navigation.appendChild(spacer);

    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(wordContainer);
    section.appendChild(navigation);

    showSection(mount, section);
  }

  function renderStep(config, mount, state, handlers, steps) {
    const step = steps[state.currentStep];
    const section = createElement('section', 'idsq-step');

    // Add Clara mini avatar
    const claraWrapper = createElement('div', 'idsq-clara-mini-wrapper');
    const claraMini = createElement('img', 'idsq-clara-mini', {
      src: config.copy.claraProfileUrl,
      alt: 'Clara',
      draggable: 'false',
    });
    claraMini.addEventListener('contextmenu', (e) => e.preventDefault());
    const claraInfo = createElement('p', 'idsq-clara-info');
    claraInfo.innerHTML = '<span class="idsq-clara-info-name">Clara</span> · Interior Design Expert';
    claraWrapper.appendChild(claraMini);
    claraWrapper.appendChild(claraInfo);
    section.appendChild(claraWrapper);

    const prompt = createElement('h2', 'idsq-title');
    let personalizedPrompt = step.prompt;
    
    // Personalize prompts naturally - mention name on the first and last round
    if (state.participantName && (state.currentStep === 0 || state.currentStep === 2)) {
      // Only add the name on the very first question
      if (personalizedPrompt.endsWith('?')) {
        personalizedPrompt = personalizedPrompt.slice(0, -1) + ', ' + state.participantName + '?';
      }
    }
    
    prompt.textContent = personalizedPrompt;
    
    // Add helpful instruction text - rotate by round for variety
    const instruction = createElement('p', 'idsq-instruction');
    const instructionVariants = [
      'Trust your intuition—which image speaks to you?',
      'Follow your gut—what catches your eye?',
      'Go with your first instinct—which calls to you?',
      'What draws you in? Choose what feels right.'
    ];
    // Cycle through variants based on current step
    const instructionIndex = state.currentStep % instructionVariants.length;
    instruction.textContent = instructionVariants[instructionIndex];

    const grid = createElement('div', 'idsq-option-grid');

    step.options.forEach((option) => {
      const card = createElement('button', 'idsq-option-card', {
        type: 'button',
      });
      
      // Check if this option is already selected
      const isSelected = state.choices[state.currentStep]?.id === option.id;
      if (isSelected) {
        card.classList.add('idsq-selected');
      }
      
      card.addEventListener('click', () => handlers.onSelectOption(option));

      const image = createElement('img', 'idsq-option-image', {
        src: option.imageUrl,
        alt: option.title,
        loading: 'lazy',
        draggable: 'false',
      });
      image.addEventListener('contextmenu', (e) => e.preventDefault());

      // Removed title/label to keep selections purely visual and image-based
      card.appendChild(image);
      grid.appendChild(card);
    });

    const navigation = createElement('div', 'idsq-step-navigation');
    
    // Start Over button
    const restartButton = createElement('button', 'idsq-button idsq-button-secondary idsq-restart-btn');
    restartButton.textContent = 'Start Over';
    restartButton.addEventListener('click', handlers.onRestart);
    navigation.appendChild(restartButton);
    
    // Spacer
    const spacer = createElement('div', 'idsq-step-spacer');
    navigation.appendChild(spacer);
    
    // Back button (only show if not on first step)
    if (state.currentStep > 0) {
      const backButton = createElement('button', 'idsq-button idsq-button-secondary');
      backButton.textContent = '← Previous';
      backButton.addEventListener('click', handlers.onGoBack);
      navigation.appendChild(backButton);
    }
    
    // Next button (only show if a selection has been made)
    const hasSelection = state.choices[state.currentStep] !== undefined;
    const isLastStep = state.currentStep === steps.length - 1;
    
    // Show Next button if selection made AND (not last step OR is last step with selection)
    if (hasSelection && (state.currentStep < steps.length - 1 || isLastStep)) {
      const nextButton = createElement('button', 'idsq-button idsq-button-primary');
      nextButton.textContent = 'Next →';
      if (isLastStep) {
        // On last step, skip lead capture and go directly to final selection
        // Use a handler method to ensure saveState is accessible
        nextButton.addEventListener('click', () => {
          if (handlers.onProceedToFinal) {
            handlers.onProceedToFinal();
          }
        });
      } else {
        nextButton.addEventListener('click', handlers.onProceed);
      }
      navigation.appendChild(nextButton);
    }

    section.appendChild(prompt);
    section.appendChild(instruction);
    section.appendChild(grid);
    if (navigation.children.length > 0) {
      section.appendChild(navigation);
    }

    showSection(mount, section);
  }
  
  // Milestone tips that appear between rounds
  function renderMilestoneTip(config, mount, space, roundNumber, onContinue) {
    const section = createElement('section', 'idsq-milestone');
    
    // Add Clara avatar
    const claraWrapper = createElement('div', 'idsq-clara-mini-wrapper');
    const claraMini = createElement('img', 'idsq-clara-mini', {
      src: config.copy.claraProfileUrl,
      alt: 'Clara',
      draggable: 'false',
    });
    claraMini.addEventListener('contextmenu', (e) => e.preventDefault());
    const claraInfo = createElement('p', 'idsq-clara-info');
    claraInfo.innerHTML = '<span class="idsq-clara-info-name">Clara</span> · Interior Design Expert';
    claraWrapper.appendChild(claraMini);
    claraWrapper.appendChild(claraInfo);
    section.appendChild(claraWrapper);
    
    const title = createElement('h2', 'idsq-title');
    title.textContent = roundNumber === 1 ? 'Great start!' : 'You\'re doing great!';
    
    const tip = createElement('div', 'idsq-design-tip');
    const messages = getMilestoneMessage(space, roundNumber);
    tip.innerHTML = messages;
    
    const continueButton = createElement('button', 'idsq-button idsq-button-primary');
    continueButton.textContent = 'Continue →';
    continueButton.addEventListener('click', () => {
      onContinue();
    });
    
    section.appendChild(title);
    section.appendChild(tip);
    section.appendChild(continueButton);
    
    showSection(mount, section);
  }
  
  function getMilestoneMessage(space, roundNumber) {
    const messages = {
      'living-room': [
        // Round 1 (after first selection)
        ['Your living room is the heart of your home—it sets the tone for everything else. I always tell my clients to think about how people will actually move through and gather in this space.',
         'Natural light is your best friend in interior design! Notice how the sun moves through your space during the day—this will help guide us in choosing colors and window treatments.',
         'Scale is everything in a living room. I love helping clients understand how furniture placement can make a space feel both cozy and spacious—it\'s all about the right proportions.',
         'The best living rooms tell a story. Think about what pieces matter most to you—maybe it\'s that inherited bookcase or that rug you found on your travels. Let\'s honor those personal touches.'],
        // Round 2 (after second selection)
        ['You\'re making fantastic choices! Remember, the best design balances function with beauty. We\'re finding pieces that work for YOUR lifestyle, not someone else\'s idea of perfect.',
         'A well-designed living room flows naturally. I always consider how traffic patterns move through the space—nothing should feel cramped or awkward.',
         'Material selection is key! Natural materials like wood, stone, and linen add warmth and soul to a space. They age beautifully and feel timeless.',
         'Don\'t forget vertical space! I love using tall bookcases or artwork to draw the eye up—it makes a room feel larger and more sophisticated.'],
        // Round 3 (after third selection)
        ['We\'re in the home stretch! Your living room should be where you want to spend your time. Think about what activities happen here—watching TV, reading, entertaining friends.',
         'Layering is my secret weapon! I love combining different textiles—throws, pillows, rugs—to create depth and visual interest. It\'s what makes a room feel pulled together.',
         'A great living room has moments of drama and moments of rest. That balance of bold and subtle is what creates a truly dynamic, lived-in space.',
         'Quality over quantity always! Better to have fewer, well-chosen pieces than a room full of items that don\'t quite work together. Your selections show you understand that.'],
        // Round 4 (before final selection)
        ['One more round! By now, your style preferences are really coming through. Trust that feeling—the design that resonates most with you is the one that will truly feel like home.',
         'Final selection! You\'ve shown such consistent taste. This last choice will help us pinpoint exactly which style speaks to your heart and makes your living room perfect for YOUR lifestyle.',
         'Last round! Your living room should reflect who you are. We\'re so close to discovering the design language that will make this space authentically yours.',
         'This is it! One more choice and we\'ll have your complete style profile. Trust those instincts—you\'ve been spot-on throughout this entire process.']
      ],
      'bedroom': [
        // Round 1
        ['Your bedroom should be your sanctuary—a place where you truly feel at peace. When I design bedrooms, I always prioritize what makes my clients feel most comfortable and recharged.',
         'Good sleep starts with good design! I always ask clients about their sleep habits—do you need blackout curtains? Soft ambient light? That informs everything.',
         'Storage doesn\'t have to be an eyesore! I love finding creative ways to blend function with form. Beautiful design can be practical too—that\'s the magic.',
         'The bedroom is your personal retreat. Think about what makes you feel most relaxed after a long day—that\'s the energy we want to create here.'],
        // Round 2
        ['Bedroom color psychology is fascinating! Warmer tones can be more restful than cool blues. We\'ll find the palette that makes you feel most at peace.',
         'I always recommend a layered approach to bedroom lighting. Overhead lighting for tasks, but sconces or table lamps for that cozy, unwinding atmosphere.',
         'Invest in the bed itself—it\'s literally the focal point! A beautiful headboard or statement bed frame can anchor the entire room\'s design.',
         'Don\'t underestimate the power of a great rug! In a bedroom, it adds warmth underfoot and creates that luxurious, hotel-like feeling.'],
        // Round 3
        ['We\'re almost there! Bedroom design is deeply personal, and you\'re doing an amazing job trusting your instincts. You know what makes you feel most at peace—let\'s honor that.',
         'Window treatments matter more than people think! They control light, add privacy, and can completely transform the mood of a bedroom.',
         'A bedroom should feel cocoon-like. Think about creating layers of texture—soft linens, plush pillows, velvet throws—that invite you to sink in and decompress.',
         'Quality bedding elevates everything! Good thread count sheets and a beautiful duvet cover are investments in your daily comfort and the room\'s overall aesthetic.'],
        // Round 4
        ['Final selection! You\'ve shown such consistent taste. This last choice will help us pinpoint exactly which style speaks to your heart and will make your bedroom feel like the perfect retreat.',
         'Last round! Your bedroom sanctuary is taking shape. One more choice and we\'ll have the complete picture of your ideal sleep space.',
         'This is it! You\'ve been so thoughtful about what creates your ideal bedroom. Trust those final instincts—we\'re so close to your perfect style match.',
         'One more to go! Your bedroom should be YOUR haven. This final selection will reveal the style that transforms your sleep space into the peaceful retreat you deserve.']
      ],
      'kitchen': [
        // Round 1
        ['Kitchens are truly the heart of the home! When designing a kitchen, I always ask my clients to walk me through how they actually cook and entertain. That real-life workflow is everything.',
         'Good lighting in a kitchen is non-negotiable—it\'s one of those things that makes every task easier. I love layering task lighting under cabinets with ambient light for both function and mood.',
         'Kitchen storage can be beautiful! I love open shelving mixed with closed cabinetry—it creates that perfect balance of accessibility and visual calm.',
         'The kitchen triangle still matters! Sink, stove, and refrigerator placement affects how efficiently you can cook. Let\'s optimize that flow.'],
        // Round 2
        ['Countertops are your kitchen\'s jewelry! Whether you choose marble, quartz, or butcher block, the surface you prep on should bring you joy.',
         'Hardware is the jewelry of your kitchen! Beautiful faucets, cabinet pulls, and handles can elevate the entire space without a major renovation.',
         'A great kitchen island is a game-changer! Whether it\'s for prep work, casual dining, or gathering with guests, it becomes the social hub of the space.',
         'Don\'t forget the backsplash! It\'s a perfect opportunity to inject personality and visual interest without overwhelming the space.'],
        // Round 3
        ['We\'re in the home stretch! A well-designed kitchen doesn\'t just look beautiful—it saves you time and makes everyday tasks so much more enjoyable. That\'s good design.',
         'Kitchen appliances deserve to be seen! Beautiful ranges, refrigerators, and dishwashers can become statement pieces rather than just functional necessities.',
         'Flow matters so much in a kitchen. I always think about how multiple people can cook together comfortably—it makes entertaining so much more fun.',
         'Your kitchen should reflect how you actually live. If you\'re a baker, let\'s make room for that. Love to entertain? We\'ll design for gatherings.'],
        // Round 4
        ['Last round! Your selections have been spot-on. This final choice will help us identify the style that perfectly matches how you want your kitchen to feel and function every single day.',
         'Final selection! A kitchen is an investment in your daily life. This last choice will reveal the style that creates the cooking and gathering space of your dreams.',
         'One more to go! Your kitchen heart is almost complete. Trust these final instincts—we\'re pinpointing the aesthetic that will make cooking a joy.',
         'This is it! One more choice and we\'ll have your complete kitchen style profile. Your selections show you value both beauty and function—perfect!']
      ],
      'bathroom': [
        // Round 1
        ['Bathrooms should be peaceful retreats—even for quick morning routines. I\'ve designed powder rooms that feel like mini spas through the right materials and lighting. Every space deserves that sanctuary feeling!',
         'Storage doesn\'t have to mean clutter! I love finding clever storage solutions that blend function with form. Medicine cabinets, vanity drawers, niche shelving—we can make it beautiful.',
         'Good lighting around the mirror is a bathroom game-changer! Sconces on either side provide the best, most flattering light—no harsh overhead shadows.',
         'I always think about the bathroom as a mini spa. Even small spaces can feel luxurious with the right materials, textures, and color palette.'],
        // Round 2
        ['Tile is your bathroom\'s personality! Whether it\'s bold, subtle, classic, or modern—the patterns and colors you choose set the entire room\'s vibe.',
         'A great vanity anchors the whole bathroom. It\'s often the largest piece of furniture, so choosing the right style, size, and finish makes all the difference.',
         'Hardware details matter! Beautiful faucets, shower fixtures, and cabinet hardware can transform a bathroom from basic to stunning.',
         'Don\'t forget the shower experience! Rainfall showerheads, body jets, or beautiful tile work can make your morning routine feel like a luxury spa visit.'],
        // Round 3
        ['Almost there! Remember, even small bathrooms can feel luxurious. It\'s all about the right lighting, materials, and attention to detail. You deserve that sanctuary feeling every day.',
         'Mixing materials in a bathroom adds so much interest! Natural stone with warm wood, matte black with marble, glass with metal—the combinations create visual depth.',
         'A bathroom should feel calm and restorative. Think about how you want to start and end your day—that energy should be built into the design.',
         'Quality fixtures are worth it! They\'re things you touch every single day, so investing in pieces that feel good and look beautiful is a no-brainer.'],
        // Round 4
        ['One more to go! Your preferences are crystal clear now. This final selection will reveal the style that transforms your bathroom into the serene, rejuvenating space you deserve.',
         'Final selection! Your bathroom sanctuary is almost complete. One more choice and we\'ll have your perfect style match for a space that elevates your daily routine.',
         'Last round! You\'ve been so thoughtful about creating that spa-like feeling. This final choice will reveal the aesthetic that makes your bathroom truly yours.',
         'This is it! One more choice and we\'ll nail your bathroom style. Your selections show you value that daily moment of peace—let\'s honor that.']
      ],
      'office': [
        // Round 1
        ['Your office should inspire productivity while reflecting your personal style. I always ask clients: how do you work best—quiet focus or collaborative energy? That drives the whole design.',
         'Lighting in a home office is absolutely crucial. Natural light boosts mood and productivity, and I always add task lighting to prevent eye strain during long work sessions—your eyes will thank you!',
         'Cable management is design! Nobody wants a desk covered in cords. I love finding sleek solutions that keep everything tidy and out of sight.',
         'An office needs zones: focus work, creative thinking, and maybe a spot for breaks. Let\'s design for how you actually move through your workday.'],
        // Round 2
        ['Your desk is your command center! It should be large enough to spread out, at the right height, and positioned to maximize natural light if possible.',
         'Storage solutions in an office have to work hard. Beautiful bookshelves, file cabinets, or floating shelves can keep you organized without feeling clinical.',
         'Plants in an office are non-negotiable! They purify air, boost mood, and add life to what can feel like a sterile space. It\'s the easiest design win.',
         'Ergonomics meet aesthetics! A beautiful chair doesn\'t mean sacrificing comfort. We\'ll find pieces that look great and support your body during long work sessions.'],
        // Round 3
        ['Almost there! Your office is your professional sanctuary. Let\'s make it a space where you genuinely love to work. That\'s when the magic happens.',
         'Personal touches matter in an office! Family photos, artwork, or meaningful objects keep you grounded and remind you why you\'re working.',
         'Acoustics can make or break an office! Soft furnishings, rugs, and even artwork can absorb sound and create that perfect focus environment.',
         'A standing desk option is becoming essential! Being able to switch between sitting and standing keeps your energy up and your body happy.'],
        // Round 4
        ['Final round! Your choices have been so thoughtful. This last selection will help us identify the style that creates the perfect work environment—one that energizes and inspires you.',
         'Last selection! Your office should be the space where your best work happens. This final choice will reveal the aesthetic that supports your productivity and makes work enjoyable.',
         'One more to go! You\'ve been so intentional about creating a space that works for YOUR process. This final selection will complete your ideal work environment.',
         'This is it! One more choice and we\'ll have your complete office style profile. Your selections show you value both function and beauty in your work life.']
      ],
      'general': [
        // Round 1
        ['Color is one of the most powerful tools in my design toolkit. I love helping clients choose a palette that speaks to their personality—we use it consistently to create that feeling of harmony throughout your home.',
         'I always tell clients: mixing textures adds so much depth to a space! Smooth with rough, shiny with matte, soft with hard. That\'s what creates real visual interest and keeps a room dynamic.',
         'Natural light is your best design tool! I always notice how light moves through spaces—it affects everything from color choices to furniture placement.',
         'Scale and proportion are everything. A room full of small furniture can feel cramped, while oversized pieces can overwhelm. Finding that sweet spot is key.'],
        // Round 2
        ['Artwork personalizes a space like nothing else. Whether it\'s a gallery wall, statement piece, or curated collection, it tells your story.',
         'A beautiful home needs moments of both drama and rest. Bold statement pieces balanced with calm, neutral spaces create that perfect rhythm.',
         'Storage shouldn\'t be an afterthought! Beautiful solutions—built-ins, decorative baskets, elegant shelving—keep life organized without sacrificing style.',
         'Quality over quantity always. Better to have fewer, well-chosen pieces that you truly love than a room full of things that don\'t quite work together.'],
        // Round 3
        ['Layering is my secret to creating depth! Rugs, throws, pillows, plants, books—these collected layers give a home personality and soul.',
         'Don\'t forget the ceiling! The "fifth wall" is often overlooked. A painted ceiling or beautiful light fixture can transform a space.',
         'Plants bring life to any room! They purify air, add natural texture, and create that feeling of bringing the outdoors in.',
         'A great home has flow from room to room. Cohesive color palettes, repeated materials, and consistent style choices create that harmonious feeling.'],
        // Round 4
        ['Final round! Trust your instincts—the best design reflects who you are and how you want to live. You\'re discovering that, and I\'m here to guide you through it.',
         'Last selection! You\'ve been so consistent in your preferences. This final choice will reveal the design style that truly embodies your personal aesthetic and creates the home you\'ve been envisioning.',
         'One more to go! Your style preferences are crystal clear. This final selection will complete your design profile and reveal the aesthetic that feels most authentically you.',
         'This is it! One more choice and we\'ll have your complete style profile. You\'ve shown such great taste throughout—trust these final instincts!']
      ]
    };
    
    // Get messages for this space and round
    const spaceMessages = messages[space] || messages['general'];
    const roundMessages = spaceMessages[roundNumber - 1] || [];
    
    // If we have multiple messages for this round, randomize
    if (roundMessages.length > 0) {
      const randomIndex = Math.floor(Math.random() * roundMessages.length);
      return roundMessages[randomIndex];
    }
    
    // Fallback
    return spaceMessages[spaceMessages.length - 1][0] || 'Great progress! Keep following your instincts.';
  }
  

  function renderLeadCapture(config, mount, handlers) {
    const section = createElement('section', 'idsq-lead-capture');
    const title = createElement('h2', 'idsq-title');
    title.textContent = 'Get Your Design Style Results';

    const form = createElement('form', 'idsq-form');

    // Name field (optional) - only show if user didn't provide name earlier
    // Access state from handlers context - we'll pass it through
    const state = handlers._state || window.IDSQ?._lastState;
    if (state && !state.participantName) {
      // Create input without label (instructions in placeholder)
      const nameWrapper = createElement('label', 'idsq-field idsq-field-no-label');
      const nameInput = createElement('input', 'idsq-input', {
        type: 'text',
        name: 'name',
        placeholder: 'Name (Optional)',
      });
      // Pre-fill if exists in leadData
      if (state.leadData?.participantName) {
        nameInput.value = state.leadData.participantName;
      }
      nameWrapper.appendChild(nameInput);
      form.appendChild(nameWrapper);
    }

    // Email field (optional) - no label, instructions in placeholder
    const emailWrapper = createElement('label', 'idsq-field idsq-field-no-label');
    const emailInput = createElement('input', 'idsq-input', {
      type: 'email',
      name: 'email',
      placeholder: 'Email (Optional)',
    });
    // Pre-fill email from saved leadData if it exists
    if (state && state.leadData?.email) {
      emailInput.value = state.leadData.email;
    }
    emailWrapper.appendChild(emailInput);
    form.appendChild(emailWrapper);
    
    // Store reference for checkbox auto-check functionality
    const emailField = { input: emailInput };

    // Newsletter signup checkbox - text next to checkbox, or below if it collides
    const newsletterWrapper = createElement('label', 'idsq-checkbox-field idsq-checkbox-inline');
    const checkbox = createElement('input', 'idsq-checkbox', {
      type: 'checkbox',
      name: 'newsLetterSignup',
      id: 'idsq-newsletter-signup',
    });
    const checkboxContent = createElement('span', 'idsq-checkbox-content');
    const checkboxLabel = createElement('span', 'idsq-checkbox-label');
    checkboxLabel.innerHTML = '<strong>Yes, I want to sign up for the newsletter!</strong>';
    const checkboxDescription = createElement('p', 'idsq-checkbox-description');
    checkboxDescription.innerHTML = 'Be the envy of your friends! Get <strong>VIP access</strong> to interior design inspiration, expert advice, and exclusive updates. Stay ahead of the curve...<strong>don\'t miss out</strong> - be the first to know about the latest trends, styles, and special offers tailored just for you!';
    
    checkboxContent.appendChild(checkboxLabel);
    checkboxContent.appendChild(checkboxDescription);
    newsletterWrapper.appendChild(checkbox);
    newsletterWrapper.appendChild(checkboxContent);
    form.appendChild(newsletterWrapper);
    
    // Pre-fill newsletter checkbox from saved data
    if (state && state.leadData?.newsLetterSignup) {
      checkbox.checked = true;
    }
    
    // Auto-check/uncheck newsletter based on email input
    // Use existing validateEmail function (defined later in the file)
    const checkEmailAndUpdateCheckbox = () => {
      const emailValue = emailField.input.value.trim();
      // Check if email is valid using simple regex (matches existing validateEmail pattern)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailValue && emailRegex.test(emailValue)) {
        checkbox.checked = true;
      } else {
        // Only uncheck if no saved state preference
        if (!state || !state.leadData?.newsLetterSignup) {
          checkbox.checked = false;
        }
      }
    };
    
    emailField.input.addEventListener('input', checkEmailAndUpdateCheckbox);
    emailField.input.addEventListener('blur', checkEmailAndUpdateCheckbox);
    
    // Also check on initial load if email is pre-filled (e.g., from state restoration)
    if (emailField.input.value) {
      checkEmailAndUpdateCheckbox();
    }

    const submit = createElement('button', 'idsq-button idsq-button-primary', { type: 'submit' });
    submit.textContent = config.copy.submitButton;
    form.appendChild(submit);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      
      // Fix checkbox: FormData returns "on" if checked, undefined if unchecked
      payload.newsLetterSignup = checkbox.checked;

      // Email is optional, but if provided, validate it
      if (payload.email && !validateEmail(payload.email)) {
        showFormError(section, 'Please provide a valid email address.');
        return;
      }

      handlers.onSubmitLead(payload);
    });

    section.appendChild(title);
    section.appendChild(form);

    showSection(mount, section);
  }

  function createInputField(labelText, type, name, required = false) {
    const wrapper = createElement('label', 'idsq-field');
    const label = createElement('span', 'idsq-field-label');
    label.textContent = labelText;
    const input = createElement('input', 'idsq-input', { name, type });
    if (required) {
      input.required = true;
      input.setAttribute('required', 'required');
    }
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return { wrapper, input };
  }

  function showFormError(section, message) {
    let alert = section.querySelector('.idsq-alert');
    if (!alert) {
      alert = createElement('div', 'idsq-alert');
      section.insertBefore(alert, section.firstChild);
    }
    alert.textContent = message;
  }

  function renderFinalSelection(config, mount, state, handlers) {
    const section = createElement('section', 'idsq-final');
    const title = createElement('h2', 'idsq-title');
    title.textContent = 'You gravitated toward these styles.';
    const description = createElement('p', 'idsq-description');
    description.textContent = 'Select the look that feels the most "you" to reveal your final style match.';

    const grid = createElement('div', 'idsq-option-grid idsq-final-grid');
    // Show all 4 selected styles from the rounds, not just top 3
    const selectedStyles = (state.choices || []).filter(Boolean).map((choice) => {
      const styleDef = config.styleLibrary[choice.styleId];
      if (!styleDef) return null;
      return {
        styleId: choice.styleId,
        styleName: styleDef.styleName,
        styleDefinition: styleDef,
      };
    }).filter(Boolean);
    
    selectedStyles.forEach((styleResult, idx) => {
      const card = createElement('button', 'idsq-option-card', { type: 'button' });
      const payload = { styleId: styleResult.styleId, styleName: styleResult.styleName };
      card.addEventListener('click', () => handlers.onSelectFinal(payload));

      // Get the _2 image for the selected space
      const selectedSpace = state.selectedSpace || 'general';
      const spaceMap = { 'general': 'whole-home' };
      const roomKey = spaceMap[selectedSpace] || selectedSpace;
      let imageUrl = null;
      
      if (styleResult.styleDefinition.imagesByRoom && styleResult.styleDefinition.imagesByRoom[roomKey]) {
        // Use _2 image (second image in the array)
        const roomImages = styleResult.styleDefinition.imagesByRoom[roomKey];
        imageUrl = roomImages.length > 1 ? roomImages[1] : roomImages[0];
      } else {
        // Fallback to living-room or first available
        if (styleResult.styleDefinition.imagesByRoom && styleResult.styleDefinition.imagesByRoom['living-room']) {
          const roomImages = styleResult.styleDefinition.imagesByRoom['living-room'];
          imageUrl = roomImages.length > 1 ? roomImages[1] : roomImages[0];
        } else {
          imageUrl = styleResult.styleDefinition.finalImages[0];
        }
      }
      
      const image = createElement('img', 'idsq-option-image', {
        src: imageUrl,
        alt: `Style option ${idx + 1}`,
        loading: 'lazy',
        draggable: 'false',
      });
      image.addEventListener('contextmenu', (e) => e.preventDefault());
      
      card.appendChild(image);
      grid.appendChild(card);
    });

    // Add Start Over and Previous buttons (matching layout of other quiz steps)
    const navigation = createElement('div', 'idsq-step-navigation');
    
    // Start Over button (left side)
    const restartButton = createElement('button', 'idsq-button idsq-button-secondary idsq-restart-btn');
    restartButton.textContent = 'Start Over';
    restartButton.addEventListener('click', handlers.onRestart);
    navigation.appendChild(restartButton);
    
    // Previous button (right side) - goes back to round 4
    const previousButton = createElement('button', 'idsq-button idsq-button-secondary');
    previousButton.textContent = '← Previous';
    previousButton.addEventListener('click', () => {
      if (handlers.onGoBackToLastStep) {
        handlers.onGoBackToLastStep();
      }
    });
    navigation.appendChild(previousButton);

    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(grid);
    section.appendChild(navigation);

    showSection(mount, section);
  }

  function renderLoading(config, mount) {
    const section = createElement('section', 'idsq-status');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.loadingMessage;
    section.appendChild(title);
    showSection(mount, section);
  }

  function renderError(config, mount, handlers) {
    const section = createElement('section', 'idsq-status');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.errorTitle;
    const description = createElement('p', 'idsq-description');
    description.textContent = config.copy.errorDescription;
    const retry = createElement('button', 'idsq-button idsq-button-secondary');
    retry.textContent = config.copy.retryButton;
    retry.addEventListener('click', handlers.onRestart);
    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(retry);
    showSection(mount, section);
  }

  function renderSuccess(config, mount, state, handlers) {
    const section = createElement('section', 'idsq-success');
    
    // Title with style name highlighted
    const title = createElement('h2', 'idsq-final-title');
    const titleText = `YOUR DESIGN STYLE IS <span style="color: #006bea; font-weight: 900;">${state.finalStyle.styleName.toUpperCase()}!</span>`;
    title.innerHTML = titleText;

    // Clara Pro Tip with Style DNA bullets
    const tip = document.createElement('div');
    tip.className = 'idsq-clara-tip';
    // Left avatar
    const tipAvatar = document.createElement('img');
    tipAvatar.className = 'idsq-clara-mini';
    tipAvatar.src = config.copy.claraProfileUrl;
    tipAvatar.alt = 'Clara';
    tipAvatar.draggable = false;
    tipAvatar.addEventListener('contextmenu', (e) => e.preventDefault());
    tip.appendChild(tipAvatar);
    // Right content
    const tipContent = document.createElement('div');
    tipContent.className = 'idsq-clara-tip-content';
    const tipHeader = document.createElement('div');
    tipHeader.className = 'idsq-clara-tip-header';
    const dnaSvg = '<svg width="64" height="18" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4c8 0 8 16 16 16s8-16 16-16 8 16 16 16 8-16 16-16" stroke="#ccc" stroke-width="2" fill="none"/><path d="M2 20c8 0 8-16 16-16s8 16 16 16 8-16 16-16 8 16 16 16" stroke="#006bea" stroke-width="2" fill="none" opacity=".4"/></svg>';
    tipHeader.innerHTML = '<span class="idsq-clara-tip-title"><strong>Style DNA</strong></span><span class="idsq-clara-tip-dna">' + dnaSvg + '</span>';
    tipContent.appendChild(tipHeader);
    const linesWrap = document.createElement('div');
    linesWrap.className = 'idsq-clara-tip-lines';
    const dnaPoints = Array.isArray(state.finalStyle.dna) ? state.finalStyle.dna : [];
    dnaPoints.forEach((point) => {
      const idx = point.indexOf(':');
      const label = idx >= 0 ? point.slice(0, idx + 1) : point;
      const value = idx >= 0 ? point.slice(idx + 1).trim() : '';
      const p = document.createElement('p');
      p.innerHTML = '<strong>' + label + '</strong>' + (value ? ' ' + value : '');
      linesWrap.appendChild(p);
    });
    tipContent.appendChild(linesWrap);
    tip.appendChild(tipContent);

    const card = createElement('article', 'idsq-final-result');
    
    // Get the _3 image for the selected space from finalImages
    const selectedSpace = state.selectedSpace || 'general';
    const spaceToIndexMap = {
      'living-room': 0,
      'bedroom': 1,
      'kitchen': 2,
      'bathroom': 3,
      'office': 4,
      'general': 5  // general maps to whole-home
    };
    const imageIndex = spaceToIndexMap[selectedSpace] || 5;
    const finalImageUrl = (state.finalStyle.finalImages && state.finalStyle.finalImages[imageIndex]) || state.finalStyle.finalImages[0];
    
    // Single large image
    const imageContainer = createElement('div', 'idsq-final-single-container');
    const img = createElement('img', 'idsq-final-single-image', {
      src: finalImageUrl,
      alt: `${state.finalStyle.styleName} inspiration`,
        loading: 'lazy',
        draggable: 'false',
      });
    img.addEventListener('contextmenu', (e) => e.preventDefault());
    imageContainer.appendChild(img);

    const styleDescription = createElement('p', 'idsq-final-description');
    styleDescription.textContent = state.finalStyle.description;

    card.appendChild(imageContainer);
    card.appendChild(styleDescription);
    if (Array.isArray(state.finalStyle.dna) && state.finalStyle.dna.length) {
      card.appendChild(tip);
    }

    // Scheduling CTA
    const scheduleCTA = createElement('div', 'idsq-schedule-cta');
    const ctaTitle = createElement('h3', 'idsq-schedule-cta-title');
    
    // Get space name from config (use spaceTypes)
    let spaceName = null;
    if (config.spaceTypes && state.selectedSpace) {
      const spaceInfo = config.spaceTypes.find(s => s.id === state.selectedSpace);
      if (spaceInfo && spaceInfo.name) {
        spaceName = spaceInfo.name;
      }
    }
    const styleName = (state.finalStyle && state.finalStyle.styleName) ? state.finalStyle.styleName : 'design';
    
    // Create grammatically correct text based on whether space name is available
    if (spaceName) {
      ctaTitle.textContent = `Ready to bring your ${styleName} vision to life in your ${spaceName}?`;
    } else {
      ctaTitle.textContent = `Ready to bring your ${styleName} vision to life?`;
    }

    scheduleCTA.appendChild(ctaTitle);

    // Button container for side-by-side layout
    const buttonContainer = createElement('div', 'idsq-success-buttons');
    const scheduleButton = createElement('a', 'idsq-button idsq-button-primary', {
      href: 'https://www.jlcoates.com/interior-design/contact',
      target: '_blank',
      rel: 'noopener noreferrer',
    });
    scheduleButton.textContent = 'Schedule';
    
    const restart = createElement('button', 'idsq-button idsq-button-secondary');
    restart.textContent = config.copy.retryButton;
    restart.addEventListener('click', handlers.onRestart);
    
    buttonContainer.appendChild(scheduleButton);
    buttonContainer.appendChild(restart);

    section.appendChild(title);
    section.appendChild(card);
    section.appendChild(scheduleCTA);
    section.appendChild(buttonContainer);

    showSection(mount, section);
  }

  function validateEmail(email) {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  }

  function calculateTopStyles(config, selections, wordChoice) {
    const scoreMap = selections.reduce((acc, option) => {
      if (!option) return acc;
      const { styleId } = option;
      if (!acc[styleId]) {
        acc[styleId] = { styleId, score: 0 };
      }
      acc[styleId].score += 1;
      return acc;
    }, {});

    // Add word association scores
    if (wordChoice && wordChoice.styleIds) {
      wordChoice.styleIds.forEach((styleId) => {
        if (!scoreMap[styleId]) {
          scoreMap[styleId] = { styleId, score: 0 };
        }
        scoreMap[styleId].score += 0.5; // Give half a point for word association
      });
    }

    const results = Object.values(scoreMap)
      .map((entry) => {
        const definition = config.styleLibrary[entry.styleId];
        return {
          ...entry,
          styleName: definition?.styleName || entry.styleId,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return { results, map: scoreMap };
  }

  async function sendToAirtable(config, payload) {
    if (!config.airtable.enable) {
      return { ok: true, skipped: true };
    }
    const { apiKey, baseId, tableName } = config.airtable;
    if (!apiKey || !baseId || !tableName) {
      throw new Error('Missing Airtable configuration.');
    }
    const fields = typeof config.airtable.mapFields === 'function'
      ? config.airtable.mapFields(payload)
      : payload;

    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable responded with ${response.status}: ${errorText}`);
    }

    return response.json();
  }

  function injectStyles(config) {
    if (document.getElementById('idsq-styles')) return;
    const style = document.createElement('style');
    style.id = 'idsq-styles';
    style.textContent = `
      :root {
        --idsq-primary: ${config.brand.primaryColor};
        --idsq-accent: ${config.brand.accentColor || config.brand.primaryColor};
        --idsq-font: ${config.brand.fontFamily};
        --idsq-text: ${config.brand.textColor || '#363636'};
        --idsq-bg: #ffffff;
        --idsq-black: #000000;
      }
      #idsq {
        font-family: var(--idsq-font);
        color: var(--idsq-text);
        max-width: 960px;
        margin: 0 auto;
        padding: 2.5rem;
        background-color: #ffffff;
        position: relative;
      }
      #idsq * {
        box-sizing: border-box;
        color: var(--idsq-text) !important;
      }
      .idsq-title {
        font-size: 38px;
        line-height: 50px;
        font-weight: 900;
        margin-bottom: 1.25rem;
        color: var(--idsq-text);
        text-align: center;
      }
      .idsq-hidden { display: none !important; }
      /* Guide-panel intro variant */
      .idsq-quiz-hero { color: var(--idsq-text); font-family: var(--idsq-font); max-width: 1080px; margin: 0 auto; padding: clamp(24px, 4vw, 48px) 20px; position: relative; }
      .idsq-hero-header { position: relative; }
      .idsq-hero-header .idsq-eyebrow { letter-spacing: .08em; text-transform: uppercase; opacity: .7; margin: 0 0 .25rem 0; font-weight: 500; font-size: 16px; line-height: 30px; }
      .idsq-hero-title { font-weight: 900; font-size: 38px; line-height: 50px; margin: 0 0 .35rem 0; }
      .idsq-subtitle { font-weight: 500; font-size: 16px; line-height: 30px; margin: 0 0 1.25rem 0; opacity: .85; color: var(--idsq-text) !important; }
      .idsq-guide-panel { display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center; border: 1px solid rgba(54,54,54,.1); border-radius: 14px; padding: clamp(16px, 3vw, 24px); background: rgba(54,54,54,.03); backdrop-filter: blur(1px); }
      .idsq-guide-avatar { display: block; width: clamp(72px, 10vw, 112px); height: clamp(72px, 10vw, 112px); border-radius: 50%; object-fit: cover; box-shadow: 0 6px 16px rgba(54,54,54,.15); user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; }
      .idsq-guide-copy { font-weight: 500; font-size: 16px; line-height: 30px; color: var(--idsq-text) !important; }
      .idsq-guide-intro { margin: 0 0 .25rem 0; color: var(--idsq-text) !important; }
      .idsq-cta-wrap { position: absolute; top: clamp(24px, 4vw, 48px); right: 20px; display: flex; align-items: center; height: 50px; transform: translateY(30px); }
      @media (max-width: 960px) {
        .idsq-cta-wrap { position: static; height: auto; margin-top: 1.5rem; margin-bottom: 0; justify-content: center; transform: none; }
      }
      @media (max-width: 640px) {
        .idsq-guide-panel { grid-template-columns: 1fr; text-align: left; }
        .idsq-guide-avatar { justify-self: start; }
        .idsq-cta-wrap { position: static; height: auto; margin-top: 1.5rem; margin-bottom: 0; justify-content: center; }
      }
      .idsq-description {
        font-size: 16px;
        line-height: 30px;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: rgba(44, 44, 44, 0.7);
        text-align: center;
      }
      .idsq-description:last-of-type {
        margin-bottom: 2.5rem;
      }
      .idsq-instruction {
        font-size: 0.95rem;
        font-weight: 500;
        margin-bottom: 2rem;
        color: rgba(44, 44, 44, 0.6);
        text-align: center;
        font-style: italic;
      }
      .idsq-design-tip {
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-left: 3px solid var(--idsq-primary);
        padding: 1rem 1.25rem;
        margin: 2rem 0 1rem 0;
        border-radius: 8px;
        font-size: 0.9rem;
        color: rgba(44, 44, 44, 0.75);
        line-height: 1.6;
      }
      .idsq-design-tip strong {
        color: var(--idsq-primary);
        font-weight: 600;
      }
      .idsq-button {
        font-family: var(--idsq-font);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        border-radius: 999px;
        padding: 1rem 1.5rem;
        font-size: clamp(1rem, 2.4vw, 1.25rem);
        font-weight: 900;
        line-height: 1;
        letter-spacing: 0.02em;
        cursor: pointer;
        transition: box-shadow 0.2s ease;
        border: 2px solid transparent;
        text-decoration: none;
      }
      .idsq-button:visited {
        text-decoration: none;
      }
      .idsq-button-primary {
        background: var(--idsq-primary);
        color: #fff;
        border: none;
        box-shadow: 0 8px 20px rgba(54, 54, 54, 0.4);
      }
      .idsq-button-primary:hover {
        box-shadow: 0 12px 30px rgba(54, 54, 54, 0.5);
      }
      .idsq-button-secondary {
        background: #ffffff;
        color: var(--idsq-primary);
        border: 2px solid var(--idsq-primary);
        box-shadow: 0 8px 20px rgba(54, 54, 54, 0.3);
      }
      .idsq-button-secondary:hover {
        box-shadow: 0 12px 30px rgba(54, 54, 54, 0.4);
      }
      @keyframes idsqFadeInUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
      @keyframes idsqFadeOut { from { opacity: 1 } to { opacity: 0 } }
      .idsq-animate-in { animation: idsqFadeInUp 280ms ease both; }
      .idsq-animate-out { animation: idsqFadeOut 220ms ease both; }
      .idsq-intro,
      .idsq-step,
      .idsq-final,
      .idsq-success,
      .idsq-lead-capture,
      .idsq-status,
      .idsq-milestone {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .idsq-milestone .idsq-design-tip {
        margin: 1rem 0 2rem 0;
        max-width: 600px;
      }
      .idsq-option-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        width: 100%;
        margin-top: 2rem;
      }
      .idsq-final-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
      }
      .idsq-final-grid .idsq-option-image {
        height: 240px;
      }
      .idsq-option-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: transparent;
        border-radius: 16px;
        overflow: hidden;
        border: 2px solid transparent;
        cursor: pointer;
        text-align: left;
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        padding: 0;
      }
      .idsq-option-card:hover,
      .idsq-option-card:focus {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(44, 44, 44, 0.12);
        outline: none;
      }
      .idsq-option-card.idsq-selected {
        border-color: var(--idsq-primary);
        border-width: 3px;
        box-shadow: 0 8px 30px rgba(44, 44, 44, 0.15);
      }
      .idsq-option-card.idsq-selected:hover {
        box-shadow: 0 12px 40px rgba(44, 44, 44, 0.2);
      }
      .idsq-step-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 2rem;
        gap: 1rem;
      }
      .idsq-step-spacer {
        flex: 1;
      }
      .idsq-step-navigation .idsq-button {
        flex: 0 0 auto;
      }
      .idsq-option-image,
      .idsq-final-image {
        width: 100%;
        height: 280px;
        object-fit: cover;
        display: block;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(44, 44, 44, 0.1);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
      .idsq-option-label {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .idsq-option-title {
        font-size: 1.2rem;
        margin: 0;
        color: var(--idsq-text);
      }
      .idsq-option-description {
        font-size: 0.95rem;
        color: rgba(54, 54, 54, 0.85);
        margin: 0;
        line-height: 1.5;
      }
      .idsq-final-gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
      }
      .idsq-final-image {
        height: 180px;
        border-radius: 10px;
        box-shadow: 0 2px 16px rgba(44, 44, 44, 0.12);
        object-fit: cover;
      }
      .idsq-final-result {
        margin-bottom: 1rem;
      }
      .idsq-final-single-image {
        width: 100%;
        height: 450px;
        object-fit: cover;
        display: block;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(44, 44, 44, 0.1);
        background: #ffffff;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
      .idsq-logo {
        max-width: 140px;
        margin-bottom: 1.5rem;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
      .idsq-form {
        width: min(420px, 100%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .idsq-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        text-align: left;
        width: 100%;
      }
      .idsq-field-label {
        font-size: 0.95rem;
        color: var(--idsq-text);
        font-weight: 600;
        font-family: var(--idsq-font);
      }
      .idsq-field-no-label .idsq-field-label {
        display: none;
      }
      .idsq-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        border: 1px solid #cbd5f5;
        background-color: #fff;
        font-size: 1rem;
        font-weight: 500;
        font-family: var(--idsq-font);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .idsq-input:focus {
        border-color: var(--idsq-primary);
        box-shadow: 0 0 0 3px rgba(54, 54, 54, 0.2);
        outline: none;
      }
      /* AI Guide widget */
      .idsq-ai-toggle { position: absolute; right: 16px; bottom: 16px; z-index: 20; }
      .idsq-ai-panel { position: absolute; right: 16px; bottom: 72px; width: min(360px, calc(100% - 32px)); background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; box-shadow: 0 12px 30px rgba(0,0,0,0.18); overflow: hidden; display: none; }
      .idsq-ai-panel.open { display: flex; flex-direction: column; }
      .idsq-ai-header { padding: 0.75rem 1rem; font-weight: 600; color: var(--idsq-text); border-bottom: 1px solid rgba(0,0,0,0.06); }
      .idsq-ai-messages { max-height: 260px; overflow-y: auto; padding: 0.75rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
      .idsq-ai-msg { font-size: 0.95rem; line-height: 1.35; padding: 0.5rem 0.75rem; border-radius: 10px; }
      .idsq-ai-msg.user { align-self: flex-end; background: rgba(0, 107, 234, 0.10); color: var(--idsq-text); }
      .idsq-ai-msg.assistant { align-self: flex-start; background: #f3f4f6; color: var(--idsq-text); }
      .idsq-ai-input { display: flex; gap: 0.5rem; padding: 0.75rem; border-top: 1px solid rgba(0,0,0,0.06); }
      .idsq-ai-input input { flex: 1; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.5rem 0.75rem; }
      .idsq-ai-input button { white-space: nowrap; }
      .idsq-space-card {
        padding: 1.5rem;
        text-align: center;
        justify-content: center;
        min-height: 200px;
      }
      .idsq-space-icon {
        font-size: 3rem;
        margin-bottom: 0.75rem;
      }
      .idsq-clara-profile-wrapper {
        position: relative;
        display: inline-block;
        margin: 0 auto 1.5rem;
      }
      .idsq-clara-profile {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 8px rgba(44, 44, 44, 0.1);
        position: relative;
        z-index: 2;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
      .idsq-clara-profile-wrapper::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 12px solid #f8f9fa;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        filter: drop-shadow(0 2px 4px rgba(44, 44, 44, 0.1));
      }
      .idsq-clara-mini-wrapper {
        text-align: center;
        margin-bottom: 1rem;
      }
      .idsq-clara-mini {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 8px rgba(44, 44, 44, 0.1);
        display: inline-block;
        margin-bottom: 0.5rem;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
      .idsq-clara-info {
        font-size: 0.875rem;
        color: rgba(54, 54, 54, 0.7);
        margin-top: 0;
      }
      .idsq-clara-info-name {
        font-weight: 600;
        color: #363636;
      }
      .idsq-word-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
        width: 100%;
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
      }
      .idsq-word-card {
        padding: 0.75rem 1.25rem;
        text-align: center;
        font-weight: 600;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #363636;
        border: 2px solid #e5e7eb;
        border-radius: 9999px;
        background: #ffffff;
        transition: all 0.2s ease;
        cursor: pointer;
        margin: 0;
      }
      .idsq-word-card:hover {
        border-color: #363636;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(54, 54, 54, 0.15);
      }
      .idsq-word-card.idsq-selected {
        border-color: #363636;
        background: #363636;
        color: #ffffff;
      }
      .idsq-word-large {
        font-size: 1.5rem;
      }
      .idsq-word-medium {
        font-size: 1.1rem;
      }
      .idsq-word-small {
        font-size: 0.9rem;
      }
      .idsq-final-title {
        text-align: center;
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 2.5rem;
        color: #363636;
        line-height: 1.3;
      }
      .idsq-final-single-container {
        max-width: 900px;
        margin: 0 auto 2rem;
      }
      .idsq-final-description {
        text-align: center;
        font-size: 1.1rem;
        line-height: 1.7;
        color: rgba(54, 54, 54, 0.85);
        max-width: 700px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      .idsq-clara-tip { margin: 1rem auto 0; max-width: 900px; display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center; border: 1px solid rgba(54,54,54,.1); border-radius: 14px; padding: clamp(16px, 3vw, 24px); background: rgba(54,54,54,.03); backdrop-filter: blur(1px); text-align: left; }
      .idsq-clara-tip .idsq-clara-mini { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; box-shadow: 0 6px 16px rgba(54,54,54,.15); }
      .idsq-clara-tip-content { display: flex; flex-direction: column; gap: .5rem; }
      .idsq-clara-tip-header { display: flex; align-items: center; gap: .5rem; }
      .idsq-clara-tip-title { font-weight: 900; color: var(--idsq-text); font-size: 16px; }
      .idsq-clara-tip-dna { display: inline-flex; vertical-align: middle; }
      .idsq-clara-tip-dna svg { display: block; }
      .idsq-clara-tip-lines { text-align: left; color: var(--idsq-text) !important; }
      .idsq-clara-tip-lines p { margin: .15rem 0; line-height: 1.6; color: var(--idsq-text) !important; }
      .idsq-schedule-cta {
        margin-top: 2rem;
        padding: 0;
        background: transparent;
        border: none;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }
      .idsq-schedule-cta-title {
        font-size: 38px;
        line-height: 50px;
        font-weight: 900;
        margin-bottom: 2rem;
        color: var(--idsq-text);
      }
      .idsq-success-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        align-items: center;
      }
      .idsq-success-buttons .idsq-button {
        text-decoration: none;
      }
      .idsq-name-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
      }
      .idsq-input-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        text-align: center;
      }
      .idsq-checkbox-field {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.25rem;
        background: #f8f9fa;
        border-radius: 12px;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .idsq-checkbox-field.idsq-checkbox-inline {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.75rem;
      }
      @media (max-width: 640px) {
        .idsq-checkbox-field.idsq-checkbox-inline {
          flex-direction: column;
          align-items: center;
        }
        .idsq-checkbox-field.idsq-checkbox-inline input[type="checkbox"] {
          margin-right: 0;
        }
      }
      .idsq-checkbox-field:hover {
        border-color: var(--idsq-primary);
        background: #f0f4f8;
      }
      .idsq-checkbox-field input[type="checkbox"] {
        width: 20px;
        height: 20px;
        min-width: 20px;
        margin-right: 0;
        margin-top: 0.125rem;
        cursor: pointer;
        accent-color: var(--idsq-primary);
        flex-shrink: 0;
      }
      .idsq-checkbox-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .idsq-checkbox-label {
        font-size: 1rem;
        font-weight: 600;
        color: var(--idsq-text);
        cursor: pointer;
        line-height: 1.4;
      }
      .idsq-checkbox-description {
        font-size: 0.9rem;
        color: rgba(44, 44, 44, 0.7);
        line-height: 1.6;
        margin: 0;
        font-style: italic;
      }
      .idsq-checkbox-description strong {
        font-weight: 600;
        color: var(--idsq-primary);
      }
      .idsq-alert {
        width: 100%;
        padding: 0.75rem 1rem;
        background-color: rgba(239, 68, 68, 0.12);
        color: #b91c1c;
        border-radius: 12px;
        margin-bottom: 1rem;
      }
      @media (max-width: 640px) {
        #idsq {
          padding: 1.5rem;
        }
        .idsq-title {
          margin-bottom: 1rem;
        }
        .idsq-description {
          margin-bottom: 2rem;
        }
        .idsq-option-grid {
          gap: 1.5rem;
          margin-top: 1.5rem;
          grid-template-columns: 1fr;
        }
        .idsq-final-grid {
          grid-template-columns: 1fr;
        }
        .idsq-final-grid .idsq-option-image {
          height: 200px;
        }
        .idsq-option-image {
          height: 220px;
        }
        .idsq-final-single-image {
          height: 250px;
        }
        .idsq-final-gallery {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .idsq-final-image {
          height: 220px;
        }
        .idsq-schedule-cta {
          padding: 0;
          margin-top: 1.5rem;
        }
        .idsq-schedule-cta-title {
          font-size: 24px;
          line-height: 32px;
        }
        .idsq-success-buttons {
          flex-direction: column;
          gap: 0.75rem;
        }
        .idsq-cta-wrap {
          position: static;
          height: auto;
          margin-top: 1.5rem;
          margin-bottom: 0;
          justify-content: center;
        }
        .idsq-final-title {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }
        .idsq-word-large {
          font-size: 1.25rem;
        }
        .idsq-word-medium {
          font-size: 1rem;
        }
        .idsq-word-small {
          font-size: 0.85rem;
        }
        .idsq-word-container {
          padding: 0.5rem;
          gap: 0.5rem;
        }
        .idsq-word-card {
          padding: 0.5rem 1rem;
        }
        .idsq-clara-profile {
          width: 70px;
          height: 70px;
        }
        .idsq-clara-profile-wrapper::after {
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #f8f9fa;
          bottom: -6px;
        }
        .idsq-step-navigation {
          flex-direction: column;
        }
        .idsq-step-navigation .idsq-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildQuiz(userConfig = {}) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    const config = deepMerge(DEFAULT_CONFIG, userConfig);
    const mount = document.querySelector(config.mountSelector);
    if (!mount) {
      console.warn(`[IDSQ] Could not find mount element "${config.mountSelector}".`);
      return;
    }
    mount.id = 'idsq';
    injectFont(config);
    injectStyles(config);
    
    // Add global right-click protection for images
    mount.addEventListener('contextmenu', (e) => {
      if (e.target.tagName === 'IMG' && (e.target.classList.contains('idsq-option-image') || e.target.classList.contains('idsq-final-single-image') || e.target.classList.contains('idsq-final-image'))) {
        e.preventDefault();
      }
    });

    // Load saved state from localStorage
    const loadState = () => {
      try {
        const saved = localStorage.getItem('idsq-quiz-progress');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    };
    
    // Save state to localStorage
    const saveState = (stateToSave) => {
      try {
        localStorage.setItem('idsq-quiz-progress', JSON.stringify(stateToSave));
      } catch (e) {
        console.warn('[IDSQ] Could not save progress to localStorage');
      }
    };
    
    // Clear saved state
    const clearState = () => {
      try {
        localStorage.removeItem('idsq-quiz-progress');
      } catch (e) {
        console.warn('[IDSQ] Could not clear progress from localStorage');
      }
    };
    
    const savedState = loadState();
    
    // Check URL parameters for invitation status and name
    const urlParams = new URLSearchParams(window.location.search);
    const urlRid = urlParams.get('rid');
    const urlCp = urlParams.get('cp');
    const urlName = urlParams.get('name');
    const isInvited = !!(urlRid || urlCp);
    
    // Pre-fill name from URL if provided
    const urlParticipantName = urlName ? decodeURIComponent(urlName.trim()) : null;
    
    const state = savedState || {
      currentFlow: 'intro', // intro -> name -> space-selection -> word-association -> quiz -> lead -> final
      currentStep: -1,
      selectedSpace: null,
      participantName: urlParticipantName || null,
      wordChoice: null,
      choices: [],
      topStyles: [],
      finalStyle: null,
      leadData: {},
      newsLetterSignup: false,
      invited: isInvited,
      rid: urlRid || null,
      cp: urlCp || null,
    };
    
    // If state was loaded but URL has new invitation params, update them
    if (savedState) {
      if (urlRid || urlCp) {
        state.invited = true;
        state.rid = urlRid || state.rid;
        state.cp = urlCp || state.cp;
      }
      if (urlParticipantName && !state.participantName) {
        state.participantName = urlParticipantName;
      }
    }

    function getStepsForSpace(spaceId) {
      const explicit = config.stepsBySpace && (config.stepsBySpace[spaceId] || config.stepsBySpace['general']);
      if (explicit && explicit.length >= 4) return explicit;
      // Fallback to dynamic steps to ensure 12-style coverage
      return buildDynamicStepsFromLibrary(config.styleLibrary, spaceId);
    }
    
    function getPersonalizedPrompt(basePrompt) {
      if (state.participantName) {
        return basePrompt.replace(/\b(Which|What|Select|Choose|Pick)\b/, (match) => {
          return match;
        }) + (basePrompt.includes('?') ? '' : ', ' + state.participantName + '?');
      }
      return basePrompt;
    }

    const handlers = {
      onStart() {
        state.currentFlow = 'name-capture';
        saveState(state);
        renderNameCapture(config, mount, handlers);
      },
      onSubmitName(name) {
        state.participantName = name;
        state.currentFlow = 'space-selection';
        saveState(state);
        renderSpaceSelection(config, mount, handlers);
      },
      onSelectSpace(spaceId) {
        state.selectedSpace = spaceId;
        state.currentFlow = 'word-association';
        state.choices = [];
        state.wordChoice = null;
        saveState(state);
        renderWordAssociation(config, mount, state, handlers);
      },
      onSelectWord(wordData) {
        state.wordChoice = wordData;
        state.currentFlow = 'quiz';
        state.currentStep = 0;
        saveState(state);
        const steps = getStepsForSpace(state.selectedSpace);
        renderStep(config, mount, state, handlers, steps);
      },
      onSelectOption(option) {
        state.choices[state.currentStep] = option;
        saveState(state);
        const steps = getStepsForSpace(state.selectedSpace);
        if (state.currentStep < steps.length - 1) {
          // Show a milestone tip between rounds
          if (state.currentStep === 0) {
            // Just completed round 1
            renderMilestoneTip(config, mount, state.selectedSpace, 1, () => {
          state.currentStep += 1;
              saveState(state);
              renderStep(config, mount, state, handlers, steps);
            });
          } else if (state.currentStep === 1) {
            // Just completed round 2
            renderMilestoneTip(config, mount, state.selectedSpace, 2, () => {
              state.currentStep += 1;
              saveState(state);
              renderStep(config, mount, state, handlers, steps);
            });
          } else if (state.currentStep === 2) {
            // Just completed round 3
            renderMilestoneTip(config, mount, state.selectedSpace, 3, () => {
              state.currentStep += 1;
              saveState(state);
              renderStep(config, mount, state, handlers, steps);
            });
        } else {
            state.currentStep += 1;
            saveState(state);
            renderStep(config, mount, state, handlers, steps);
          }
        } else {
          // On the last step (round 4), use the same logic as the "Next" button
          // This ensures we check for existing name/email and skip newsletter if already provided
          handlers.onProceedToFinal();
        }
      },
      onSubmitLead(leadData) {
        // Update or merge leadData to preserve existing data
        state.leadData = {
          ...state.leadData,
          ...leadData,
        };
        // If name was provided in lead form, update participantName
        if (leadData.name && leadData.name.trim()) {
          state.participantName = leadData.name.trim();
        }
        state.newsLetterSignup = !!leadData.newsLetterSignup;
        saveState(state);
        renderFinalSelection(config, mount, state, handlers);
      },
      async onSelectFinal(styleResult) {
        const definition = config.styleLibrary[styleResult.styleId];
        state.finalStyle = {
          ...styleResult,
          ...definition,
        };

        // Fire-and-forget webhook; do not block UI
        const payload = buildWebhookPayload(config, state);
        sendToWebhook(config, payload).catch(() => {
          // Silently fail - don't interrupt user experience
        });
        renderSuccess(config, mount, state, handlers);
      },
      onGoBack() {
        if (state.currentStep > 0) {
          state.currentStep -= 1;
          saveState(state);
          const steps = getStepsForSpace(state.selectedSpace);
          renderStep(config, mount, state, handlers, steps);
        } else if (state.currentFlow === 'quiz') {
          // Go back to word association
          state.currentFlow = 'word-association';
          saveState(state);
          renderWordAssociation(config, mount, state, handlers);
        } else if (state.currentFlow === 'word-association') {
          // Go back to space selection
          state.currentFlow = 'space-selection';
          saveState(state);
          renderSpaceSelection(config, mount, handlers);
        }
      },
      onGoBackToLastStep() {
        // Go back from final selection to round 4 (last quiz step)
        state.currentFlow = 'quiz';
        const steps = getStepsForSpace(state.selectedSpace);
        state.currentStep = steps.length - 1;
        saveState(state);
        renderStep(config, mount, state, handlers, steps);
      },
      onProceed() {
        const steps = getStepsForSpace(state.selectedSpace);
        if (state.currentStep < steps.length - 1) {
          state.currentStep += 1;
          saveState(state);
          renderStep(config, mount, state, handlers, steps);
        }
      },
      onProceedToFinal() {
        // Check if name and email are already filled - if so, skip newsletter signup
        // Name can be in multiple places: participantName, leadData.participantName, or leadData.name
        const hasName = state.participantName || 
                       (state.leadData && state.leadData.participantName) || 
                       (state.leadData && state.leadData.name && state.leadData.name.trim());
        const hasEmail = state.leadData && state.leadData.email && state.leadData.email.trim();
        
        const { results, map } = calculateTopStyles(config, state.choices, state.wordChoice);
        state.topStyles = results;
        state.styleScores = map;
        saveState(state);
        
        // If user is invited (rid/cp in URL), skip newsletter signup entirely
        // Also skip if both name and email are already present
        if ((state.invited && hasName) || (hasName && hasEmail)) {
          // Auto-submit the existing lead data - use the actual name/email values, not just truthy check
          const actualName = state.participantName || (state.leadData && state.leadData.participantName) || (state.leadData && state.leadData.name);
          const actualEmail = (state.leadData && state.leadData.email) || null;
          const leadPayload = {
            name: actualName,
            email: actualEmail,
            newsLetterSignup: state.leadData?.newsLetterSignup || false,
          };
          handlers.onSubmitLead(leadPayload);
        } else if (config.leadCapture.enable && !state.invited) {
          // Still need to collect info, show newsletter form (but not for invited users)
          handlers._state = state;
          renderLeadCapture(config, mount, handlers);
        } else {
          // No lead capture or invited user, go directly to final selection
          renderFinalSelection(config, mount, state, handlers);
        }
      },
      onRestart() {
        clearState();
        state.currentFlow = 'intro';
        state.currentStep = -1;
        state.selectedSpace = null;
        state.participantName = null;
        state.wordChoice = null;
        state.choices = [];
        state.topStyles = [];
        state.finalStyle = null;
        state.leadData = {};
        state.newsLetterSignup = false;
        renderIntro(config, mount, handlers);
      },
    };

    // Restore to saved flow if exists
    if (savedState) {
      const flow = savedState.currentFlow;
      if (flow === 'intro') {
        renderIntro(config, mount, handlers);
      } else if (flow === 'name-capture') {
        renderNameCapture(config, mount, handlers);
      } else if (flow === 'space-selection') {
        renderSpaceSelection(config, mount, handlers);
      } else if (flow === 'word-association') {
        renderWordAssociation(config, mount, state, handlers);
      } else if (flow === 'quiz') {
        const steps = getStepsForSpace(state.selectedSpace);
        renderStep(config, mount, state, handlers, steps);
      } else {
        renderIntro(config, mount, handlers);
      }
    } else {
      renderIntro(config, mount, handlers);
    }
  }

  if (typeof window !== 'undefined') {
    window.IDSQ = {
      buildQuiz,
    };
  }
})();
