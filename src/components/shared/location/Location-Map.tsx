"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  setWorkerUrl,
} from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import "./Location-Map.css";

const LOCATION = { lng: 38.9718, lat: 45.0142 };

// Файл кладёт в public/maplibre/ скрипт scripts/copy-maplibre-worker.mjs
const WORKER_URL = "/maplibre/maplibre-gl-worker.mjs";

const ROUTE_URL = `https://yandex.ru/maps/?rtext=~${LOCATION.lat}%2C${LOCATION.lng}&rtt=auto`;

const COFFEE_ICON = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10 2v2" /><path d="M14 2v2" /><path d="M6 2v2" />
    <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
  </svg>
`;

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setWorkerUrl(WORKER_URL);

    let map: MapLibreMap;

    try {
      setWorkerUrl(WORKER_URL);

      map = new MapLibreMap({
        container,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [LOCATION.lng, LOCATION.lat],
        zoom: 14.2,
        pitch: 20,
        bearing: 0,
        cooperativeGestures: true,
        locale: {
          "CooperativeGesturesHandler.WindowsHelpText":
            "Ctrl + прокрутка для масштабирования",
          "CooperativeGesturesHandler.MacHelpText":
            "⌘ + прокрутка для масштабирования",
          "CooperativeGesturesHandler.MobileHelpText":
            "Двигайте карту двумя пальцами",
        },
      });
    } catch (err) {
      console.error("Map init failed:", err);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFailed(true);
      return;
    }

    map.addControl(
      new NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      }),
      "bottom-right",
    );

    const markerEl = document.createElement("div");
    markerEl.className = "carefree-marker";
    markerEl.innerHTML = `
      <span class="carefree-marker__pulse"></span>
      <span class="carefree-marker__core">${COFFEE_ICON}</span>
    `;

    const popup = new Popup({
      offset: 36,
      closeButton: false,
      maxWidth: "260px",
      className: "carefree-popup",
    }).setHTML(`
      <div class="carefree-popup__content">
        <div class="carefree-popup__eyebrow">CAREFREE</div>
        <div class="carefree-popup__title">Surf Coffee × Post</div>
        <div class="carefree-popup__address">Постовая, 55<br />Краснодар</div>
        <a class="carefree-popup__link" href="${ROUTE_URL}" target="_blank" rel="noreferrer">
          Построить маршрут ↗
        </a>
      </div>
    `);

    const marker = new Marker({ element: markerEl, anchor: "center" })
      .setLngLat([LOCATION.lng, LOCATION.lat])
      .setPopup(popup)
      .addTo(map);

    let loaded = false;
    let inView = false;
    let flown = false;

    const target = {
      center: [LOCATION.lng, LOCATION.lat] as [number, number],
      zoom: 16,
      pitch: 52,
      bearing: -22,
    };

    const tryFly = () => {
      if (!loaded || !inView || flown) return;
      flown = true;

      if (reduceMotion) {
        map.jumpTo(target);
        marker.togglePopup();
        return;
      }

      map.once("moveend", () => {
        if (!popup.isOpen()) marker.togglePopup();
      });
      map.flyTo({ ...target, duration: 2400, essential: true });
    };

    map.once("load", () => {
      loaded = true;
      tryFly();
    });

    map.on("error", (e) => console.warn("MapLibre:", e.error?.message ?? e));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView = true;
          tryFly();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(container);

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(container);

    return () => {
      io.disconnect();
      ro.disconnect();
      map.remove();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="location-map h-full w-full" />

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#d8cebd] p-8 text-center text-[#171613]">
          <p className="max-w-[28ch] text-[15px] leading-relaxed text-[#171613]/70">
            Не получилось загрузить карту: возможно, в браузере отключён WebGL.
          </p>
          <a
            href={ROUTE_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#171613] px-6 py-3 text-[14px] font-medium text-[#f3efe7]"
          >
            Открыть в Яндекс Картах
          </a>
        </div>
      )}
    </div>
  );
}
