import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '00 - Bienvenida',
      items: [
        'bienvenida/index',
        'bienvenida/expectativas',
      ],
    },
    {
      type: 'category',
      label: '01 - Ágil & UX',
      items: [
        'agil-ux/index',
        'agil-ux/reto-brief-ux',
      ],
    },
    {
      type: 'category',
      label: '02 - Scrum',
      items: [
        'scrum/index',
        'scrum/reto-sprint-plan',
      ],
    },
    {
      type: 'category',
      label: '03 - Secure SDLC',
      items: [
        'secure-sdlc/index',
        'secure-sdlc/checklist-owasp',
      ],
    },
    {
      type: 'category',
      label: '04 - Next/React',
      items: [
        'next-react/index',
        'next-react/reto-auth-mock',
        'next-react/reto-next-blog',
      ],
    },
    {
      type: 'category',
      label: '05 - Node/Express',
      items: [
        'node-express/index',
        'node-express/reto-api-healthcheck',
        'node-express/reto-crud-basico',
      ],
    },
    {
      type: 'category',
      label: '06 - Prompt Engineering',
      items: [
        'prompt-engineering/index',
        'prompt-engineering/reto-prompts',
      ],
    },
    {
      type: 'category',
      label: '07 - Vibe Coding',
      items: [
        'vibe-coding/index',
        'vibe-coding/reto-ui-v0',
      ],
    },
    {
      type: 'category',
      label: '99 - Recursos',
      items: [
        'recursos/plantillas',
        'recursos/biblioteca-aprendizaje',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial Basics',
      items: [
        'tutorial-basics/create-a-page',
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/congratulations',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial Extras',
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
