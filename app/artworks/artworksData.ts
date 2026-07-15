// ============================================================
//  ARTWORKS (SCRAPBOOK) — DATA MODEL
// ============================================================
//  Fully data-driven. Components receive this data and hold no
//  asset paths of their own.
//
//  Artworks: paste the plain Cloudinary URL from the Media Library.
//  The delivered image is derived from it (see app/lib/cloudinary.ts),
//  capped in width and format-negotiated per browser — there is no
//  second asset to upload or keep in sync.
//
//  Note the `/image/upload/` path segment: the video data file uses
//  `/video/upload/`, and a mismatched segment 404s at the CDN.
// ============================================================

import { imageSrc } from "@/app/lib/cloudinary";

export interface Artwork {
  id: string;
  title: string;
  /** Delivery source, width-capped and format-picked for the browser. */
  image: string;
}

// ------------------------------------------------------------
//  Authoring an entry: title, pasted Cloudinary URL.
//  The id is slugified from the title, so there is no extra field
//  to keep in sync — it is what React keys on.
//
//  Intentionally no aspect ratio is recorded: the scrapbook masonry
//  lets every image keep its natural shape, which is what makes the
//  columns ragged rather than a uniform grid.
// ------------------------------------------------------------

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * 800px, not the imageSrc default of 1400: a tile occupies roughly a third of
 * a 1200px sheet, so 800 still covers a 2x display while halving the bytes —
 * which matters at this collection size, where the default would ship several
 * hundred megabytes of oversized masters to anyone who scrolls to the bottom.
 */
const TILE_WIDTH = 800;

const entry = (title: string, url: string): Artwork => ({
  id: slug(title),
  title,
  image: imageSrc(url, TILE_WIDTH),
});

const CDN = "https://res.cloudinary.com/drxjblwds/image/upload";

