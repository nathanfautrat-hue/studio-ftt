/**
 * Composant <JsonLd /> — insère un script JSON-LD valide.
 *
 * Utilisé dans les layouts et pages pour injecter des schemas schema.org
 * sans que React les transforme (dangerouslySetInnerHTML est obligatoire
 * pour préserver les guillemets, accolades et caractères spéciaux JSON).
 *
 * Utilisation :
 *   <JsonLd data={organizationSchema()} />
 *   <JsonLd data={[orgSchema, webSiteSchema]} />  // Plusieurs schemas en @graph
 */

interface JsonLdProps {
  data: object | object[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
