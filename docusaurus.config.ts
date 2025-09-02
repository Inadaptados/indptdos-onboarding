import { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';


const config: Config = {
  title: 'Onboarding Indaptados',
  tagline: 'Aprende haciendo, con foco en producto',
  url: 'https://inadaptados.github.io',
  baseUrl: '/indptdos-onboarding/',
  favicon: 'img/favicon.ico',
  organizationName: 'Inadaptados',
  projectName: 'indptdos-onboarding',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'es', locales: ['es'] },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      'classic',
      {
        docs: { sidebarPath: require.resolve('./sidebars.ts') },
        blog: { showReadingTime: true },
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'Onboarding',
      logo: { alt: 'Indaptados', src: 'img/logo.svg' },
      items: [
        { to: '/docs/00-bienvenida/', label: 'Inicio', position: 'left' },
        { to: '/docs/01-agil-ux/', label: 'Ágil & UX', position: 'left' },
        { to: '/docs/02-scrum/', label: 'Scrum', position: 'left' },
        { to: '/docs/03-secure-sdlc/', label: 'Secure SDLC', position: 'left' },
        { to: '/docs/04-next-react/', label: 'Next/React', position: 'left' },
        { to: '/docs/05-node-express/', label: 'Node/Express', position: 'left' },
        { to: '/docs/06-prompt-engineering/', label: 'IA aplicada', position: 'left' },
        { href: 'https://github.com/Inadaptados/indptdos-onboarding', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} Indaptados — Hecho con Docusaurus`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  },
};
export default config;