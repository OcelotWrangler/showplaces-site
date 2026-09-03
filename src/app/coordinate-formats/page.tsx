import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Coordinate Formats",
  description:
    "The three coordinate formats Showplaces understands: decimal degrees, degrees minutes seconds, and degrees decimal minutes.",
};

export default function CoordinateFormats() {
  return (
    <ProsePage title="Coordinate Formats">
      <p>
        Showplaces accepts coordinates in three notations. They all describe the
        same point — they just slice the degrees up differently.
      </p>

      <h2>Decimal Degrees</h2>
      <p>
        Decimal degrees (DD) expresses latitude and longitude as decimal
        fractions of a degree. It is the notation used by most geographic
        information systems, web mapping tools such as OpenStreetMap, and GPS
        devices.
      </p>
      <p>
        Positive latitudes are north of the equator and negative latitudes are
        south of it. Positive longitudes are east of the Prime Meridian and
        negative longitudes are west of it. Latitude is conventionally written
        first.
      </p>
      <p>
        <em>Mount Everest in DD:</em> 27.986065, 86.922623
      </p>

      <h2>Degrees Minutes Seconds</h2>
      <p>
        Traditionally, positions are given in degrees, minutes, and seconds
        (DMS) of angle: one measurement for latitude, the angle north or south
        of the equator, and one for longitude, the angle east or west of the
        Prime Meridian.
      </p>
      <p>
        Degrees, minutes, and seconds are written with the symbols °, ′, and ″.
        So 10° 33′ 19″ is an angle of 10 degrees, 33 minutes, and 19 seconds. A
        degree divides into 60 minutes of arc, and each minute divides again
        into 60 seconds of arc.
      </p>
      <p>
        <em>Mount Everest in DMS:</em> 27° 59′ 9.834″ N, 86° 55′ 21.4428″ E
      </p>

      <h2>Degrees Decimal Minutes</h2>
      <p>
        Degrees decimal minutes (DDM) is the format most commonly used with
        electronic navigation equipment. It is close to DMS, but uses a decimal
        for the minutes rather than dividing again into seconds.
      </p>
      <p>
        <em>Mount Everest in DDM:</em> N 27° 59.27208′, E 86° 55.48986′
      </p>
    </ProsePage>
  );
}
