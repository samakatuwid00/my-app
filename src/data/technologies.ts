import type { Technology } from '../types/portfolio'
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

export const technologies: Technology[] = [
  { name: 'Laravel', logo: laravelLogo },
  { name: 'Vue.js', logo: vueLogo },
  { name: 'React', logo: reactLogo },
  { name: 'TypeScript', logo: typescriptLogo },
  { name: 'JavaScript', logo: javascriptLogo },
  { name: 'PHP', logo: phpLogo },
  { name: 'PostgreSQL', logo: postgresqlLogo },
  { name: 'MySQL', logo: mysqlLogo },
  { name: 'HTML5', logo: html5Logo },
  { name: 'Tailwind CSS', logo: tailwindLogo },
  { name: 'REST API', logo: postmanLogo },
  { name: 'SMTP', logo: gmailLogo },
  { name: 'Git', logo: gitLogo },
]
