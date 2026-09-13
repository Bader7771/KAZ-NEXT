import { KAZ_NEXT_CONTACT } from "../config/contact";

export default function ContactButton({ className = "", onClick, href = KAZ_NEXT_CONTACT.destination }) {
  return (
    <a className={`kaz-button kaz-button--primary ${className}`} href={href} onClick={onClick}>
      CONTACT US
    </a>
  );
}
