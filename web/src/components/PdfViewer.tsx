import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const RENDER_BASE = 2.2;
const SCALE_MIN = 0.5;
const SCALE_MAX = 2;
const SCALE_STEP = 0.1;

type PdfViewerProps = {
  fileUrl: string;
  downloadUrl: string;
  fileName: string;
};

export function PdfViewer({ fileUrl, downloadUrl, fileName }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLoadSuccess = useCallback(({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    setPageNumber(1);
    setReady(true);
    setError(null);
  }, []);

  const onLoadError = useCallback((err: Error) => {
    setReady(false);
    setError(err.message || "Não foi possível carregar o PDF.");
  }, []);

  const documentKey = fileUrl;

  return (
    <div className={styles.viewer}>
      <div className={styles.toolbar} aria-label="Controlos do PDF">
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolButton}
            aria-label="Página anterior"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          >
            ‹
          </button>
          <span className={styles.meta}>
            {numPages > 0 ? `${pageNumber} / ${numPages}` : "— / —"}
          </span>
          <button
            type="button"
            className={styles.toolButton}
            aria-label="Página seguinte"
            disabled={numPages === 0 || pageNumber >= numPages}
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
          >
            ›
          </button>
        </div>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolButton}
            aria-label="Reduzir zoom"
            onClick={() =>
              setScale((s) => Math.max(SCALE_MIN, Number((s - SCALE_STEP).toFixed(2))))
            }
          >
            −
          </button>
          <span className={styles.meta}>{Math.round(scale * 100)}%</span>
          <button
            type="button"
            className={styles.toolButton}
            aria-label="Aumentar zoom"
            onClick={() =>
              setScale((s) => Math.min(SCALE_MAX, Number((s + SCALE_STEP).toFixed(2))))
            }
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.stage}>
        {error ? (
          <div className={styles.state} role="alert">
            <h2 className={styles.stateTitle}>PDF indisponível</h2>
            <p className={styles.stateBody}>
              O ficheiro ainda não está disponível neste ambiente (por exemplo,
              desenvolvimento local sem cópia dos PDFs). Na pipeline do GitHub
              Pages o PDF é gerado automaticamente.
            </p>
            <a className={styles.stateLink} href={downloadUrl} download={fileName}>
              Tentar descarregar {fileName}
            </a>
          </div>
        ) : (
          <div
            className={`${styles.canvasWrap}${ready ? ` ${styles.canvasWrapReady}` : ""}`}
          >
            <Document
              key={documentKey}
              file={fileUrl}
              loading={
                <div className={styles.state}>
                  <p className={styles.stateBody}>A carregar documento…</p>
                </div>
              }
              onLoadSuccess={onLoadSuccess}
              onLoadError={onLoadError}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale * RENDER_BASE}
                className={styles.page}
                renderTextLayer
                renderAnnotationLayer
              />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}
