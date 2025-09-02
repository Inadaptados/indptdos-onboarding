---
id: index
title: Next.js + React — fundamentos
slug: /04-next-react/
---

Rutas con **App Router**, Server/Client Components y `fetch` en servidor. Mantén componentes puros y eleva estado solo cuando sea necesario.

import CodeBlock from '@theme/CodeBlock';

<CodeBlock live>
{`function Badge({label}){return <span style={{padding:'4px 8px',border:'1px solid #ddd',borderRadius:8,marginRight:8}}>{label}</span>}
export default function Demo(){
const items=['Campus','Cursos','Grupos','Alumnos'];
return <div>{items.map(i=> <Badge key={i} label={i}/>)}</div>}
}`}
</CodeBlock>
