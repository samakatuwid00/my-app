import { Picture, type PictureSource } from '../ui/Picture'

type Phone = { source: PictureSource; alt: string }

// Phone screens fanned out like cards on a table. The middle one sits on top;
// hover (or a tap on touch screens) spreads them a little and shows colour.
export function PhoneFan({ phones, className = '' }: { phones: Phone[]; className?: string }) {
  return (
    <figure className={`phones${phones.length === 2 ? ' two' : ''}${className ? ` ${className}` : ''}`}>
      {phones.map((p) => (
        <Picture key={p.alt} source={p.source} alt={p.alt} sizes="(max-width: 700px) 40vw, 200px" />
      ))}
    </figure>
  )
}

// Two phones side by side, for the collage.
export function PhoneRow({ phones }: { phones: Phone[] }) {
  return (
    <div className="phones-row">
      {phones.map((p) => (
        <Picture key={p.alt} source={p.source} alt={p.alt} sizes="(max-width: 700px) 22vw, 160px" />
      ))}
    </div>
  )
}
