"use client";

import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

import { StickyPhotoPanel } from "@/components/layout/sticky-photo-panel";
import { ContentPanel } from "@/components/layout/content-panel";

export type PhotoEntry = {
  src: string;
  alt: string;
};

const PhotoContext = createContext<{
  activePhoto: PhotoEntry;
  setActivePhoto: (entry: PhotoEntry) => void;
} | null>(null);

export function usePhotoSwap() {
  const ctx = useContext(PhotoContext);
  return ctx?.setActivePhoto;
}

export function useActivePhoto() {
  const ctx = useContext(PhotoContext);
  return ctx?.activePhoto;
}

const DEFAULT_PHOTO: PhotoEntry = {
  src: "/images/alin-richard/cover.jpg",
  alt: "Alin dan Richard dalam busana adat Batak",
};

export function SplitLayout({ children }: PropsWithChildren) {
  const [activePhoto, setActivePhoto] = useState<PhotoEntry>(DEFAULT_PHOTO);

  const photoContextValue = useMemo(
    () => ({ activePhoto, setActivePhoto }),
    [activePhoto],
  );

  return (
    <PhotoContext.Provider value={photoContextValue}>
      <div className="lg:grid lg:grid-cols-2">
        <StickyPhotoPanel />
        <ContentPanel>{children}</ContentPanel>
      </div>
    </PhotoContext.Provider>
  );
}
