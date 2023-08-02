import { Artist, Track } from "@/types";
import { Type } from "typescript";

export function sortObjectByValues(obj: { [key: string]: number }) {
    const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(sortedEntries);
    return sortedObject;
  }

export const metaGenres = ["rock", "pop", "country", "rap", "jazz", "indie", "bluegrass", "progressive", "metal", "classical", "alternative"]

export const popularityDescription = (popularity: number) => {
    if (popularity >= 100) {
        return `With an average score of: ${popularity} your musical taste aligns with mainstream trends, and you enjoy the latest and greatest hits from the biggest global superstars. You actively follow pop culture and are likely to be up-to-date with the latest music releases and popular trends.`
    } else if (popularity >= 50) {
        return `With an average score of: ${popularity} you have a preference for well-known artists and songs. You tend to gravitate towards music that has broader recognition and appeal, enjoying the energy and familiarity of popular tracks.`
    } else if (popularity >= 40) {
        return `With an average score of: ${popularity} your musical taste is moderately mainstream. While you appreciate some popular artists and hits, you also seek out music that may not be on everyone's radar, allowing you to enjoy a diverse range of songs.`
    } else if (popularity >= 30) {
        return `With an average score of: ${popularity} you strike a balance between mainstream hits and lesser-known tracks. Your musical taste is versatile, allowing you to enjoy both popular chart-toppers and lesser-known songs that resonate with you on a personal level.`
    } else if (popularity >= 20) {
        return `With an average score of: ${popularity} your musical preferences lean towards niche and alternative genres. You appreciate the creativity and experimentation found in less mainstream music, and you enjoy supporting artists who have a dedicated following.`
    } else if (popularity >= 10) {
        return `With an average score of: ${popularity} you have an eclectic taste in music, always on the lookout for hidden gems and obscure tracks from underground artists. You enjoy the thrill of discovering new sounds that most people might not have heard of yet.`
    }else{
        return `You must be trying to be different.`
    }
}

export function getMostAndLeastPopularTrack(array: Track[]) {
    const sortedArray = array.sort((a: any, b: any) => b.popularity - a.popularity)

    return [sortedArray[0], sortedArray[sortedArray.length - 1]]

}

export function getMostAndLeastPopularArtist(array: Artist[]) {
    const sortedArray = array.sort((a: any, b: any) => b.popularity - a.popularity)

    return [sortedArray[0], sortedArray[sortedArray.length - 1]]

}