export const ARTWORKS: Artwork[] = [
  entry("First attempt at drawing people (2015)", `${CDN}/v1784039967/IMG_20190503_211853_hzmuiq.png`),
  entry("Took 3 days to finish this (2017)", `${CDN}/v1784039964/IMG_20190503_211833_bbinyj.png`),
  entry("Painting different materials (2016)", `${CDN}/v1784039961/IMG_20190503_211746_jkwrpb.png`),
  entry("Trying Monochrome (2016)", `${CDN}/v1784039958/IMG_20190503_211720_kp9rbn.png`),
  entry("A Study of Metal and Shine (2015)", `${CDN}/v1784039956/IMG_20190503_211652_m4qqun.png`),
  entry("Experiment with negative spaces (2015)", `${CDN}/v1784039953/IMG_20190503_212214_whrk7g.png`),
  entry("What peace looks like (2015)", `${CDN}/v1784039950/IMG_20190503_211923_l9ajkn.png`),
  entry("A busy morning (2016)", `${CDN}/v1784039948/IMG_20190503_211810_in6v34.png`),
  entry("Just cannot stop (2016)", `${CDN}/v1784039945/IMG_20190503_212235_fenc9z.png`),
  entry("Cloth, ceramics, and glass (2018)", `${CDN}/v1784039942/IMG_20190503_213054_vrut0r.png`),
  entry("Art for Day 98", `${CDN}/v1784016780/98_oqskzk.png`),
  entry("Art for Day 97", `${CDN}/v1784016779/97_xgw1mo.png`),
  entry("Art for Day 95", `${CDN}/v1784016778/95_scjlgz.png`),
  entry("Art for Day 94", `${CDN}/v1784016777/94_nd9aub.png`),
  entry("Art for Day 93", `${CDN}/v1784016775/93_ccnj6h.png`),
  entry("Art for Day 92", `${CDN}/v1784016774/92_xquwxy.png`),
  entry("Art for Day 87", `${CDN}/v1784016774/87_rp2n0u.png`),
  entry("Art for Day 81", `${CDN}/v1784016772/81_kfo4yk.png`),
  entry("Art for Day 80", `${CDN}/v1784016771/80_hl0xnl.png`),
  entry("Art for Day 79", `${CDN}/v1784016769/79_fy6ebk.png`),
  entry("Art for Day 78", `${CDN}/v1784016768/78_pun1wa.png`),
  entry("Art for Day 73", `${CDN}/v1784016767/73_o9hhnt.png`),
  entry("Art for Day 72", `${CDN}/v1784016766/72_cjunmh.png`),
  entry("Art for Day 71", `${CDN}/v1784016765/71_mrxwl7.png`),
  entry("Art for Day 69", `${CDN}/v1784016763/69_foedlk.png`),
  entry("Art for Day 68", `${CDN}/v1784016762/68_sahziw.png`),
  entry("Art for Day 67", `${CDN}/v1784016761/67_ahgjxb.png`),
  entry("Art for Day 65", `${CDN}/v1784016760/65_nettuq.png`),
  entry("Art for Day 64", `${CDN}/v1784016759/64_zyiafs.png`),
  entry("Art for Day 62", `${CDN}/v1784016758/62_nprupi.png`),
  entry("Art for Day 59", `${CDN}/v1784016756/59_lmjwvs.png`),
  entry("Art for Day 58", `${CDN}/v1784016755/58_ki2yel.png`),
  entry("Art for Day 57", `${CDN}/v1784016754/57_blfnu0.png`),
  entry("Art for Day 55", `${CDN}/v1784016753/55_j0csbd.png`),
  entry("Art for Day 54", `${CDN}/v1784016751/54_xrfmq9.png`),
  entry("Art for Day 52", `${CDN}/v1784016750/52_e1ftgn.png`),
  entry("Art for Day 51", `${CDN}/v1784016749/51_reuypz.png`),
  entry("Art for Day 50", `${CDN}/v1784016748/50_bg9n0v.png`),
  entry("Art for Day 49", `${CDN}/v1784016747/49_u8azka.png`),
  entry("Art for Day 48", `${CDN}/v1784016745/48_kk9s6v.png`),
  entry("Art for Day 47", `${CDN}/v1784016744/47_dur7pd.png`),
  entry("Art for Day 46", `${CDN}/v1784016743/46_uy6qqr.png`),
  entry("Art for Day 44", `${CDN}/v1784016742/44_eb25v1.png`),
  entry("Art for Day 43", `${CDN}/v1784016741/43_iuczrn.png`),
  entry("Art for Day 42", `${CDN}/v1784016740/42_xj1dkc.png`),
  entry("Art for Day 41", `${CDN}/v1784016738/41_pn7zsu.png`),
  entry("Art for Day 40", `${CDN}/v1784016737/40_rozwb6.png`),
  entry("Art for Day 39", `${CDN}/v1784016736/39_dd6ghj.png`),
  entry("Art for Day 38", `${CDN}/v1784016735/38_dpcuef.png`),
  entry("Art for Day 37", `${CDN}/v1784016734/37_eoz2ke.png`),
  entry("Art for Day 36", `${CDN}/v1784016732/36_dnca0j.png`),
  entry("Art for Day 35", `${CDN}/v1784016731/35_xw9owm.png`),
  entry("Art for Day 34", `${CDN}/v1784016730/34_l1u7an.png`),
  entry("Art for Day 33", `${CDN}/v1784016729/33_gcydwk.png`),
  entry("Art for Day 32", `${CDN}/v1784016727/32_ps5icp.png`),
  entry("Art for Day 31", `${CDN}/v1784016727/31_cbsdch.png`),
  entry("Art for Day 30", `${CDN}/v1784016725/30_njmqhy.png`),
  entry("Art for Day 29", `${CDN}/v1784016724/29_wt1vi2.png`),
  entry("Art for Day 28", `${CDN}/v1784016723/28_tkumrc.png`),
  entry("Art for Day 27", `${CDN}/v1784016721/27_mciflq.png`),
  entry("Art for Day 26", `${CDN}/v1784016720/26_eob2vb.png`),
  entry("Art for Day 25", `${CDN}/v1784016719/25_q4va74.png`),
  entry("Art for Day 24", `${CDN}/v1784016718/24_bwhhac.png`),
  entry("Art for Day 23", `${CDN}/v1784016717/23_wv6nxi.png`),
  entry("Art for Day 21", `${CDN}/v1784016715/21_miiuah.png`),
  entry("Art for Day 20", `${CDN}/v1784016714/20_ohuobk.png`),
  entry("Art for Day 19", `${CDN}/v1784016713/19_cgcnx1.png`),
  entry("Art for Day 18", `${CDN}/v1784016712/18_pvqlon.png`),
  entry("Art for Day 17", `${CDN}/v1784016710/17_l3vum9.png`),
  entry("Art for Day 16", `${CDN}/v1784016709/16_lwlcoq.png`),
  entry("Art for Day 15", `${CDN}/v1784016708/15_dd3jmo.png`),
  entry("Art for Day 14", `${CDN}/v1784016707/14_ruyrfp.png`),
  entry("Art for Day 13", `${CDN}/v1784016706/13_b3jzbt.png`),
  entry("Art for Day 12", `${CDN}/v1784016705/12_lbtk4l.png`),
  entry("Art for Day 11", `${CDN}/v1784016703/11_xyeqfp.png`),
  entry("Art for Day 10", `${CDN}/v1784016702/10_gvmn5d.png`),
  entry("Art for Day 9", `${CDN}/v1784016701/9_tcxj3b.png`),
  entry("Art for Day 8", `${CDN}/v1784016700/8_whzag3.png`),
  entry("Art for Day 7", `${CDN}/v1784016699/7_opgml0.png`),
  entry("Art for Day 6", `${CDN}/v1784016698/6_hajbje.png`),
  entry("Art for Day 5", `${CDN}/v1784016696/5_orsscj.png`),
  entry("Art for Day 4", `${CDN}/v1784016695/4_tnkboa.png`),
  entry("Art for Day 3", `${CDN}/v1784016695/3_sysrge.png`),
  entry("Art for Day 2", `${CDN}/v1784016695/2_rahvo0.png`),
  entry("Art for Day 1", `${CDN}/v1784016694/1_wnmjxl.png`),
];
