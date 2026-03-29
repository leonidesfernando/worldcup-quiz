
interface SafeHtmlProps {
  html: string;
  className?: string;
}

export default function SafeHtmlFormatter({ html, className = "" }: Readonly<SafeHtmlProps>) {
  // Very simple and safe parser for <strong> and <br> only
  const parts = html.split(/(<strong>.*?<\/strong>|<br\s*\/?>)/g);

  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
          const content = part.replace(/<\/?strong>/g, '');
          return <strong key={index}>{content}</strong>;
        }
        if (part === '<br>' || part === '<br/>' || part === '<br />') {
          return <br key={index} />;
        }
        return part; // plain text
      })}
    </div>
  );
}