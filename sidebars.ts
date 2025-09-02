import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '00 - Bienvenida',
      items: [
        'bienvenida/bienvenida-overview',
        'bienvenida/expectativas',
      ],
    },
    {
      type: 'category',
      label: '01 - Ágil & UX',
      items: [
        'agil-ux/agil-ux-overview',
        'agil-ux/reto-brief-ux',
      ],
    },
    {
      type: 'category',
      label: '02 - Scrum',
      items: [
        'scrum/scrum-overview',
        'scrum/reto-sprint-plan',
      ],
    },
    {
      type: 'category',
      label: '03 - Secure SDLC',
      items: [
        'secure-sdlc/secure-sdlc-overview',
        'secure-sdlc/checklist-owasp',
        'secure-sdlc/reto-security-audit',
      ],
    },
    {
      type: 'category',
      label: '04 - Next/React',
      items: [
        'next-react/next-react-overview',
        'next-react/reto-auth-mock',
        'next-react/reto-next-blog',
      ],
    },
    {
      type: 'category',
      label: '05 - Node/Express',
      items: [
        'node-express/node-express-overview',
        'node-express/reto-api-healthcheck',
        'node-express/reto-crud-basico',
      ],
    },
    {
      type: 'category',
      label: '06 - Prompt Engineering',
      items: [
        'prompt-engineering/prompt-engineering-overview',
        'prompt-engineering/reto-prompts',
      ],
    },
    {
      type: 'category',
      label: '07 - Vibe Coding',
      items: [
        'vibe-coding/vibe-coding-overview',
        'vibe-coding/reto-ui-v0',
      ],
    },
    {
      type: 'category',
      label: '99 - Recursos',
      items: [
        'recursos/biblioteca-aprendizaje',
        'recursos/plantillas-frameworks',
      ],
    },
  ],
};

export default sidebars;
