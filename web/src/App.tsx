import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Shell } from "./components/Shell";
import { loadBuildInfo, type BuildInfo } from "./lib/buildInfo";
import { getDocument, publicUrl } from "./lib/documents";

const PdfViewer = lazy(async () => {
  const mod = await import("./components/PdfViewer");
  return { default: mod.PdfViewer };
});

export default function App() {
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadBuildInfo().then((info) => {
      if (!cancelled) {
        setBuildInfo(info);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeDocument = useMemo(() => getDocument("slides"), []);
  const fileUrl = publicUrl(activeDocument.path);

  return (
    <Shell
      activeDocument={activeDocument}
      downloadHref={fileUrl}
      buildInfo={buildInfo}
    >
      <Suspense
        fallback={<p className="viewer-fallback">A carregar visualizador…</p>}
      >
        <PdfViewer
          key={activeDocument.id}
          fileUrl={fileUrl}
          downloadUrl={fileUrl}
          fileName={activeDocument.fileName}
        />
      </Suspense>
    </Shell>
  );
}
