(function () {
  const DEFAULT_CONFIG = {
    mountSelector: '#idsq-root',
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
      namePlaceholder: 'Your first name',
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
    airtable: {
      apiKey: 'YOUR_AIRTABLE_API_KEY',
      baseId: 'YOUR_AIRTABLE_BASE_ID',
      tableName: 'Responses',
      enable: false,
      mapFields: function (payload) {
        return {
          Name: payload.participantName || 'Anonymous',
          Email: payload.email || 'unknown@example.com',
          'Space Type': payload.selectedSpace || '',
          'Word Association': payload.wordChoice?.word || '',
          'Slide 1 Choice': payload.choices[0]?.styleName || '',
          'Slide 2 Choice': payload.choices[1]?.styleName || '',
          'Slide 3 Choice': payload.choices[2]?.styleName || '',
          'Final Style': payload.finalStyle?.styleName || '',
          'Final Style Score': payload.finalStyle?.score || 0,
          'Chosen Styles JSON': JSON.stringify(payload.styleScores),
          Timestamp: new Date().toISOString(),
        };
      },
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
    stepsBySpace: {
      'living-room': [
      {
        id: 'round-1',
          prompt: 'Which living room feels inviting?',
        options: [
          {
              id: 'coastal-lr-1',
            styleId: 'coastal',
            title: 'Coastal Breeze',
              imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
          },
          {
              id: 'midcentury-lr-1',
            styleId: 'midcentury',
            title: 'Mid-Century Warmth',
              imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
          },
          {
              id: 'modern-lr-1',
            styleId: 'modern',
            title: 'Modern Minimal',
              imageUrl: 'https://images.unsplash.com/photo-1513708926248-8e9c4e5f8bc1?auto=format&fit=crop&w=900&q=80',
          },
        ],
      },
      {
        id: 'round-2',
          prompt: 'Which comfort style do you prefer?',
        options: [
          {
              id: 'boho-lr-1',
            styleId: 'bohemian',
            title: 'Bohemian Retreat',
              imageUrl: 'https://images.unsplash.com/photo-1591265693688-4a2581cd60d9?auto=format&fit=crop&w=900&q=80',
          },
          {
              id: 'industrial-lr-1',
            styleId: 'industrial',
            title: 'Industrial Loft',
              imageUrl: 'https://images.unsplash.com/photo-1523445141163-cd72d2e7c9d0?auto=format&fit=crop&w=900&q=80',
          },
          {
              id: 'coastal-lr-2',
            styleId: 'coastal',
            title: 'Coastal Calm',
              imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
          },
        ],
      },
      {
        id: 'round-3',
          prompt: 'Which atmosphere resonates with you?',
        options: [
          {
              id: 'modern-lr-2',
              styleId: 'modern',
              title: 'Modern Gathering',
              imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'farmhouse-lr-1',
              styleId: 'farmhouse',
              title: 'Farmhouse Comfort',
              imageUrl: 'https://images.unsplash.com/photo-1584718528450-05c0e0ebf6d4?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'boho-lr-2',
              styleId: 'bohemian',
              title: 'Bohemian Elegance',
              imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
      ],
      'bedroom': [
        {
          id: 'round-1',
          prompt: 'Which bedroom speaks to you?',
          options: [
            {
              id: 'bedroom-coastal-1',
              styleId: 'coastal',
              title: 'Coastal Sanctuary',
              imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea3?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'bedroom-boho-1',
              styleId: 'bohemian',
              title: 'Bohemian Oasis',
              imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f7b?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'bedroom-modern-1',
              styleId: 'modern',
              title: 'Modern Retreat',
              imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&auto=format&fit=crop&q=80',
            },
          ],
        },
        {
          id: 'round-2',
          prompt: 'What ambiance do you seek?',
          options: [
            {
              id: 'bedroom-midcentury-1',
              styleId: 'midcentury',
              title: 'Mid-Century Comfort',
              imageUrl: 'https://images.unsplash.com/photo-1631079984478-892075900ce5?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'bedroom-industrial-1',
              styleId: 'industrial',
              title: 'Industrial Haven',
              imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'bedroom-farmhouse-1',
              styleId: 'farmhouse',
              title: 'Farmhouse Serenity',
              imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&auto=format&fit=crop&q=80',
            },
          ],
        },
        {
          id: 'round-3',
          prompt: 'Which personal sanctuary appeals to you?',
          options: [
            {
              id: 'bedroom-coastal-2',
              styleId: 'coastal',
              title: 'Coastal Calm',
              imageUrl: 'https://images.unsplash.com/photo-1622760276236-3b5fb4fe2477?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'bedroom-modern-2',
              styleId: 'modern',
              title: 'Modern Minimal',
              imageUrl: 'https://images.unsplash.com/photo-1631871615281-493e2c8f232d?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'bedroom-boho-2',
              styleId: 'bohemian',
              title: 'Boho Sanctuary',
              imageUrl: 'https://images.unsplash.com/photo-1598827370848-914e73970511?w=900&auto=format&fit=crop&q=80',
            },
          ],
        },
      ],
      'kitchen': [
        {
          id: 'round-1',
          prompt: 'Which kitchen inspires you?',
          options: [
            {
              id: 'kitchen-modern-1',
              styleId: 'modern',
              title: 'Modern Minimal',
              imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'kitchen-farmhouse-1',
              styleId: 'farmhouse',
              title: 'Farmhouse Kitchen',
              imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'kitchen-industrial-1',
              styleId: 'industrial',
              title: 'Industrial Loft',
              imageUrl: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
        {
          id: 'round-2',
          prompt: 'What culinary atmosphere appeals to you?',
          options: [
            {
              id: 'kitchen-coastal-1',
              styleId: 'coastal',
              title: 'Coastal Breeze',
              imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'kitchen-midcentury-1',
              styleId: 'midcentury',
              title: 'Mid-Century Warmth',
              imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'kitchen-boho-1',
              styleId: 'bohemian',
              title: 'Bohemian Gathering',
              imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
        {
          id: 'round-3',
          prompt: 'Which dining experience resonates with you?',
          options: [
            {
              id: 'kitchen-modern-2',
            styleId: 'modern',
            title: 'Modern Gathering',
            imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
          },
          {
              id: 'kitchen-farmhouse-2',
            styleId: 'farmhouse',
            title: 'Farmhouse Comfort',
            imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
          },
          {
              id: 'kitchen-coastal-2',
              styleId: 'coastal',
              title: 'Coastal Calm',
              imageUrl: 'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
      ],
      'bathroom': [
        {
          id: 'round-1',
          prompt: 'Which bathroom spa experience calls to you?',
          options: [
            {
              id: 'bathroom-modern-1',
              styleId: 'modern',
              title: 'Modern Sanctuary',
              imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'bathroom-coastal-1',
              styleId: 'coastal',
              title: 'Coastal Serenity',
              imageUrl: 'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'bathroom-industrial-1',
              styleId: 'industrial',
              title: 'Industrial Retreat',
              imageUrl: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
        {
          id: 'round-2',
          prompt: 'What wellness atmosphere do you prefer?',
          options: [
            {
              id: 'bathroom-boho-1',
            styleId: 'bohemian',
              title: 'Bohemian Spa',
            imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
          },
            {
              id: 'bathroom-midcentury-1',
              styleId: 'midcentury',
              title: 'Mid-Century Luxury',
              imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'bathroom-farmhouse-1',
              styleId: 'farmhouse',
              title: 'Farmhouse Sanctuary',
              imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
        {
          id: 'round-3',
          prompt: 'Which rejuvenation space resonates with you?',
          options: [
            {
              id: 'bathroom-modern-2',
              styleId: 'modern',
              title: 'Modern Wellness',
              imageUrl: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'bathroom-coastal-2',
              styleId: 'coastal',
              title: 'Coastal Bath',
              imageUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'bathroom-industrial-2',
              styleId: 'industrial',
              title: 'Industrial Luxury',
              imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
      ],
      'office': [
        {
          id: 'round-1',
          prompt: 'Which office inspires productivity?',
          options: [
            {
              id: 'office-modern-1',
              styleId: 'modern',
              title: 'Modern Work',
              imageUrl: 'https://images.unsplash.com/photo-1495465798138-718f86d1a4f1?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'office-contemporary-1',
              styleId: 'contemporary',
              title: 'Contemporary',
              imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'office-traditional-1',
              styleId: 'traditional',
              title: 'Traditional Study',
              imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80',
            },
          ],
        },
        {
          id: 'round-2',
          prompt: 'What work atmosphere appeals to you?',
          options: [
            {
              id: 'office-industrial-1',
              styleId: 'industrial',
              title: 'Industrial Loft',
              imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'office-midcentury-1',
              styleId: 'midcentury',
              title: 'Mid-Century',
              imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'office-rustic-1',
              styleId: 'rustic',
              title: 'Rustic Charm',
              imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=900&auto=format&fit=crop&q=80',
            },
          ],
        },
        {
          id: 'round-3',
          prompt: 'Which workspace resonates with you?',
          options: [
            {
              id: 'office-transitional-1',
              styleId: 'transitional',
              title: 'Transitional',
              imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'office-contemporary-2',
              styleId: 'contemporary',
              title: 'Contemporary Comfort',
              imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&auto=format&fit=crop&q=80',
            },
            {
              id: 'office-modern-2',
              styleId: 'modern',
              title: 'Modern Minimal',
              imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&auto=format&fit=crop&q=80',
            },
          ],
        },
      ],
      'general': [
        {
          id: 'round-1',
          prompt: 'Which aesthetic speaks to you?',
          options: [
            {
              id: 'general-coastal-1',
              styleId: 'coastal',
              title: 'Coastal Breeze',
              imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'general-midcentury-1',
              styleId: 'midcentury',
              title: 'Mid-Century Modern',
              imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'general-modern-1',
              styleId: 'modern',
              title: 'Modern Minimal',
              imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
        {
          id: 'round-2',
          prompt: 'What overall vibe do you prefer?',
          options: [
            {
              id: 'general-boho-1',
              styleId: 'bohemian',
              title: 'Bohemian',
              imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'general-industrial-1',
              styleId: 'industrial',
              title: 'Industrial',
              imageUrl: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'general-farmhouse-1',
              styleId: 'farmhouse',
              title: 'Farmhouse',
              imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
        {
          id: 'round-3',
          prompt: 'Which design direction resonates with you?',
          options: [
            {
              id: 'general-modern-2',
              styleId: 'modern',
              title: 'Modern',
              imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'general-coastal-2',
              styleId: 'coastal',
              title: 'Coastal',
              imageUrl: 'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?auto=format&fit=crop&w=900&q=80',
            },
            {
              id: 'general-boho-2',
              styleId: 'bohemian',
              title: 'Bohemian',
              imageUrl: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80',
            },
          ],
        },
      ],
    },
    styleLibrary: {
      coastal: {
        styleName: 'Coastal',
        description: 'In the simplest definition, coastal is beachy. Through use of natural light, soft tones, and a clean aesthetic, it\'s meant to evoke the breeziness of the beach. Basically, it feels like summer year-round inside your house.',
        finalImages: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=900&auto=format&fit=crop&q=80',
        ],
      },
      contemporary: {
        styleName: 'Contemporary',
        description: 'Contemporary style encompasses a range of styles developed in the latter half of the 20th century. Pieces feature softened and rounded lines as opposed to the stark lines seen in modern design. Interiors contain neutral elements and bold color, and they focus on the basics of line, shape and form.',
        finalImages: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&auto=format&fit=crop&q=80',
        ],
      },
      farmhouse: {
        styleName: 'Farmhouse',
        description: 'Defined by practicality and comfort, relying on readily available materials and colors. Wood elements and white tones are indicative of farmhouse style. Timber was the easiest to come by, which is why there\'s such an emphasis on wood elements.',
        finalImages: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1584718528450-05c0e0ebf6d4?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&auto=format&fit=crop&q=80',
        ],
      },
      industrial: {
        styleName: 'Industrial',
        description: 'Comprised of stripped back architectural details including the use of bare bricks, metals, and wood, as well as salvaged and recycled materials. Industrial style furnishings are usually hardwearing and often obtained from reclaimed yards.',
        finalImages: [
          'https://images.unsplash.com/photo-1523445141163-cd72d2e7c9d0?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&auto=format&fit=crop&q=80',
        ],
      },
      midcentury: {
        styleName: 'Mid-Century Modern',
        description: 'Focuses on clean lines with a mix of both organic and geometric shapes. Simplicity rules, and some of the most basic mid-century modern living room pieces like coffee tables and chairs are often the most beautiful.',
        finalImages: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&auto=format&fit=crop&q=80',
        ],
      },
      modern: {
        styleName: 'Modern',
        description: 'Sleek and uncluttered style that began in the late 19th century. In its purest form, modernism reflects a fuss-free approach to life. As a result, designers kept décor minimal while emphasizing industrial materials. In addition, patterns are also few and far between.',
        finalImages: [
          'https://images.unsplash.com/photo-1513708926248-8e9c4e5f8bc1?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&auto=format&fit=crop&q=80',
        ],
      },
      rustic: {
        styleName: 'Rustic',
        description: 'Offers a unique, inviting atmosphere that is perfect for entertaining guests. The natural materials and warm colors create a cozy and inviting space that makes everyone feel at home. The vintage accents and textures add character and charm, making it an unforgettable experience for your guests.',
        finalImages: [
          'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&auto=format&fit=crop&q=80',
        ],
      },
      traditional: {
        styleName: 'Traditional',
        description: 'Calm, orderly, and predictable. There is nothing wild or chaotic in a traditional room. Furnishings are classic and timeless.',
        finalImages: [
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?w=900&auto=format&fit=crop&q=80',
        ],
      },
      transitional: {
        styleName: 'Transitional',
        description: 'Reflective of a room\'s meshing of modern and traditional elements — essentially, combining two styles in one space, resulting in a cohesive design.',
        finalImages: [
          'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&auto=format&fit=crop&q=80',
        ],
      },
    },
  };

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
    const intro = createElement('section', 'idsq-intro');
    
    // Clara's profile picture
    const claraWrapper = createElement('div', 'idsq-clara-profile-wrapper');
    const claraProfile = createElement('img', 'idsq-clara-profile', {
      src: config.copy.claraProfileUrl,
      alt: 'Clara - Your Interior Design Expert',
    });
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
      });
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

  function renderWordAssociation(config, mount, handlers) {
    const section = createElement('section', 'idsq-step');
    
    // Add Clara avatar
    const claraWrapper = createElement('div', 'idsq-clara-mini-wrapper');
    const claraMini = createElement('img', 'idsq-clara-mini', {
      src: config.copy.claraProfileUrl,
      alt: 'Clara',
    });
    const claraInfo = createElement('p', 'idsq-clara-info');
    claraInfo.innerHTML = '<span class="idsq-clara-info-name">Clara</span> · Interior Design Expert';
    claraWrapper.appendChild(claraMini);
    claraWrapper.appendChild(claraInfo);
    
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.wordAssociationTitle;
    const description = createElement('p', 'idsq-description');
    description.textContent = config.copy.wordAssociationDescription;
    
    section.appendChild(claraWrapper);

    const wordContainer = createElement('div', 'idsq-word-container');

    // Position words organically with random sizes - container flows naturally
    config.wordAssociation.words.forEach((wordData, index) => {
      const card = createElement('button', 'idsq-word-card');
      card.classList.add(`idsq-word-${wordData.size}`);
      card.textContent = wordData.word;
      card.addEventListener('click', () => handlers.onSelectWord(wordData));
      
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
    });
    const claraInfo = createElement('p', 'idsq-clara-info');
    claraInfo.innerHTML = '<span class="idsq-clara-info-name">Clara</span> · Interior Design Expert';
    claraWrapper.appendChild(claraMini);
    claraWrapper.appendChild(claraInfo);
    section.appendChild(claraWrapper);

    const prompt = createElement('h2', 'idsq-title');
    let personalizedPrompt = step.prompt;
    
    // Personalize prompts naturally - only mention name on the first question
    // After that, it feels more like a natural conversation
    if (state.participantName && state.currentStep === 0) {
      // Only add the name on the very first question
      if (personalizedPrompt.endsWith('?')) {
        personalizedPrompt = personalizedPrompt.slice(0, -1) + ', ' + state.participantName + '?';
      }
    }
    
    prompt.textContent = personalizedPrompt;
    
    // Add helpful instruction text
    const instruction = createElement('p', 'idsq-instruction');
    instruction.textContent = 'Trust your intuition—which image speaks to you?';

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
      });

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
    if (hasSelection && state.currentStep < steps.length - 1) {
      const nextButton = createElement('button', 'idsq-button idsq-button-primary');
      nextButton.textContent = 'Next →';
      nextButton.addEventListener('click', handlers.onProceed);
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
    });
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
        'Your living room is the heart of your home—it sets the tone for everything else. I always tell my clients to think about how people will actually move through and gather in this space.',
        'Natural light is your best friend in interior design! Notice how the sun moves through your space during the day—this will help guide us in choosing colors and window treatments.',
        'You\'re making fantastic choices! Remember, the best design balances function with beauty. We\'re finding pieces that work for YOUR lifestyle, not someone else\'s idea of perfect.'
      ],
      'bedroom': [
        'Your bedroom should be your sanctuary—a place where you truly feel at peace. When I design bedrooms, I always prioritize what makes my clients feel most comfortable and recharged.',
        'Storage doesn\'t have to be an eyesore! I love finding creative ways to blend function with form. Beautiful design can be practical too—that\'s the magic.',
        'We\'re almost there! Bedroom design is deeply personal, and you\'re doing an amazing job trusting your instincts. You know what makes you feel most at peace—let\'s honor that.'
      ],
      'kitchen': [
        'Kitchens are truly the heart of the home! When designing a kitchen, I always ask my clients to walk me through how they actually cook and entertain. That real-life workflow is everything.',
        'Good lighting in a kitchen is non-negotiable—it\'s one of those things that makes every task easier. I love layering task lighting under cabinets with ambient light for both function and mood.',
        'We\'re in the home stretch! A well-designed kitchen doesn\'t just look beautiful—it saves you time and makes everyday tasks so much more enjoyable. That\'s good design.'
      ],
      'bathroom': [
        'Bathrooms should be peaceful retreats—even for quick morning routines. I\'ve designed powder rooms that feel like mini spas through the right materials and lighting. Every space deserves that sanctuary feeling!',
        'Storage doesn\'t have to mean clutter! I love finding clever storage solutions that blend function with form. Medicine cabinets, vanity drawers, niche shelving—we can make it beautiful.',
        'Almost there! Remember, even small bathrooms can feel luxurious. It\'s all about the right lighting, materials, and attention to detail. You deserve that sanctuary feeling every day.'
      ],
      'office': [
        'Your office should inspire productivity while reflecting your personal style. I always ask clients: how do you work best—quiet focus or collaborative energy? That drives the whole design.',
        'Lighting in a home office is absolutely crucial. Natural light boosts mood and productivity, and I always add task lighting to prevent eye strain during long work sessions—your eyes will thank you!',
        'Almost there! Your office is your professional sanctuary. Let\'s make it a space where you genuinely love to work. That\'s when the magic happens.'
      ],
      'general': [
        'Color is one of the most powerful tools in my design toolkit. I love helping clients choose a palette that speaks to their personality—we use it consistently to create that feeling of harmony throughout your home.',
        'I always tell clients: mixing textures adds so much depth to a space! Smooth with rough, shiny with matte, soft with hard. That\'s what creates real visual interest and keeps a room dynamic.',
        'Final round! Trust your instincts—the best design reflects who you are and how you want to live. You\'re discovering that, and I\'m here to guide you through it.'
      ]
    };
    
    if (messages[space] && messages[space][roundNumber - 1]) {
      return messages[space][roundNumber - 1];
    }
    return messages['general'][roundNumber - 1];
  }
  
  // Keep design tip cache for reference (not used for milestones)
  const designTipCache = {
    'living-room': [],
    'bedroom': [],
    'kitchen': [],
    'bathroom': [],
    'general': []
  };

  function renderLeadCapture(config, mount, handlers) {
    const section = createElement('section', 'idsq-lead-capture');
    const title = createElement('h2', 'idsq-title');
    title.textContent = 'Get Your Design Style Results';

    const form = createElement('form', 'idsq-form');

    // Email field (optional)
    const emailField = createInputField('Email (Optional)', 'email', 'email', false);
    emailField.input.placeholder = 'Enter your email address';

    form.appendChild(emailField.wrapper);

    // Newsletter signup checkbox
    const newsletterWrapper = createElement('label', 'idsq-checkbox-field');
    const checkbox = createElement('input', 'idsq-checkbox', {
      type: 'checkbox',
      name: 'newsLetterSignup',
      id: 'idsq-newsletter-signup',
    });
    const checkboxLabel = createElement('span', 'idsq-checkbox-label');
    checkboxLabel.innerHTML = '<strong>Yes, I want to sign up for the newsletter!</strong>';
    const checkboxDescription = createElement('p', 'idsq-checkbox-description');
    checkboxDescription.innerHTML = 'Be the envy of your friends! Get <strong>VIP access</strong> to interior design inspiration, expert advice, and exclusive updates. Stay ahead of the curve...<strong>don\'t miss out</strong> - be the first to know about the latest trends, styles, and special offers tailored just for you!';
    
    newsletterWrapper.appendChild(checkbox);
    newsletterWrapper.appendChild(checkboxLabel);
    newsletterWrapper.appendChild(checkboxDescription);
    form.appendChild(newsletterWrapper);

    const submit = createElement('button', 'idsq-button idsq-button-primary', { type: 'submit' });
    submit.textContent = config.copy.submitButton;
    form.appendChild(submit);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

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

    const grid = createElement('div', 'idsq-option-grid');
    state.topStyles.forEach((styleResult) => {
      const styleDefinition = config.styleLibrary[styleResult.styleId];
      if (!styleDefinition) return;
      const card = createElement('button', 'idsq-option-card', { type: 'button' });
      card.addEventListener('click', () => handlers.onSelectFinal(styleResult));

      // Show only ONE unique image per style (first image from finalImages)
      const image = createElement('img', 'idsq-final-single-image', {
        src: styleDefinition.finalImages[0],
        alt: `Style option ${state.topStyles.indexOf(styleResult) + 1}`,
          loading: 'lazy',
      });
      
      card.appendChild(image);
      grid.appendChild(card);
    });

    // Add Start Over button
    const navigation = createElement('div', 'idsq-step-navigation');
    const restartButton = createElement('button', 'idsq-button idsq-button-secondary');
    restartButton.textContent = 'Start Over';
    restartButton.addEventListener('click', handlers.onRestart);
    navigation.appendChild(restartButton);
    const spacer = createElement('div', 'idsq-step-spacer');
    navigation.appendChild(spacer);

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

    const card = createElement('article', 'idsq-final-result');
    
    // Single large image
    const imageContainer = createElement('div', 'idsq-final-single-container');
    const img = createElement('img', 'idsq-final-single-image', {
      src: state.finalStyle.finalImages[0],
      alt: `${state.finalStyle.styleName} inspiration`,
        loading: 'lazy',
      });
    imageContainer.appendChild(img);

    const styleDescription = createElement('p', 'idsq-final-description');
    styleDescription.textContent = state.finalStyle.description;

    card.appendChild(imageContainer);
    card.appendChild(styleDescription);

    // Scheduling CTA
    const scheduleCTA = createElement('div', 'idsq-schedule-cta');
    const ctaTitle = createElement('h3', 'idsq-schedule-cta-title');
    ctaTitle.textContent = config.copy.scheduleCTATitle;
    const ctaDescription = createElement('p', 'idsq-schedule-cta-description');
    ctaDescription.textContent = config.copy.scheduleCTADescription;
    const scheduleButton = createElement('a', 'idsq-button idsq-button-primary', {
      href: 'https://www.jlcoates.com/interior-design/contact',
      target: '_blank',
      rel: 'noopener noreferrer',
    });
    scheduleButton.textContent = config.copy.scheduleButton;

    scheduleCTA.appendChild(ctaTitle);
    scheduleCTA.appendChild(ctaDescription);
    scheduleCTA.appendChild(scheduleButton);

    const restart = createElement('button', 'idsq-button idsq-button-secondary');
    restart.textContent = config.copy.retryButton;
    restart.addEventListener('click', handlers.onRestart);

    section.appendChild(title);
    section.appendChild(card);
    section.appendChild(scheduleCTA);
    section.appendChild(restart);

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
      }
      .idsq-title {
        font-size: clamp(2rem, 3vw + 1rem, 2.375rem);
        font-weight: 900;
        margin-bottom: 1.25rem;
        color: var(--idsq-text);
        text-align: center;
        line-height: 1.2;
      }
      .idsq-hidden { display: none !important; }
      .idsq-description {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: rgba(44, 44, 44, 0.7);
        text-align: center;
        line-height: 1.875;
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
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        border-radius: 9999px;
        padding: 0.85rem 1.75rem;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
        border: 2px solid transparent;
      }
      .idsq-button-primary {
        background: var(--idsq-primary);
        color: #ffffff;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
      .idsq-button-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
      }
      .idsq-button-secondary {
        background: transparent;
        color: var(--idsq-primary);
        border-color: var(--idsq-primary);
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
      .idsq-restart-btn {
        font-size: 1rem;
        padding: 0.85rem 1.75rem;
      }
      .idsq-option-image,
      .idsq-final-image {
        width: 100%;
        height: 280px;
        object-fit: cover;
        display: block;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(44, 44, 44, 0.1);
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
      }
      .idsq-logo {
        max-width: 140px;
        margin-bottom: 1.5rem;
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
      .idsq-schedule-cta {
        margin-top: 2rem;
        padding: 1.75rem;
        background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
        border-radius: 12px;
        border: 1.5px solid var(--idsq-primary);
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }
      .idsq-schedule-cta-title {
        font-size: 1.35rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        color: var(--idsq-text);
      }
      .idsq-schedule-cta-description {
        font-size: 0.95rem;
        margin-bottom: 1.25rem;
        color: rgba(44, 44, 44, 0.7);
        line-height: 1.5;
      }
      .idsq-success .idsq-button-secondary {
        margin-top: 1.5rem;
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
      .idsq-checkbox-field:hover {
        border-color: var(--idsq-primary);
        background: #f0f4f8;
      }
      .idsq-checkbox-field input[type="checkbox"] {
        width: 20px;
        height: 20px;
        margin-right: 0.75rem;
        cursor: pointer;
        accent-color: var(--idsq-primary);
      }
      .idsq-checkbox-label {
        font-size: 1rem;
        font-weight: 600;
        color: var(--idsq-text);
        cursor: pointer;
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
          padding: 1.25rem;
          margin-top: 1.5rem;
        }
        .idsq-schedule-cta-title {
          font-size: 1.15rem;
        }
        .idsq-schedule-cta-description {
          font-size: 0.875rem;
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
    
    const state = savedState || {
      currentFlow: 'intro', // intro -> name -> space-selection -> word-association -> quiz -> lead -> final
      currentStep: -1,
      selectedSpace: null,
      participantName: null,
      wordChoice: null,
      choices: [],
      topStyles: [],
      finalStyle: null,
      leadData: {},
      newsLetterSignup: false,
    };

    function getStepsForSpace(spaceId) {
      return config.stepsBySpace && config.stepsBySpace[spaceId] 
        ? config.stepsBySpace[spaceId] 
        : config.stepsBySpace['general'] || [];
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
        renderWordAssociation(config, mount, handlers);
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
        } else {
            state.currentStep += 1;
            saveState(state);
            renderStep(config, mount, state, handlers, steps);
          }
        } else {
          const { results, map } = calculateTopStyles(config, state.choices, state.wordChoice);
          state.topStyles = results;
          state.styleScores = map;
          saveState(state);
          if (config.leadCapture.enable) {
            renderLeadCapture(config, mount, handlers);
          } else {
            renderFinalSelection(config, mount, state, handlers);
          }
        }
      },
      onSubmitLead(leadData) {
        state.leadData = leadData;
        saveState(state);
        renderFinalSelection(config, mount, state, handlers);
      },
      async onSelectFinal(styleResult) {
        const definition = config.styleLibrary[styleResult.styleId];
        state.finalStyle = {
          ...styleResult,
          ...definition,
        };

        renderLoading(config, mount);
        try {
          await sendToAirtable(config, {
            participantName: state.leadData.participantName,
            email: state.leadData.email,
            selectedSpace: state.selectedSpace,
            wordChoice: state.wordChoice,
            choices: state.choices.map((option) => {
              if (!option) return null;
              const styleDefinition = config.styleLibrary[option.styleId];
              return {
                optionId: option.id,
                optionTitle: option.title,
                styleId: option.styleId,
                styleName: styleDefinition?.styleName || option.styleId,
              };
            }),
            finalStyle: state.finalStyle,
            styleScores: state.styleScores,
          });
          renderSuccess(config, mount, state, handlers);
        } catch (error) {
          console.error('[IDSQ] Airtable error:', error);
          renderError(config, mount, handlers);
        }
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
          renderWordAssociation(config, mount, handlers);
        } else if (state.currentFlow === 'word-association') {
          // Go back to space selection
          state.currentFlow = 'space-selection';
          saveState(state);
          renderSpaceSelection(config, mount, handlers);
        }
      },
      onProceed() {
        const steps = getStepsForSpace(state.selectedSpace);
        if (state.currentStep < steps.length - 1) {
          state.currentStep += 1;
          saveState(state);
          renderStep(config, mount, state, handlers, steps);
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
        renderWordAssociation(config, mount, handlers);
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
