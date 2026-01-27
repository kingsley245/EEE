import finalYear from '../Assets/final year student.jpg';
import Images from '../Assets/image.png';
export const navLinks = [
  { name: 'Home', path: '/Portal', links: [] },
  { name: 'Tutorial', path: '/portal/Tutorial', links: [] },
  {
    name: 'Electrical Wiring',
    path: '/portal/electrical-wiring',
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
        image: finalYear,
        title: 'How to Wire a Single-Pole GFCI Breaker in a 120/240V Panel',
        sidePosts: [
          {
            title: '3-Phase Breaker Wiring...',
            thumb: finalYear,
          },
          {
            title: 'Two-Pole Circuit Breaker...',
            thumb: finalYear,
          },
        ],
      },
      {
        image: finalYear,
        title: 'Advanced Solar Grid-Tie Inverter Setup Guide',
        sidePosts: [
          { title: 'Battery Bank Series Wiring', thumb: finalYear },
          { title: 'Charge Controller Settings', thumb: finalYear },
        ],
      },
    ],
  },
  {
    name: 'EE-Essentials',
    path: '/portal/ee-essentials',
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
        image: Images,
        title: 'How to Wire a Single-Pole GFCI Breaker in a 120/240V Panel',
        sidePosts: [
          {
            title: '3-Phase Breaker Wiring...',
            thumb: finalYear,
          },
          {
            title: 'Two-Pole Circuit Breaker...',
            thumb: finalYear,
          },
        ],
      },
      {
        image: finalYear,
        title: 'Advanced Solar Grid-Tie Inverter Setup Guide',
        sidePosts: [
          { title: 'Battery Bank Series Wiring', thumb: finalYear },
          { title: 'Charge Controller Settings', thumb: finalYear },
        ],
      },
    ],
  },
  {
    name: 'Basic',
    path: '/portal/basics',
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
        image: finalYear,
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: finalYear,
          },
          { title: 'Edge vs Level Triggering', thumb: finalYear },
          { title: 'Amplifier vs Op-Amp', thumb: finalYear },
        ],
      },
      {
        image: finalYear,
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: finalYear },
          { title: 'Combinational Circuits', thumb: finalYear },
          { title: 'Signal Processing Basics', thumb: finalYear },
        ],
      },
    ],
  },
  {
    name: 'Control',
    path: '/portal/control',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: finalYear,
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: finalYear,
          },
          { title: 'Edge vs Level Triggering', thumb: finalYear },
          { title: 'Amplifier vs Op-Amp', thumb: finalYear },
        ],
      },
      {
        image: finalYear,
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: finalYear },
          { title: 'Combinational Circuits', thumb: finalYear },
          { title: 'Signal Processing Basics', thumb: finalYear },
        ],
      },
    ],
  },
  {
    name: 'Machines',
    path: '/portal/machines',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: finalYear,
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: finalYear,
          },
          { title: 'Edge vs Level Triggering', thumb: finalYear },
          { title: 'Amplifier vs Op-Amp', thumb: finalYear },
        ],
      },
      {
        image: finalYear,
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: finalYear },
          { title: 'Combinational Circuits', thumb: finalYear },
          { title: 'Signal Processing Basics', thumb: finalYear },
        ],
      },
    ],
  },
  {
    name: 'Power',
    path: '/portal/Power',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: finalYear,
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: finalYear,
          },
          { title: 'Edge vs Level Triggering', thumb: finalYear },
          { title: 'Amplifier vs Op-Amp', thumb: finalYear },
        ],
      },
      {
        image: finalYear,
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: finalYear },
          { title: 'Combinational Circuits', thumb: finalYear },
          { title: 'Signal Processing Basics', thumb: finalYear },
        ],
      },
    ],
  },
  {
    name: 'Electronics',
    path: '/portal/electronics',
    links: [
      { text: 'All', label: '' },
      { text: 'Basic Electronics', label: '' },
      { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
      { text: 'Diodes & LEDs', label: '' },
    ],
    content: [
      {
        image: finalYear,
        title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
        sidePosts: [
          {
            title: 'Difference Between Zener & Avalanche',
            thumb: finalYear,
          },
          { title: 'Edge vs Level Triggering', thumb: finalYear },
          { title: 'Amplifier vs Op-Amp', thumb: finalYear },
        ],
      },
      {
        image: finalYear,
        title: 'Mastering Boolean Algebra for Digital Logic Design',
        sidePosts: [
          { title: 'Sequential Logic Circuits', thumb: finalYear },
          { title: 'Combinational Circuits', thumb: finalYear },
          { title: 'Signal Processing Basics', thumb: finalYear },
        ],
      },
    ],
  },
];
