import { nanoid } from "nanoid";

function stringify(string: string): string {
  const noBlanks = string.replaceAll(" ", "");
  return noBlanks.toLowerCase();
}

interface ArtistInterface {
  artistName: string;
  firstName: string;
  lastName: string;
  location: string;
  slug: string;
  tattoos: string[];
  id: string;
}

class Artist implements ArtistInterface {
  //Typescript
  artistName: string;
  firstName: string;
  lastName: string;
  location: string;
  slug: string;
  tattoos: string[];
  id: string;
  //Typescript end

  constructor(
    artistName: string,
    firstName: string,
    lastName: string,
    location: string,
    tatoos: string[]
  ) {
    this.artistName = artistName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
    this.slug = stringify(artistName);
    this.tattoos = tatoos;
    this.id = nanoid();
  }
}

export { Artist, type ArtistInterface };
