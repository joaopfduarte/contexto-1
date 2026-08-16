import styles from "./DownloadButton.module.css";

type DownloadButtonProps = {
  href: string;
  fileName: string;
  label?: string;
};

export function DownloadButton({
  href,
  fileName,
  label = "Descarregar",
}: DownloadButtonProps) {
  return (
    <a className={styles.button} href={href} download={fileName}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      {label}
    </a>
  );
}
