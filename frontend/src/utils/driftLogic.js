export function detectDrift(baselineFiles, currentFiles) {
  if (!baselineFiles) return [];

  const drifts = [];

  baselineFiles.forEach((baseFile) => {
    const current = currentFiles.find(
      (f) => f.path === baseFile.path
    );

    if (!current) {
      drifts.push(createDrift(baseFile.path, "DELETED"));
    } else if (current.hash !== baseFile.hash) {
      drifts.push(createDrift(baseFile.path, "MODIFIED"));
    }
  });

  currentFiles.forEach((curr) => {
    const exists = baselineFiles.find(
      (b) => b.path === curr.path
    );
    if (!exists) {
      drifts.push(createDrift(curr.path, "ADDED"));
    }
  });

  return drifts;
}

function createDrift(path, type) {
  return {
    id: crypto.randomUUID(),
    filePath: path,
    changeType: type,
    severity: getSeverity(path),
    authorized: false,
    detectedAt: new Date().toISOString()
  };
}

function getSeverity(path) {
  if (path.includes("config") || path.includes(".env")) return "HIGH";
  if (path.endsWith(".json")) return "MEDIUM";
  return "LOW";
}
