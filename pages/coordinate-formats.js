import Layout from "../components/layout";

export default function CoordinateFormats() {
    return (
        <Layout title="Coordinate Formats">
            <article className="page">
                <header className="page__header">
                    <h1 className="page__title">Coordinate Formats</h1>
                </header>
                <div className="page__content">
                    <h3>Decimal Degrees</h3>

                    <p>Decimal degrees (DD) is a notation for expressing latitude and longitude geographic coordinates
                        as
                        decimal fractions of a degree. DD are used in many geographic information systems (GIS), web
                        mapping
                        applications such as OpenStreetMap, and GPS devices.</p>

                    <p>Positive latitudes are north of the equator, negative latitudes are south of the equator.
                        Positive
                        longitudes are east of the Prime Meridian; negative longitudes are west of the Prime Meridian.
                        Latitude
                        and longitude are usually expressed in that sequence, latitude before longitude. </p>

                    <em>Example: Mount Everest's coordinates in DD: 27.986065, 86.922623</em>

                    <h3>Degrees Minutes Seconds</h3>

                    <p>Traditionally positions are given using degrees, minutes, and seconds (DMS) of angles in two
                        measurements:
                        one for latitude, the angle north or south of the equator; and one for longitude, the angle east
                        or
                        west of the Prime Meridian.</p>

                    <p>Degrees, minutes and seconds are denoted by the symbols °, ', ". e.g. 10° 33' 19" means an angle
                        of 10
                        degrees, 33 minutes and 19 seconds . A degree is divided into 60 minutes (of arc), and each
                        minute is
                        divided into 60 seconds (of arc). </p>

                    <em>Example: Mount Everest's coordinates in DMS: 27° 59' 9.8340'' N, 86° 55' 21.4428'' E</em>

                    <h3>Degrees Decimal Minutes</h3>

                    <p>Degrees Decimal Minutes (DDM) is the format most commonly used when working with electronic
                        navigation
                        equipment. It's very similar to DMS, but uses decimals for the minutes instead of dividing again
                        for seconds.</p>

                    <em>Example: Mount Everest's coordinates in DDM: N 27° 59.272080 E, 86° 55.489860</em>
                </div>
            </article>
        </Layout>
    )
}