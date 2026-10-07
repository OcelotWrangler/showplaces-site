/**
 * TypeScript mirrors of the Giza DTOs (`OcelotWrangler/showplaces-swift-models`)
 * that this site actually consumes. Only the read-only share-preview surface is
 * modelled here — if a field is added to a DTO the site does not render, it does
 * not need to be added here.
 *
 * Dates are serialized by Pharos as `yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ`, so they
 * arrive as strings and are parsed only where they are displayed.
 */

export type ShareType = "COPY" | "LIVE";

export type AccessLevel = "VIEW_ONLY" | "EDITABLE";

export type OwnershipStatus =
  | "OWNED_BY_ME"
  | "SHARED_AND_EDITABLE"
  | "SHARED_VIEW_ONLY"
  | "SHARE_EXPIRED";

export interface PostalAddress {
  id: string;
  street: string;
  subLocality: string;
  postalCode: string;
  city: string;
  subAdministrativeArea: string;
  state: string;
  country: string;
  isoCountryCode: string;
}

export interface Tag {
  id: string;
  title: string;
  description?: string | null;
}

export interface Showplace {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  tags: Tag[];
  created: string;
  updated: string;
  latitude: number;
  longitude: number;
  postalAddress: PostalAddress;
  visited: boolean;
  ownershipStatus: OwnershipStatus;
}

export interface Media {
  id: string;
  /** Which showplace the photo belongs to, in an invite preview's `media`. */
  showplaceId?: string | null;
  created: string;
  width?: number | null;
  height?: number | null;
  key: string;
  url: string;
  contentType: string;
  thumbnailUrl?: string | null;
  thumbnailWidth?: number | null;
  thumbnailHeight?: number | null;
}

export interface Group {
  id: string;
  title: string;
  description?: string | null;
  created: string;
  updated: string;
  coverImage?: Media | null;
  ownershipStatus: OwnershipStatus;
}

export interface SharedShowplace {
  /** For a copy, the snapshot taken when it was sent. */
  showplace: Showplace;
  media: Media[];
  shareType: ShareType;
  accessLevel: AccessLevel;
  /** The sender, as they appear to others. Never an email. */
  invitedByDisplayName: string;
}

export interface SharedGroup {
  /** For a copy, the snapshot taken when it was sent. */
  group: Group;
  /** The group's showplaces in order. */
  showplaces: Showplace[];
  media: Media[];
  shareType: ShareType;
  accessLevel: AccessLevel;
  invitedByDisplayName: string;
}

/** `ShowplaceInviteDTO` / `GroupInviteDTO` — `shared` is absent when the invite is bad. */
export interface InviteEnvelope<T> {
  id: string;
  errorMessage?: string | null;
  shared?: T | null;
}
