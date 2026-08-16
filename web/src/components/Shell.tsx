import type { ReactNode } from "react";
import type { BuildInfo } from "../lib/buildInfo";
import type { DocumentEntry } from "../lib/documents";
import { DownloadButton } from "./DownloadButton";
import styles from "./Shell.module.css";

type ShellProps = {
  activeDocument: DocumentEntry;
  downloadHref: string;
  buildInfo: BuildInfo | null;
  children: ReactNode;
};

export function Shell({
  activeDocument,
  downloadHref,
  buildInfo,
  children,
}: ShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandBlock}>
            <p className={styles.brand}>Crimes Digitais</p>
            <p className={styles.tagline}>
              Limites entre atividade profissional e conduta criminosa —
              Contexto Social e Profissional da Engenharia de Computação.
            </p>
          </div>

          <div className={styles.controls}>
            <div className={styles.metaRow}>
              <span className={styles.docLabel}>{activeDocument.shortTitle}</span>
            </div>
            <DownloadButton
              href={downloadHref}
              fileName={activeDocument.fileName}
            />
          </div>

          {buildInfo ? (
            <p className={styles.buildInfo}>
              build {buildInfo.shortSha} · {buildInfo.branch}
            </p>
          ) : null}
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
