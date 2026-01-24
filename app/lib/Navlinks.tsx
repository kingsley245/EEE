export const navLinks = [
  { name: 'Home', path: '/', links: [] },
  { name: 'Tutorial', path: '/Tutorial', links: [] },
  {
    name: 'Electrical Wiring',
    path: '/electrical-wiring',
    links: [
      {
        text: 'Home Electrical Wiring',
        label: 'TRENDING',
        labelColor: 'bg-red-600',
      },
      {
        text: 'Solar Panels Installation',
        label: 'HOT',
        labelColor: 'bg-blue-600',
      },
      { text: '1 Phase & 3 Phase Wiring', label: '' },
    ],
    // Structured for slider
    content: [
      {
        image: '/final year student.jpg',
        title: 'How to Wire a Single-Pole GFCI Breaker in a 120/240V Panel',
        sidePosts: [
          {
            title: '3-Phase Breaker Wiring...',
            thumb: '/final year student.jpg',
          },
          {
            title: 'Two-Pole Circuit Breaker...',
            thumb: '/final year student.jpg',
          },
        ],
      },
      {
        image: '/solar-install.jpg',
        title: 'Advanced Solar Grid-Tie Inverter Setup Guide',
        sidePosts: [
          { title: 'Battery Bank Series Wiring', thumb: '/battery.jpg' },
          { title: 'Charge Controller Settings', thumb: '/controller.jpg' },
        ],
      },
    ],
  },
  {
    name: 'EE-Essentials',
    path: '/ee-essentials',
    links: [
      { text: 'How to', label: 'HOT', labelColor: 'bg-red-600' },
      { text: 'EE Calculators', label: '' },
      { text: 'EEE projects', label: 'NEW', labelColor: 'bg-green-600' },

      { text: 'EE Q & A', label: '' },
      { text: 'EE MCQS', label: '' },

      { text: 'EE  Notes and Article', label: '' },
      { text: 'Circuit Analysis', label: '' },
      { text: 'EE symbols', label: 'NEW', labelColor: 'bg-green-600' },
    ],
    content: [
      {
        image: '/electronics-1.jpg',
        title: 'How to wire a  GFCI Breaker in a 120/240V panel',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: '/diode.jpg',
          },
          { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
          { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
        ],
      },
      {
        image: '/logic-gates.jpg',
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
          { title: 'Combinational Circuits', thumb: '/comb.jpg' },
          { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
        ],
      },
    ],
  },
  {
    name: 'Basic',
    path: '/basics',
    links: [
      {
        text: 'Basics concept',
        label: 'MUST KNOW',
        labelColor: ' bg-purple-900',
      },
      { text: 'Electrical fundamentals', label: '' },
      { text: 'AC fundamental', label: 'NEW', labelColor: '' },
      { text: 'Alternating current', label: '' },
      { text: 'Formulas and Equations', label: '' },
      { text: 'Electrical wiring', label: '' },
      { text: 'Question and answer', label: '' },
    ],
    content: [
      {
        image: '/electronics-1.jpg',
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: '/diode.jpg',
          },
          { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
          { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
        ],
      },
      {
        image: '/logic-gates.jpg',
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
          { title: 'Combinational Circuits', thumb: '/comb.jpg' },
          { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
        ],
      },
    ],
  },
  {
    name: 'Control',
    path: '/control',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: '/electronics-1.jpg',
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: '/diode.jpg',
          },
          { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
          { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
        ],
      },
      {
        image: '/logic-gates.jpg',
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
          { title: 'Combinational Circuits', thumb: '/comb.jpg' },
          { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
        ],
      },
    ],
  },
  {
    name: 'Machines',
    path: '/machines',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: '/electronics-1.jpg',
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: '/diode.jpg',
          },
          { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
          { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
        ],
      },
      {
        image: '/logic-gates.jpg',
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
          { title: 'Combinational Circuits', thumb: '/comb.jpg' },
          { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
        ],
      },
    ],
  },
  {
    name: 'Power',
    path: '/Power',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: '/electronics-1.jpg',
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: '/diode.jpg',
          },
          { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
          { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
        ],
      },
      {
        image: '/logic-gates.jpg',
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
          { title: 'Combinational Circuits', thumb: '/comb.jpg' },
          { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
        ],
      },
    ],
  },
  {
    name: 'Electronics',
    path: '/electronics',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: '/electronics-1.jpg',
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: '/diode.jpg',
          },
          { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
          { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
        ],
      },
      {
        image: '/logic-gates.jpg',
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
          { title: 'Combinational Circuits', thumb: '/comb.jpg' },
          { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
        ],
      },
    ],
  },
];
