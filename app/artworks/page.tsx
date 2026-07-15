import Link from "next/link";
import ArtworkPolaroid from "./ArtworkPolaroid";
import { ARTWORKS, type Artwork } from "./artworksData";

/** Scrapbook columns. Fixed at every breakpoint — see the note on distribution below. */
const COLUMN_COUNT = 3;

/**
 * Deal the artworks into columns round-robin, rather than handing the whole
 * list to CSS `columns` and letting the browser balance it.
 *
 * CSS multi-column balances at layout time, and an <img> with no declared
 * width/height/aspect-ratio reports no height until it decodes. Every tile
 * therefore measured as ~zero, the browser packed them all into the leading
 * columns, and it does not reliably re-balance once the images inflate — so
 * the third column stayed empty. Assigning the columns here sidesteps the
 * balancer entirely: each column is a plain stack that grows to fit whatever
 * its own images turn out to be, so unknown heights stop mattering.
 *
 * Round-robin also means the first row reads 1, 2, 3 left to right, instead
 * of the columnar order CSS columns produces.
 *
 * The trade-off is that columns are balanced by count, not height, so their
 * bottoms can end up ragged. Across a collection this size that averages out.
 */
function toColumns(
  artworks: Artwork[],
  count: number,
): { artwork: Artwork; index: number }[][] {
  const columns: { artwork: Artwork; index: number }[][] = Array.from(
    { length: count },
    () => [],
  );

  artworks.forEach((artwork, index) => {
    columns[index % count].push({ artwork, index });
  });

  return columns;
}

export default function ArtworksPage() {
  const columns = toColumns(ARTWORKS, COLUMN_COUNT);

  return (
    /* Outer padding is what makes the sheet read as floating on the body layer. */
    <div className="min-h-screen bg-body-bg p-4 md:p-8 xl:p-12">
      <Link
        href="/desk"
        className="inline-block mb-4 md:mb-6 z-50 font-patrick text-base font-medium text-ink/70 hover:text-ink transition-colors border-b-2"
      >
        Go To Desk
      </Link>

      {/* 1100px keeps a clear margin of body-bg either side at common desktop
          widths, so the sheet reads as centred and floating. At 1400px it ran
          nearly edge to edge on a ~1500px screen and the centring was invisible. */}
      <div className="artwork-page max-w-[1200px] mx-auto min-h-[calc(100vh-8rem)] rounded-xl overflow-hidden px-6 py-10 md:px-12 md:py-14">
        <h1 className="font-serif font-bold text-gray-900 text-[clamp(1.6rem,4vw,3rem)] leading-[1.1] mb-8 md:mb-12">
          My Artworks
        </h1>

        {/* items-start so a short column keeps its own height instead of
            stretching to match the tallest one. */}
        <div className="flex items-start gap-5 md:gap-6">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex-1 min-w-0 flex flex-col gap-5 md:gap-6"
            >
              {column.map(({ artwork, index }) => (
                <ArtworkPolaroid
                  key={artwork.id}
                  artwork={artwork}
                  index={index}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
