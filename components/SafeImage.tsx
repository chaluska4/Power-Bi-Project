"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

type Props = ImageProps & {
  fallback: ReactNode;
};

export function SafeImage({ fallback, alt, ...props }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image {...props} alt={alt} onError={() => setFailed(true)} />;
}
