import type { Technology } from '../types/portfolio'
import { technologyNames } from './facts'
import gitLogo from '../assets/logos/git.svg'
import gmailLogo from '../assets/logos/gmail.svg'
import html5Logo from '../assets/logos/html5.svg'
import javascriptLogo from '../assets/logos/javascript.svg'
import laravelLogo from '../assets/logos/laravel.svg'
import mysqlLogo from '../assets/logos/mysql.svg'
import phpLogo from '../assets/logos/php.svg'
import postgresqlLogo from '../assets/logos/postgresql.svg'
import postmanLogo from '../assets/logos/postman.svg'
import reactLogo from '../assets/logos/react.svg'
import tailwindLogo from '../assets/logos/tailwindcss.svg'
import typescriptLogo from '../assets/logos/typescript.svg'
import vueLogo from '../assets/logos/vuedotjs.svg'

const logos: Record<string, string> = {
  Laravel: laravelLogo,
  'Vue.js': vueLogo,
  React: reactLogo,
  TypeScript: typescriptLogo,
  JavaScript: javascriptLogo,
  PHP: phpLogo,
  PostgreSQL: postgresqlLogo,
  MySQL: mysqlLogo,
  HTML5: html5Logo,
  'Tailwind CSS': tailwindLogo,
  'REST API': postmanLogo,
  SMTP: gmailLogo,
  Git: gitLogo,
}

export const technologies: Technology[] = technologyNames.map((name) => {
  const logo = logos[name]
  if (!logo) throw new Error(`No logo registered for technology "${name}"`)
  return { name, logo }
})
